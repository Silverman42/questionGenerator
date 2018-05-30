(function() {
    /*Course View*/
    const CourseView = function() {
            this.createCourseForm = $('#createCourse'); //DOM object for create Course form
            this.createCourseBtn = $('#createCourseBtn'); //DOM object for create Course submit button
            this.searchCourseForm = $('#searchCourse'); //DOM object for search Course form 
            this.searchCourseBtn = $('#searchCourseBtn'); //DOM object for search Course submit button
            this.searchCourseInput = $('#searchCourseInput'); //DOM object for search Course input
            this.searchCourseResult = $('#searchResult'); //DOM object for search Course result
            this.reloadSearchCourse = $('#reloadCourseBtn'); //DOM object for reloading search Course result
            this.searchNextCourse = $('#courseNextSearch'); //DOM object for search Course pagination button (Next)
            this.searchPrevCourse = $('#coursePrevSearch'); //DOM object for search Course pagination button (Previous)
            this.searchCourseError = $('#searchCourseError') //DOM object for displaying serach error
            this.createSuccessAlert = $('#courseSuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#courseErrorAlert'); //DOM object for error alert
            this.updateCourseForm = $('#updateCourse'); //DOM object for update Course form
            this.updateCourseBtn = $('#updateCourseBtn'); //DOM object for update Course submit button
            this.updateSuccessAlert = $('#courseUpdateSuccessAlert'); //DOM object for update success alert
            this.updateErrorAlert = $('#courseUpdateErrorAlert'); //DOM object for update error alert
            this.courseModalAnchor = $('.courseModalAnchor'); //DOM object for Course anchor button for modal popup
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
											<div class="font-primary courseName" data-url="${appData.hostname}/courses/${datum.id}" style="padding: 10px">${datum.name}</div>
											<div class="font-secondary" style="padding: 10px">
												<span class="badge badge-primary" style='font-size:13px'>${datum.departments.name} Faculty</span>
												<span class="badge badge-success" style='font-size:13px'>${datum.course_code}</span>
												<p class="courseDescription" style='color:grey'>${datum.description}</p>
											</div>
										</div>
										<div class="qg-col--xs--2 qg-flex">
											<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center courseModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
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
        /*Course Model*/
    const CourseModel = function() {
        this.view = new CourseView();
        /*Create Course Form*/
        this.createCourseForm = new FormSubmit(); //new create Course instance  of form submission object 
        this.updateCourseForm = new FormSubmit(); //new create Course instance of form submission object
        this.searchAllCourse = new ItemSearch(); //new search Course instance of Item search object object
    }
    CourseModel.prototype = {
        //Model method for creating Course
        CreateCourse: function() {
            var obj = this;
            obj.view.createSuccessAlert.empty(); //Remove success alert elements
            obj.view.createErrorAlert.empty(); //Remove error alert elements
            this.createCourseForm.formObject = this.view.createCourseForm;
            //Method before Ajax request 
            this.createCourseForm.beforeAjaxReq = function() {
                obj.view.createCourseBtn.prop('disabled', true);
            };
            //Method after successful Ajax request 
            this.createCourseForm.successfullAjaxReq = function(response, jqXHR) {
                obj.view.createCourseBtn.prop('disabled', false);
                obj.view.components.success.data = "Course successfully created";
                obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'CourseSuccessAlert' in view
                obj.refreshSearchCourse() //Reload search request to update the displayed Courses 
                obj.view.createCourseForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.createCourseForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                var responseErrors;
                obj.view.createCourseBtn.prop('disabled', false); //Enable submit button for create Course form
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
            this.createCourseForm.ajaxReq();
            console.log(this.view.createCourseForm.attr('action'));
        },
        //Model method for updating Course
        UpdateCourse: function() {
            var obj = this;
            obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
            obj.view.updateErrorAlert.empty(); //Remove update error alert elements
            this.updateCourseForm.formObject = this.view.updateCourseForm;
            console.log(this.updateCourseForm.formObject.attr('method') + ' ' + this.updateCourseForm.formObject.attr('action'));
            //Method before Ajax request 
            this.updateCourseForm.beforeAjaxReq = function() {
                obj.view.updateCourseBtn.prop('disabled', true); //Disable update button
            };
            //Method after successful Ajax request 
            this.updateCourseForm.successfullAjaxReq = function(response, jqXHR) {
                obj.view.updateCourseBtn.prop('disabled', false); //Enable Course Button
                obj.view.components.success.data = "Course successfully updated";
                obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'CourseSuccessAlert' in view
                obj.reloadSearchCourse(); //Reload search request to update the displayed Courseulties (without refreshing pagination) 
                obj.view.updateCourseForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.updateCourseForm.failedAjaxReq = function(jqXHR, textStatus, error) {
                var responseErrors;
                obj.view.updateCourseBtn.prop('disabled', false); //Enable submit button for create Course form
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
            this.updateCourseForm.ajaxReq();
            console.log(this.view.updateCourseForm.attr('action'));
        },
        //Model for search Course Ajax states
        searchCourse: function() {
            this.searchAllCourse.searchObject = this.view.searchCourseForm; //Input element for Course search
            var obj = this; // Assigning the Course Model instance to 'obj' variable
            obj.view.searchCourseError.empty(); //Remove search error alert
            this.searchAllCourse.beforeAjaxReq = function() { //Action to be performed before Ajax request
                obj.view.searchCourseBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllCourse.successfullAjaxReq = function(response) { //Action to be performed after successfull Ajax request
                obj.view.searchCourseResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchCourseBtn.prop('disabled', false); //Enable search button
                if (response == '') { //if the search result is empty
                    obj.view.searchNextCourse.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchCourseResult.append(`<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>`);
                } else {
                    obj.view.searchNextCourse.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchCourseResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Course view in 'searchResult' id
                    console.log(response);
                }
            };
            this.searchAllCourse.failedAjaxReq = function() { //Action to be performed after failed ajax Request 
                obj.view.searchCourseBtn.prop('disabled', false); //Enable search button
                obj.view.searchCourseError.empty(); //Remove search error alert
                obj.view.searchCourseError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                console.log('fail');
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.prevPaginate(); //Decrease pagination and Perform Ajax request 
        },
        //Model for new search request
        refreshSearchCourse: function() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.searchReq(); //Refresh pagination to zero and Perform Ajax request 
        },
        //Model for new search request (without pagination refresh)
        reloadSearchCourse: function() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.ajaxReq(); //Perform Ajax request without refreshing pagination  
        },
        //Model for transfer Course data to the modal
        transferCourseData: function(domObject) {
            /* body... */
            console.log(domObject);
            ModalDataTransfer.domObject = domObject;
            ModalDataTransfer.headerData = {
                '#modalCourseHeader': $('.courseName')
            }; //Data to be transfered to the modal's header
            ModalDataTransfer.formActionData = {
                '#updateCourse': $('.courseName')
            }; //Data to be transfered to the action attribute of the modal's form
            ModalDataTransfer.inputData = {
                '#qg-update-name': $('.courseName'),
                '#qg-update-description': $('.courseDescription'),
                '#qg-update-course-code': $('.courseCode')
            }; //Data to be transfered to the input's value of the modal's form
            ModalDataTransfer.init(); //perform the transfer
        }
    };
    /*Course Controller*/
    const CourseController = function() {
        this.view = new CourseView();
        this.model = new CourseModel();
    }
    CourseController.prototype = {
        //Controller for creating new Course
        createCourse: function() {
            var obj = this;
            this.view.createCourseBtn.click(function(e) {
                e.preventDefault();
                obj.model.CreateCourse();
            })
            return obj;
        },
        //Controller for updating Course
        updateCourse: function() {
            var obj = this;
            this.view.updateCourseBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateCourse();
            })
            return obj;
        },
        //Controller for loading created Courses to view
        loadCourse: function() {
            this.model.refreshSearchCourse()
            return this;
        },
        //Controller for searching for created Courses
        searchCourse: function() {
            var obj = this;
            this.view.searchCourseInput.keyup(function(e) {
                e.preventDefault();
                obj.model.refreshSearchCourse()
            });
            this.view.searchCourseBtn.click(function(e) {
                e.preventDefault();
                obj.model.refreshSearchCourse()
            })
            return obj;
        },
        //Controller for refreshing search for created Courses
        refreshSearch: function() {
            var obj = this;
            this.view.reloadSearchCourse.click(function(e) {
                e.preventDefault();
                obj.view.searchCourseForm[0].reset();
                obj.model.refreshSearchCourse()
            })
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function() {
            var obj = this;
            this.view.searchNextCourse.click(function(e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function() {
            var obj = this;
            this.view.searchPrevCourse.click(function(e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Courses to modal  
        transferCourseData: function() {
            var obj = this;
            this.view.searchCourseResult.on('click', '.courseModalAnchor', function(e) {
                e.preventDefault();
                var obj1 = $(this);
                console.log(obj1);
                obj.model.transferCourseData(obj1);
            })
        },
        init: function() {
            this.createCourse().updateCourse().loadCourse().searchCourse().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferCourseData();
        }
    }
    new CourseController().init();
})();
console.log('righthere');