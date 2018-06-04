(function() {
    /*Login View*/
    const LoginView = function() {
    		//Form element objects
            this.loginForm = $('#loginForm'); //DOM object for login form
            this.loginBtn = $('#loginBtn'); //DOM object for login form submit button

            //Alert objects
            this.loginErrorAlert = $('#loginErrorAlert'); //DOM object for login success alert
            this.loginSuccessAlert = $('#loginSuccessAlert'); //DOM object for login error alert

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
        /*login Model*/
    const LoginModel = function() {
        this.view = new LoginView();
        /*Create login Form*/
        this.loginForm = new FormSubmit(); //new create login instance  of form submission object 
    }
    LoginModel.prototype = {
        //Model method for creating login
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
        //Model method for admin login
        Login: function() {
            var obj = this
            this.view.components.success.data = "Login successfull, redirecting......."
            this.submitModule.errorAlert = this.view.loginErrorAlert;
            this.submitModule.successAlert = this.view.loginSuccessAlert;
            this.submitModule.formModule = this.loginForm;
            this.submitModule.formElement = this.view.loginForm;
            this.submitModule.submitButton = this.view.loginBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { window.location.href = appData.hostname+'/dashboard' };
            this.submitModule.init();
        },
    };
    /*login Controller*/
    const LoginController = function() {
        this.view = new LoginView();
        this.model = new LoginModel();
    }
    LoginController.prototype = {
        //Controller for creating new login
        login: function() {
            var obj = this;
            this.view.loginBtn.click(function(e) {
                e.preventDefault();
                obj.model.Login();
            })
            return obj;
        },
        init: function() {
            this.login();
        }
    }
    new LoginController().init();
})();