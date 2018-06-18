(function() {
    /*Reset Password View*/
    const resetPassView = function() {
    		//Form element objects
            this.resetPassForm = $('#resetPassForm'); //DOM object for reset Password form
            this.resetPassBtn = $('#resetPassBtn'); //DOM object for resetPass form submit button

            //Alert objects
            this.resetPassErrorAlert = $('#resetPassErrorAlert'); //DOM object for resetPass success alert
            this.resetPassSuccessAlert = $('#resetPassSuccessAlert'); //DOM object for resetPass error alert

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
        }
    /*Reset Password Model*/
    const resetPassModel = function() {
        this.view = new resetPassView();
        /*Create resetPass Form*/
        this.resetPassForm = new FormSubmit(); //new create resetPass instance  of form submission object 
    }
    resetPassModel.prototype = {
        //Model method for creating resetPass
        submitModule: (function() {
            var obj;
            var submitForm = {
                    errorAlert: "",
                    successAlert: "",
                    formModule: "",
                    formElement: "",
                    submitButton: "",
                    component: "",
                    refreshSearch: "",
                    init: function() {
                        obj = this ;
                        this.successAlert.empty(); //Remove success alert elements
                        this.errorAlert.empty(); //Remove error alert elements
                        this.formModule.formObject = this.formElement;
                        //Method before Ajax request
                        this.formModule.beforeAjaxReq = function() {
                            obj.submitButton.prop('disabled', true);
                        };
                        //Method after successful Ajax request
                        this.formModule.successfullAjaxReq = function(response, jqXHR) {
                            obj.submitButton.prop('disabled', false);
                            obj.successAlert.append(obj.component.success.template()); //Append success message from server to id 'AdminSuccessAlert' in view
                            obj.refreshSearch() //Reload search request to update the displayed Admins
                            obj.formElement[0].reset(); //Reset submit form
                        };
                        //Method after failed Ajax request
                        this.formModule.failedAjaxReq = function(jqXHR, textStatus, error) {
                            var responseErrors;
                            obj.submitButton.prop('disabled', false); //Enable submit button for create Admin form
                            obj.component.error.data.message = error;
                            //Request status code for "Unknown Response"
                            if (jqXHR.status == 419) {
                                obj.component.error.data.errors = "<br> Session Expired. Please reload the webpage";
                            }
                            //Request status code for "Unknown Response"
                            else if (jqXHR.status == 422) {
                                responseErrors = JSON.parse(jqXHR.responseText);
                                obj.component.error.data.errors = "";
                                for (var responseError of Object.keys(responseErrors.errors)) {
                                    for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                        obj.component.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                                    }
                                }
                            }
                            //Request status code for "Resource not found"
                            else if (jqXHR.status == 404) {
                                responseErrors = JSON.parse(jqXHR.responseText);
                                obj.component.error.data.errors = "<br> "+responseErrors;
                            }
                            //Request status code for "Internal server error"
                            else {
                                obj.component.error.data.errors = "<br> Internal server error. Please reload page";
                            }
                            obj.errorAlert.append(obj.component.error.template());
                        };
                        this.formModule.ajaxReq();
                    }
                }
                return submitForm;
        }()),
        //Model method for admin resetPass
        resetPass: function() {
            var obj = this
            this.view.components.success.data = "Your password has been successfully reset, please login with your new password in the login screen"
            this.submitModule.errorAlert = this.view.resetPassErrorAlert;
            this.submitModule.successAlert = this.view.resetPassSuccessAlert;
            this.submitModule.formModule = this.resetPassForm;
            this.submitModule.formElement = this.view.resetPassForm;
            this.submitModule.submitButton = this.view.resetPassBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { };
            this.submitModule.init();
        },
    };
    /*Reset Password Controller*/
    const resetPassController = function() {
        this.view = new resetPassView();
        this.model = new resetPassModel();
    }
    resetPassController.prototype = {
        //Controller for creating new resetPass
        resetPass: function() {
            var obj = this;
            this.view.resetPassBtn.click(function(e) {
                e.preventDefault();
                obj.model.resetPass();
            })
            return obj;
        },
        init: function() {
            this.resetPass();
        }
    }
    new resetPassController().init();
})();