(function() {
    /*Password recovery View*/
    const recoverPassView = function() {
    		//Form element objects
            this.recoverPassForm = $('#recover-password'); //DOM object for recoverPass form
            this.recoverPassBtn = $('#recoverPBtn'); //DOM object for recoverPass form submit button

            //Alert objects
            this.recoverPassErrorAlert = $('#recoverPSuccessAlert'); //DOM object for recoverPass success alert
            this.recoverPassSuccessAlert = $('#recoverPSuccessAlert'); //DOM object for recoverPass error alert

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
    /*Password recovery Model*/
    const recoverPassModel = function() {
        this.view = new recoverPassView();
        /*Create recoverPass Form*/
        this.recoverPassForm = new FormSubmit(); //new create recoverPass instance  of form submission object 
    }
    recoverPassModel.prototype = {
        //Model method for creating recoverPass
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
        //Model method for admin Password recovery
        recoverPass: function() {
            var obj = this
            this.view.components.success.data = "Email successfully sent, Check your email for further instruction"
            this.submitModule.errorAlert = this.view.recoverPassErrorAlert;
            this.submitModule.successAlert = this.view.recoverPassSuccessAlert;
            this.submitModule.formModule = this.recoverPassForm;
            this.submitModule.formElement = this.view.recoverPassForm;
            this.submitModule.submitButton = this.view.recoverPassBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () {''};
            this.submitModule.init();
        },
    };
    /*Password recovery Controller*/
    const recoverPassController = function() {
        this.view = new recoverPassView();
        this.model = new recoverPassModel();
    }
    recoverPassController.prototype = {
        //Controller for creating new recoverPass
        recoverPass: function() {
            var obj = this;
            this.view.recoverPassBtn.click(function(e) {
                e.preventDefault();
                obj.model.recoverPass();
            })
            return obj;
        },
        init: function() {
            this.recoverPass();
        }
    }
    new recoverPassController().init();
})();