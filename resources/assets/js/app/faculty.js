(function() {
    /*Faculty View*/
    const FacultyView = function() {
            this.createFacForm = $('#createFaculty'); //DOM object for create Faculty form
            this.createFacBtn = $('#createFacultyBtn'); //DOM object for create Faculty submit button
            this.searchFacForm = $('#searchFaculty'); //DOM object for search Faculty form 
            this.searchFacBtn = $('#searchFacultyBtn'); //DOM object for search Faculty submit button
            this.searchFacInput = $('#searchFacultyInput'); //DOM object for search Faculty input
            this.searchFacResult = $('#searchResult'); //DOM object for search Faculty result
            this.reloadSearchFac = $('#reloadFacultyBtn'); //DOM object for reloading search Faculty result
            this.searchNextFac = $('#FacNextSearch'); //DOM object for search Faculty pagination button (Next)
            this.searchPrevFac = $('#FacPrevSearch'); //DOM object for search Faculty pagination button (Previous)
            this.searchFacError = $('#searchFacultyError') //DOM object for displaying serach error
            this.createSuccessAlert = $('#facultySuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#facultyErrorAlert'); //DOM object for error alert
            this.updateFacForm = $('#updateFaculty'); //DOM object for update Faculty form
            this.updateFacBtn = $('#updateFacultyBtn'); //DOM object for update Faculty submit button
            this.updateSuccessAlert = $('#facUpdateSuccessAlert'); //DOM object for update success alert
            this.updateErrorAlert = $('#facUpdateErrorAlert'); //DOM object for update error alert
            this.FacModalAnchor = $('.facultyModalAnchor'); //DOM object for Faculty anchor button for modal popup
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
											<div class="font-primary facName" data-url="${appData.hostname}/faculty/${datum.id}" style="padding: 10px">${datum.name}</div>
											<div class="font-secondary" style="padding: 10px">
												<p class="facDescription" style='color:grey'>${datum.description}</p>
											</div>
										</div>
										<div class="qg-col--xs--2 qg-flex">
											<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center facultyModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
										</div>
									</div>`
                        }
                        return html;
                    }
                },
                error: {
                    template: `<div class="alert alert-danger">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							<strong>Error!!</strong> <p>Internal Server Error, Please check your network connection</p>
						</div>`
                }
            }
        }
        /*Faculty Model*/
    const FacultyModel = function() {
        this.view = new FacultyView();
        /*Create Faculty Form*/
        this.createFacForm = new FormSubmit(); //new create Faculty instance  of form submission object 
        this.updateFacForm = new FormSubmit(); //new create Faculty instance of form submission object
        this.searchAllFac = new ItemSearch(); //new search Faculty instance of Item search object object
    }
    FacultyModel.prototype = {
        //Model method for creating Faculty
        CreateFac: function() {
            var obj = this;
            obj.view.createSuccessAlert.empty(); //Remove success alert elements
            obj.view.createErrorAlert.empty(); //Remove error alert elements
            this.createFacForm.formObject = this.view.createFacForm;
            //Method before Ajax request 
            this.createFacForm.beforeAjaxReq = function() {
                obj.view.createFacBtn.prop('disabled', true);
            };
            //Method after successful Ajax request 
            this.createFacForm.successfullAjaxReq = function(response, jqXHR) {
                obj.view.createFacBtn.prop('disabled', false);
                obj.view.components.success.data = "Faculty successfully created";
                obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'FacSuccessAlert' in view
                obj.refreshSearchFac() //Reload search request to update the displayed Facultys 
                obj.view.createFacForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.createFacForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                var responseErrors;
                obj.view.createFacBtn.prop('disabled', false); //Enable submit button for create Faculty form
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
            this.createFacForm.ajaxReq();
            console.log(this.view.createFacForm.attr('action'));
        },
        //Model method for updating Faculty
        UpdateFac: function() {
            var obj = this;
            obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
            obj.view.updateErrorAlert.empty(); //Remove update error alert elements
            this.updateFacForm.formObject = this.view.updateFacForm;
            console.log(this.updateFacForm.formObject.attr('method') + ' ' + this.updateFacForm.formObject.attr('action'));
            //Method before Ajax request 
            this.updateFacForm.beforeAjaxReq = function() {
                obj.view.updateFacBtn.prop('disabled', true); //Disable update button
            };
            //Method after successful Ajax request 
            this.updateFacForm.successfullAjaxReq = function(response, jqXHR) {
                obj.view.updateFacBtn.prop('disabled', false); //Enable Faculty Button
                obj.view.components.success.data = "Faculty successfully updated";
                obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'FacSuccessAlert' in view
                obj.reloadSearchFac(); //Reload search request to update the displayed Faculties (without refreshing pagination) 
                obj.view.updateFacForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.updateFacForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                var responseErrors;
                obj.view.updateFacBtn.prop('disabled', false); //Enable submit button for create Faculty form
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
            this.updateFacForm.ajaxReq();
            console.log(this.view.updateFacForm.attr('action'));
        },
        //Model for search Faculty Ajax states
        searchFac: function() {
            this.searchAllFac.searchObject = this.view.searchFacForm; //Input element for Faculty search
            var obj = this; // Assigning the Faculty Model instance to 'obj' variable
            obj.view.searchFacError.empty(); //Remove search error alert
            this.searchAllFac.beforeAjaxReq = function() { //Action to be performed before Ajax request
                obj.view.searchFacBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllFac.successfullAjaxReq = function(response) { //Action to be performed after successfull Ajax request
                obj.view.searchFacResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchFacBtn.prop('disabled', false); //Enable search button
                if (response == '') { //if the search result is empty
                    obj.view.searchNextFac.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchFacResult.append(`<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>`);
                } else {
                    obj.view.searchNextFac.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchFacResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Faculty view in 'searchResult' id
                    console.log('success');
                }
            };
            this.searchAllFac.failedAjaxReq = function() { //Action to be performed after failed ajax Request 
                obj.view.searchFacBtn.prop('disabled', false); //Enable search button
                obj.view.searchFacError.empty(); //Remove search error alert
                obj.view.searchFacError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                console.log('fail');
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.prevPaginate(); //Decrease pagination and Perform Ajax request 
        },
        //Model for new search request
        refreshSearchFac: function() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.searchReq(); //Refresh pagination to zero and Perform Ajax request 
        },
        //Model for new search request (without pagination refresh)
        reloadSearchFac: function() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.ajaxReq(); //Perform Ajax request without refreshing pagination  
        },
        //Model for transfer Faculty data to the modal
        transferFacData: function(domObject) {
            /* body... */
            console.log(domObject);
            ModalDataTransfer.domObject = domObject;
            ModalDataTransfer.headerData = {
                '#modalFacHeader': $('.facName')
            }; //Data to be transfered to the modal's header
            ModalDataTransfer.formActionData = {
                '#updateFaculty': $('.facName')
            }; //Data to be transfered to the action attribute of the modal's form
            ModalDataTransfer.inputData = {
                '#qg-update-name': $('.facName'),
                '#qg-update-description': $('.facDescription')
            }; //Data to be transfered to the input's value of the modal's form
            ModalDataTransfer.init(); //perform the transfer
        }
    };
    /*Faculty Controller*/
    const FacultyController = function() {
        this.view = new FacultyView();
        this.model = new FacultyModel();
    }
    FacultyController.prototype = {
        //Controller for creating new Faculty
        createFac: function() {
            var obj = this;
            this.view.createFacBtn.click(function(e) {
                e.preventDefault();
                obj.model.CreateFac();
            })
            return obj;
        },
        //Controller for updating Faculty
        updateFac: function() {
            var obj = this;
            this.view.updateFacBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateFac();
            })
            return obj;
        },
        //Controller for loading created Facultys to view
        loadFac: function() {
            this.model.refreshSearchFac()
            return this;
        },
        //Controller for searching for created Facultys
        searchFac: function() {
            var obj = this;
            this.view.searchFacInput.keyup(function(e) {
                e.preventDefault();
                obj.model.refreshSearchFac()
            });
            this.view.searchFacBtn.click(function(e) {
                e.preventDefault();
                obj.model.refreshSearchFac()
            })
            return obj;
        },
        //Controller for refreshing search for created Facultys
        refreshSearch: function() {
            var obj = this;
            this.view.reloadSearchFac.click(function(e) {
                e.preventDefault();
                obj.view.searchFacForm[0].reset();
                obj.model.refreshSearchFac()
            })
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function() {
            var obj = this;
            this.view.searchNextFac.click(function(e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function() {
            var obj = this;
            this.view.searchPrevFac.click(function(e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Facultys to modal  
        transferFacData: function() {
            var obj = this;
            this.view.searchFacResult.on('click', '.facultyModalAnchor', function(e) {
                e.preventDefault();
                var obj1 = $(this);
                console.log(obj1);
                obj.model.transferFacData(obj1);
            })
        },
        init: function() {
            this.createFac().updateFac().loadFac().searchFac().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferFacData();
        }
    }
    new FacultyController().init();
})();