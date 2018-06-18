var appData = (function() {
  'use strict';

  var appData = {
    hostname: window.location.origin,
  };

  return appData;
}());
// body...
var tabSwitch = (function(argument) {
    var defaultTabButton = '',
        tabButtonArray = [],
        tabArray = [],
        classTabRemove,
        obj;
    return {
        triggerTabSwitch: function() {
            for (var i = tabArray.length - 1; i >= 0; i--) {
                console.log('love');
                tabArray[i].addClass(classTabRemove);
            }
            if (window.location.hash == "") {
                defaultTab.removeClass(classTabRemove);
            } else {
                $(window.location.hash).removeClass(classTabRemove);
            }
        },
        clickEvent: function(defaultTabs, tabKeys = [], tabs = [], classRemove) {
            // body...
            obj = this
            defaultTab = defaultTabs;
            tabButtonArray = tabKeys;
            classTabRemove = classRemove;
            tabArray = tabs;
            console.log(tabButtonArray[1]);
            obj.triggerTabSwitch();
            for (var i = tabButtonArray.length - 1; i >= 0; i--) {
                tabButtonArray[i].click(function(e) {
                    // body...
                    e.preventDefault();
                    window.location.hash = $(this).attr('href');
                    console.log('fly');
                    obj.triggerTabSwitch();
                });
            }
        }
    }
    // body...
})();

//Toggle html element Class
var classToggle = (function() {
    return {
        remove: function(toggleClass, target) {
            target.removeClass(toggleClass);
        },
        add: function(toggleClass, target) {
            target.addClass(toggleClass);
        },
        toggle: function(toggleClass, target) {
            target.toggleClass(toggleClass);
        }
    }
})();

//Ajax Form submition module
const FormSubmit = (function() {
    var ajaxObj;
    var obj;
    var tempFormData;
    var tempFormObject;
    return {
        formObject: "",
        formData: function() {
            tempFormObject = this.formObject;
            tempFormData = new FormData(tempFormObject[0]);
            return tempFormData;
        },
        contentType:function () {
          /* body... */
          if(this.formObject.attr('method') === 'PUT'){
            return 'application/json';
          }
          else{
            return false;
          }
        },
        ajaxParam: function() {
            obj = this;
            return {
                method: obj.formObject.attr('method'),
                url: obj.formObject.attr('action'),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                data: obj.formData(),
                enctype: 'multipart/form-data',
                processData: false, // tell jQuery not to process the data
                contentType: obj.contentType(),
                beforeSend: function() {
                    obj.beforeAjaxReq()
                },
                success: function(response, status, jqXHR) {
                    obj.successfullAjaxReq(response, jqXHR)
                },
                error: function(jqXHR, textStatus, error) {
                    obj.failedAjaxReq(jqXHR, textStatus, error)
                }
            }
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function() {
            obj = this;
            $.ajax(obj.ajaxParam());
        }
    }
});
//Ajax Item search module
const ItemSearch = (function() {
    var ajaxObj;
    var obj;
    var tempSearchData;
    var tempSearchObject;
    return {
        searchObject: "",
        paginateNum: 0,
        formData: function() {
            tempSearchObject = this.searchObject;
            tempFormData = tempSearchObject.serialize();
            return tempFormData + "&paginate=" + this.paginateNum;
        },
        ajaxParam: function() {
            obj = this;
            return {
                method: 'GET',
                url: obj.searchObject.attr('action'),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                data: obj.formData(),
                beforeSend: function() {
                    obj.beforeAjaxReq()
                },
                success: function(response) {
                    obj.successfullAjaxReq(response)
                },
                error: function(jqXHR, textStatus, error) {
                    obj.failedAjaxReq(jqXHR, textStatus, error)
                }
            }
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function() {
            obj = this;
            $.ajax(obj.ajaxParam());
        },
        nextPaginate: function() {
            this.paginateNum++;
            this.ajaxReq();
        },
        prevPaginate: function() {
            if (this.paginateNum > 0) {
                this.paginateNum--;
                this.ajaxReq();
            }
        },
        searchReq: function() {
            this.paginateNum = 0;
            this.ajaxReq();
        }
    }
});

/*
**@decsription : Module for button ajax request
*/
const ButtonRequest = (function() {
    var ajaxObj;
    var obj;
    return {
        action:"",
        method:"",
        data:"",
        ajaxParam: function() {
            obj = this;
            return {
                method: obj.method,
                url: obj.action,
                data: obj.data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                beforeSend: function() {
                    obj.beforeAjaxReq()
                },
                success: function(response) {
                    obj.successfullAjaxReq(response)
                },
                error: function(jqXHR, textStatus, error) {
                    obj.failedAjaxReq(jqXHR, textStatus, error)
                }
            }
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function() {
            obj = this;
            $.ajax(obj.ajaxParam());
        }
    }
});

var ModalDataTransfer = (function() {
    'use strict';
    var domData;
    var moduleName = {
        domObject: '',
        headerData: '',
        formActionData: '',
        inputData: '',
        fetchData: '',
        processHeader: function() {
            /* Process header data */
            if (typeof this.headerData === 'object') {
                for (var data of Object.keys(this.headerData)) {
                    domData = this.domObject.parent().parent().find(this.headerData[data]).text();
                    $(data).text(domData);
                }
            }
            return this;
        },
        processFormAction: function() {
            if (typeof this.formActionData === 'object') {
                for (var data of Object.keys(this.formActionData)) {
                    domData = this.domObject.parent().parent().find(this.formActionData[data]).data('url');
                    $(data).attr('action', domData);
                    console.log($(data).attr('action'));
                }
            }
            return this;
        },
        processInputData: function() {
            if (typeof this.inputData === 'object') {
                for (var data of Object.keys(this.inputData)) {
                    domData = this.domObject.parent().parent().find(this.inputData[data]).text();
                    $(data).val(domData);
                }
            }
            return this;
        },
        processFetchedData: function() {
            if (this.fetchData !== '') {
                this.fetchData();
            }
            return this;
        },
        init: function() {
            this.processHeader().processInputData().processFormAction().processFetchedData()
        }
    };
    return moduleName;
}());


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