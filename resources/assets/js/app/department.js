(function() {
    if ($('#js-department').length == 1) {
        /*Department View*/
        const DepartmentView = function() {
            this.createDeptForm = $('#createDepartment'); //DOM object for create department form
            this.createDeptBtn = $('#createDepartmentBtn'); //DOM object for create department submit button
            this.searchDeptForm = $('#searchDepartment'); //DOM object for search department form 
            this.searchDeptBtn = $('#searchDepartmentBtn'); //DOM object for search department submit button
            this.searchDeptInput = $('#searchDepartmentInput'); //DOM object for search department input
            this.searchDeptResult = $('#searchResult'); //DOM object for search department result
            this.reloadSearchDept = $('#reloadDepartmentBtn'); //DOM object for reloading search department result
            this.searchNextDept = $('#deptNextSearch'); //DOM object for search department pagination button (Next)
            this.searchPrevDept = $('#deptPrevSearch'); //DOM object for search department pagination button (Previous)
            this.searchDeptError = $('#searchDepartmentError')//DOM object for displaying serach error
            this.createSuccessAlert = $('#deptSuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#deptErrorAlert'); //DOM object for error alert
            this.updateDeptForm = $('#updateDepartment'); //DOM object for update department form
            this.updateDeptBtn = $('#updateDepartmentBtn'); //DOM object for update department submit button
            this.updateSuccessAlert = $('#deptUpdateSuccessAlert'); //DOM object for update success alert
            this.updateErrorAlert = $('#deptUpdateErrorAlert'); //DOM object for update error alert
            this.deptModalAnchor = $('.departmentModalAnchor'); //DOM object for department anchor button for modal popup
            this.components = {
                success: { //Data for successful Ajax request
                    data: "",
                    template: function() {
                        return `<div class="alert alert-success">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							<strong>Success!!!</strong> <p>${this.data} </p>
						</div>`
                    }
                },
                error: { //Data for failed Ajax request
                    data: {
                        message: "",
                        errors: ""
                    },
                    template: function() {
                        return `<div class="alert alert-danger">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							<strong>Error!!</strong> <p>${this.data.message} </p>${this.data.errors}
						</div>`
                    }
                }
            }
            this.searchComponents = {
                success: {
                    data: "", //Received data from Ajax request
                    template: function() {
                        var html = '';
                        for (var datum of this.data) { //loop through the recieved data's object
                            html += `<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
										<div class="qg-col--xs--8 qg-animate--card-content">
											<div class="font-primary deptName" data-url="${appData.hostname}/departments/${datum.id}" style="padding: 10px">${datum.name}</div>
											<div class="font-secondary" style="padding: 10px">
												<span class="qg-data-tags--black">${datum.faculty.name} Faculty</span>
												<p class="deptDescription" style='color:grey'>${datum.description}</p>
											</div>
										</div>
										<div class="qg-col--xs--2 qg-flex">
											<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center departmentModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
										</div>
									</div>`
                        }
                        return html;
                    }
                },
                error:{
                	template:`<div class="alert alert-danger">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							<strong>Error!!</strong> <p>Internal Server Error, Please check your network connection</p>
						</div>`
                }
            }
        }
            /*Department Model*/
        const DepartmentModel = function() {
            this.view = new DepartmentView();
            /*Create Department Form*/
            this.createDeptForm = new FormSubmit(); //new create department instance  of form submission object 
            this.updateDeptForm = new FormSubmit(); //new create department instance of form submission object
            this.searchAllDept = new ItemSearch(); //new search department instance of Item search object object
        }
        DepartmentModel.prototype = {
            //Model method for creating department
            CreateDept: function() {
                var obj = this;
                obj.view.createSuccessAlert.empty(); //Remove success alert elements
                obj.view.createErrorAlert.empty(); //Remove error alert elements
                this.createDeptForm.formObject = this.view.createDeptForm;
                //Method before Ajax request 
                this.createDeptForm.beforeAjaxReq = function() {
                    obj.view.createDeptBtn.prop('disabled', true);
                };
                //Method after successful Ajax request 
                this.createDeptForm.successfullAjaxReq = function(response, jqXHR) {
                    obj.view.createDeptBtn.prop('disabled', false);
                    obj.view.components.success.data = "Department successfully created";
                    obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'deptSuccessAlert' in view
                    obj.reloadSearchDept(); //Reload search request to update the displayed Faculties (without refreshing pagination)
                    obj.view.createDeptForm[0].reset(); //Reset submit form
                    console.log('success' + ' ' + jqXHR + ' ' + response);
                };
                //Method after failed Ajax request
                this.createDeptForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                    var responseErrors;
                    obj.view.createDeptBtn.prop('disabled', false); //Enable submit button for create department form
                    obj.view.components.error.data.message = error;
                    //Request status code for "Unknown Response"
                    if (jqXHR.status == 419) {
                        obj.view.components.error.data.errors = "<br> Session Expired. Please reload the webpage";
                    }
                    //Request status code for "Unknown Response"
                    else if (jqXHR.status == 422) {
                        responseErrors = JSON.parse(jqXHR.responseText);
                        for (var responseError of Object.keys(responseErrors.errors)) {
                            for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                obj.view.components.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                            }
                        }
                    }
                    //Request status code for "Internal server error"
                    else {
                        obj.view.components.error.data.errors = "<br> Internal server error. Please reload page";
                    }
                    obj.view.createErrorAlert.append(obj.view.components.error.template());
                    console.log('fail' + ' ' + error + ' ' + jqXHR.responseText + ' ' + textStatus);
                };
                this.createDeptForm.ajaxReq();
                console.log(this.view.createDeptForm.attr('action'));
            },
            //Model method for updating department
            UpdateDept: function() {
                var obj = this;
                obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
                obj.view.updateErrorAlert.empty(); //Remove update error alert elements
                this.updateDeptForm.formObject = this.view.updateDeptForm;
                console.log(this.updateDeptForm.formObject.attr('method')+' '+this.updateDeptForm.formObject.attr('action'));
                //Method before Ajax request 
                this.updateDeptForm.beforeAjaxReq = function() {
                    obj.view.updateDeptBtn.prop('disabled', true); //Disable update button
                };
                //Method after successful Ajax request 
                this.updateDeptForm.successfullAjaxReq = function(response, jqXHR) {
                    obj.view.updateDeptBtn.prop('disabled', false); //Enable Department Button
                    obj.view.components.success.data = "Department successfully updated";
                    obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'deptSuccessAlert' in view
                    obj.reloadSearchDept(); //Reload search request to update the displayed Faculties (without refreshing pagination) 
                    obj.view.updateDeptForm[0].reset(); //Reset submit form
                    console.log('success' + ' ' + jqXHR + ' ' + response);
                };
                //Method after failed Ajax request
                this.updateDeptForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                    var responseErrors;
                    obj.view.updateDeptBtn.prop('disabled', false); //Enable submit button for create department form
                    obj.view.components.error.data.message = error; //Transfer response error to error template
                    //Request status code for "Unknown Response"
                    if (jqXHR.status == 419) {
                        obj.view.components.error.data.errors = "<br> Session Expired. Please reload the webpage";
                    }
                    //Request status code for "Unknown Response"
                    else if (jqXHR.status == 422) {
                        responseErrors = JSON.parse(jqXHR.responseText);
                        for (var responseError of Object.keys(responseErrors.errors)) {
                            for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                obj.view.components.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                            }
                        }
                    }
                    //Request status code for "Internal server error"
                    else {
                        obj.view.components.error.data.errors = "<br> Internal server error. Please reload page";
                    }
                    obj.view.updateErrorAlert.append(obj.view.components.error.template());
                    console.log('fail' + ' ' + error + ' ' + jqXHR.responseText + ' ' + textStatus);
                };
                this.updateDeptForm.ajaxReq();
                console.log(this.view.updateDeptForm.attr('action'));
            },
            //Model for search department Ajax states
            searchDept: function() {
                this.searchAllDept.searchObject = this.view.searchDeptForm; //Input element for department search
                var obj = this; // Assigning the Department Model instance to 'obj' variable
                obj.view.searchDeptError.empty(); //Remove search error alert
                this.searchAllDept.beforeAjaxReq = function() { //Action to be performed before Ajax request
                    obj.view.searchDeptBtn.prop('disabled', true); //Disable search button
                };
                this.searchAllDept.successfullAjaxReq = function(response) { //Action to be performed after successfull Ajax request
                    obj.view.searchDeptResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                    obj.view.searchDeptBtn.prop('disabled', false); //Enable search button
                    if (response == '') { //if the search result is empty
                    	obj.view.searchNextDept.prop('disabled',true); //Disable Next Search Button
                    	obj.view.searchDeptResult.append(`<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>`);
                    } 
                    else {
                    	obj.view.searchNextDept.prop('disabled',false); //Enable Next Search Button
                    	obj.view.searchComponents.success.data = response; // Assign recieved data to search component
	                    obj.view.searchDeptResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Department view in 'searchResult' id
	                    console.log('success');
                    }
                };
                this.searchAllDept.failedAjaxReq = function() { //Action to be performed after failed ajax Request 
                    obj.view.searchDeptBtn.prop('disabled', false); //Enable search button
                    obj.view.searchDeptError.empty(); //Remove search error alert
                    obj.view.searchDeptError.append(obj.view.searchComponents.error.template);//Display error alert on failed serach
                    console.log('fail');
                };
            },
            //Model for next pagination button
            nextSearchPaginate:function(){
            	this.searchDept(); //load all Ajax asychronous states
            	this.searchAllDept.nextPaginate(); //increase pagination and Perform Ajax request
            },
            //Model for previous pagination button
            prevSearchPaginate:function(){
            	this.searchDept(); //load all Ajax asychronous states
            	this.searchAllDept.prevPaginate(); //Decrease pagination and Perform Ajax request 
            },
            //Model for new search request
            refreshSearchDept:function(){
            	this.searchDept(); //load all Ajax asychronous states
            	this.searchAllDept.searchReq(); //Refresh pagination to zero and Perform Ajax request 
            },
            //Model for new search request (without pagination refresh)
	        reloadSearchDept: function() {
	            this.searchDept(); //load all Ajax asychronous states
	            this.searchAllDept.ajaxReq(); //Perform Ajax request without refreshing pagination  
	        },
            //Model for transfer department data to the modal
            transferDeptData:function (domObject) {
            	/* body... */
            	console.log(domObject);
            	ModalDataTransfer.domObject = domObject;
            	ModalDataTransfer.headerData = {'#modalDeptHeader': $('.deptName')} ; //Data to be transfered to the modal's header
            	ModalDataTransfer.formActionData = {'#updateDepartment': $('.deptName')}; //Data to be transfered to the action attribute of the modal's form
            	ModalDataTransfer.inputData = {'#qg-update-name':$('.deptName'), '#qg-update-description':$('.deptDescription')}; //Data to be transfered to the input's value of the modal's form
            	ModalDataTransfer.init(); //perform the transfer
            }
        };
        /*Department Controller*/
        const DepartmentController = function() {
            this.view = new DepartmentView();
            this.model = new DepartmentModel();
        }
        DepartmentController.prototype = {
            //Controller for creating new department
            createDept: function() {
                var obj = this;
                this.view.createDeptBtn.click(function(e) {
                    e.preventDefault();
                    obj.model.CreateDept();
                })
                return obj;
            },
            //Controller for updating department
            updateDept: function() {
                var obj = this;
                this.view.updateDeptBtn.click(function(e) {
                    e.preventDefault();
                    obj.model.UpdateDept();
                })
                return obj;
            },
            //Controller for loading created departments to view
            loadDept: function() {
                this.model.refreshSearchDept()
                return this;
            },
            //Controller for searching for created departments
            searchDept: function() {
                var obj = this;
                this.view.searchDeptInput.keyup(function(e) {
                	e.preventDefault();
                	obj.model.refreshSearchDept()
                });
                this.view.searchDeptBtn.click(function(e) {
                	e.preventDefault();
                	obj.model.refreshSearchDept()
                })
                return obj;
            },
            //Controller for refreshing search for created departments
            refreshSearch: function() {
                var obj = this;
                this.view.reloadSearchDept.click(function(e) {
                	e.preventDefault();
                	obj.view.searchDeptForm[0].reset();
                	obj.model.refreshSearchDept()
                })
                return obj;
            },
            //Controller to paginate search (next)
            nextSearchPaginate: function() {
                var obj = this;
                this.view.searchNextDept.click(function(e) {
                	e.preventDefault();
                	obj.model.nextSearchPaginate();
                });
                return obj;
            },
             //Controller to paginate search (previous)
            prevSearchPaginate: function() {
                var obj = this;
                this.view.searchPrevDept.click(function(e) {
                	e.preventDefault();
                	obj.model.prevSearchPaginate();
                });
                return obj;
            },
             //Controller to tranfer data from downloaded departments to modal  
            transferDeptData:function () {
            	var obj = this;
            	this.view.searchDeptResult.on('click','.departmentModalAnchor',function (e) {
            		e.preventDefault();
            		var obj1 = $(this);
            		console.log(obj1);
            		obj.model.transferDeptData(obj1);
            	})
            },
            init: function() {
                this.createDept().updateDept().loadDept().searchDept().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferDeptData();
            }
        }
        new DepartmentController().init();
    }
})();