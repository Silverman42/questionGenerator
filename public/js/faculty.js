var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var appData = function () {
    'use strict';

    var appData = {
        hostname: window.location.origin
    };

    return appData;
}();
// body...
var tabSwitch = function (argument) {
    var defaultTabButton = '',
        tabButtonArray = [],
        tabArray = [],
        classTabRemove,
        obj;
    return {
        triggerTabSwitch: function triggerTabSwitch() {
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
        clickEvent: function clickEvent(defaultTabs) {
            var tabKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var tabs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var classRemove = arguments[3];

            // body...
            obj = this;
            defaultTab = defaultTabs;
            tabButtonArray = tabKeys;
            classTabRemove = classRemove;
            tabArray = tabs;
            console.log(tabButtonArray[1]);
            obj.triggerTabSwitch();
            for (var i = tabButtonArray.length - 1; i >= 0; i--) {
                tabButtonArray[i].click(function (e) {
                    // body...
                    e.preventDefault();
                    window.location.hash = $(this).attr('href');
                    console.log('fly');
                    obj.triggerTabSwitch();
                });
            }
        }
        // body...
    };
}();

//Toggle html element Class
var classToggle = function () {
    return {
        remove: function remove(toggleClass, target) {
            target.removeClass(toggleClass);
        },
        add: function add(toggleClass, target) {
            target.addClass(toggleClass);
        },
        toggle: function toggle(toggleClass, target) {
            target.toggleClass(toggleClass);
        }
    };
}();

//Ajax Form submition module
var FormSubmit = function FormSubmit() {
    var ajaxObj;
    var obj;
    var tempFormData;
    var tempFormObject;
    return {
        formObject: "",
        formData: function formData() {
            tempFormObject = this.formObject;
            tempFormData = new FormData(tempFormObject[0]);
            return tempFormData;
        },
        contentType: function contentType() {
            /* body... */
            if (this.formObject.attr('method') === 'PUT') {
                return 'application/json';
            } else {
                return false;
            }
        },
        ajaxParam: function ajaxParam() {
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
                beforeSend: function beforeSend() {
                    obj.beforeAjaxReq();
                },
                success: function success(response, status, jqXHR) {
                    obj.successfullAjaxReq(response, jqXHR);
                },
                error: function error(jqXHR, textStatus, _error) {
                    obj.failedAjaxReq(jqXHR, textStatus, _error);
                }
            };
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function ajaxReq() {
            obj = this;
            $.ajax(obj.ajaxParam());
        }
    };
};
//Ajax Item search module
var ItemSearch = function ItemSearch() {
    var ajaxObj;
    var obj;
    var tempSearchData;
    var tempSearchObject;
    return {
        searchObject: "",
        paginateNum: 0,
        formData: function formData() {
            tempSearchObject = this.searchObject;
            tempFormData = tempSearchObject.serialize();
            return tempFormData + "&paginate=" + this.paginateNum;
        },
        ajaxParam: function ajaxParam() {
            obj = this;
            return {
                method: 'GET',
                url: obj.searchObject.attr('action'),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                data: obj.formData(),
                beforeSend: function beforeSend() {
                    obj.beforeAjaxReq();
                },
                success: function success(response) {
                    obj.successfullAjaxReq(response);
                },
                error: function error(jqXHR, textStatus, _error2) {
                    obj.failedAjaxReq(jqXHR, textStatus, _error2);
                }
            };
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function ajaxReq() {
            obj = this;
            $.ajax(obj.ajaxParam());
        },
        nextPaginate: function nextPaginate() {
            this.paginateNum++;
            this.ajaxReq();
        },
        prevPaginate: function prevPaginate() {
            if (this.paginateNum > 0) {
                this.paginateNum--;
                this.ajaxReq();
            }
        },
        searchReq: function searchReq() {
            this.paginateNum = 0;
            this.ajaxReq();
        }
    };
};

/*
**@decsription : Module for button ajax request
*/
var ButtonRequest = function ButtonRequest() {
    var ajaxObj;
    var obj;
    return {
        action: "",
        method: "",
        data: "",
        ajaxParam: function ajaxParam() {
            obj = this;
            return {
                method: obj.method,
                url: obj.action,
                data: obj.data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                beforeSend: function beforeSend() {
                    obj.beforeAjaxReq();
                },
                success: function success(response) {
                    obj.successfullAjaxReq(response);
                },
                error: function error(jqXHR, textStatus, _error3) {
                    obj.failedAjaxReq(jqXHR, textStatus, _error3);
                }
            };
        },
        beforeAjaxReq: "",
        successfullAjaxReq: "",
        failedAjaxReq: "",
        ajaxReq: function ajaxReq() {
            obj = this;
            $.ajax(obj.ajaxParam());
        }
    };
};

var ModalDataTransfer = function () {
    'use strict';

    var domData;
    var moduleName = {
        domObject: '',
        headerData: '',
        formActionData: '',
        inputData: '',
        processHeader: function processHeader() {
            /* Process header data */
            if (_typeof(this.headerData) === 'object') {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(this.headerData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var data = _step.value;

                        domData = this.domObject.parent().parent().find(this.headerData[data]).text();
                        $(data).text(domData);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return this;
        },
        processFormAction: function processFormAction() {
            if (_typeof(this.formActionData) === 'object') {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(this.formActionData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var data = _step2.value;

                        domData = this.domObject.parent().parent().find(this.formActionData[data]).data('url');
                        $(data).attr('action', domData);
                        console.log($(data).attr('action'));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return this;
        },
        processInputData: function processInputData() {
            if (_typeof(this.inputData) === 'object') {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = Object.keys(this.inputData)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var data = _step3.value;

                        domData = this.domObject.parent().parent().find(this.inputData[data]).text();
                        $(data).val(domData);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
            return this;
        },
        init: function init() {
            this.processHeader().processInputData().processFormAction();
        }
    };
    return moduleName;
}();

(function () {
    var SidebarView = function SidebarView() {
        this.sidebar = $('#js-qg-sidebar');
        this.remove_icon = $('#js-qg-sidebar--remove-icon');
        this.burger = $('#js-qg-burger');
        this.link = $('#js-qg-sidebar--link>a');
        this.toogleClass = 'qg-sidebar--unhide';
        this.link_toogleClass = 'qg-sidebar--sublink--unhide';
        // body...
    };
    var SidebarController = function SidebarController() {
        this.view = new SidebarView();
        this.toogleClass = this.view.toogleClass;
        this.link_toogleClass = this.view.link_toogleClass;
        this.sidebar = this.view.sidebar;
    };
    SidebarController.prototype.init = function () {
        var toogleClass = this.toogleClass;
        var link_toogleClass = this.link_toogleClass;
        var sidebar = this.sidebar;
        this.view.remove_icon.click(function (e) {
            e.preventDefault();
            classToggle.remove(toogleClass, sidebar);
        });
        this.view.burger.click(function (e) {
            e.preventDefault();
            classToggle.add(toogleClass, sidebar);
        });
        this.view.link.click(function (e) {
            //e.preventDefault();
            var target = $(this).attr('href');
            target = $(target);
            classToggle.toggle(link_toogleClass, target);
        });
    };
    var sidebar = new SidebarController();
    sidebar.init();
    console.log('happy');
})();
(function () {
    /*Faculty View*/
    var FacultyView = function FacultyView() {
        this.createFacForm = $('#createFaculty'); //DOM object for create Faculty form
        this.createFacBtn = $('#createFacultyBtn'); //DOM object for create Faculty submit button
        this.searchFacForm = $('#searchFaculty'); //DOM object for search Faculty form 
        this.searchFacBtn = $('#searchFacultyBtn'); //DOM object for search Faculty submit button
        this.searchFacInput = $('#searchFacultyInput'); //DOM object for search Faculty input
        this.searchFacResult = $('#searchResult'); //DOM object for search Faculty result
        this.reloadSearchFac = $('#reloadFacultyBtn'); //DOM object for reloading search Faculty result
        this.searchNextFac = $('#FacNextSearch'); //DOM object for search Faculty pagination button (Next)
        this.searchPrevFac = $('#FacPrevSearch'); //DOM object for search Faculty pagination button (Previous)
        this.searchFacError = $('#searchFacultyError'); //DOM object for displaying serach error
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
                template: function template() {
                    return '<div class="alert alert-success">\n\t\t\t\t\t\t\t<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n\t\t\t\t\t\t\t<strong>Success!!!</strong> <p>' + this.data + ' </p>\n\t\t\t\t\t\t</div>';
                }
            },
            error: { //Data for failed Ajax request
                data: {
                    message: "",
                    errors: ""
                },
                template: function template() {
                    return '<div class="alert alert-danger">\n\t\t\t\t\t\t\t<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n\t\t\t\t\t\t\t<strong>Error!!</strong> <p>' + this.data.message + ' </p>' + this.data.errors + '\n\t\t\t\t\t\t</div>';
                }
            }
        };
        this.searchComponents = {
            success: {
                data: "", //Received data from Ajax request
                template: function template() {
                    var html = '';
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var datum = _step4.value;
                            //loop through the recieved data's object
                            html += '<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--8 qg-animate--card-content">\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-primary facName" data-url="' + appData.hostname + '/faculty/' + datum.id + '" style="padding: 10px">' + datum.name + '</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-secondary" style="padding: 10px">\n\t\t\t\t\t\t\t\t\t\t\t\t<p class="facDescription" style=\'color:grey\'>' + datum.description + '</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--2 qg-flex">\n\t\t\t\t\t\t\t\t\t\t\t<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center facultyModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>';
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    return html;
                }
            },
            error: {
                template: '<div class="alert alert-danger">\n\t\t\t\t\t\t\t<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n\t\t\t\t\t\t\t<strong>Error!!</strong> <p>Internal Server Error, Please check your network connection</p>\n\t\t\t\t\t\t</div>'
            }
        };
    };
    /*Faculty Model*/
    var FacultyModel = function FacultyModel() {
        this.view = new FacultyView();
        /*Create Faculty Form*/
        this.createFacForm = new FormSubmit(); //new create Faculty instance  of form submission object 
        this.updateFacForm = new FormSubmit(); //new create Faculty instance of form submission object
        this.searchAllFac = new ItemSearch(); //new search Faculty instance of Item search object object
    };
    FacultyModel.prototype = {
        //Model method for creating Faculty
        CreateFac: function CreateFac() {
            var obj = this;
            obj.view.createSuccessAlert.empty(); //Remove success alert elements
            obj.view.createErrorAlert.empty(); //Remove error alert elements
            this.createFacForm.formObject = this.view.createFacForm;
            //Method before Ajax request 
            this.createFacForm.beforeAjaxReq = function () {
                obj.view.createFacBtn.prop('disabled', true);
            };
            //Method after successful Ajax request 
            this.createFacForm.successfullAjaxReq = function (response, jqXHR) {
                obj.view.createFacBtn.prop('disabled', false);
                obj.view.components.success.data = "Faculty successfully created";
                obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'FacSuccessAlert' in view
                obj.refreshSearchFac(); //Reload search request to update the displayed Facultys 
                obj.view.createFacForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.createFacForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = Object.keys(responseErrors.errors)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var responseError = _step5.value;

                                for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                    obj.view.components.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                                }
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
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
        UpdateFac: function UpdateFac() {
            var obj = this;
            obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
            obj.view.updateErrorAlert.empty(); //Remove update error alert elements
            this.updateFacForm.formObject = this.view.updateFacForm;
            console.log(this.updateFacForm.formObject.attr('method') + ' ' + this.updateFacForm.formObject.attr('action'));
            //Method before Ajax request 
            this.updateFacForm.beforeAjaxReq = function () {
                obj.view.updateFacBtn.prop('disabled', true); //Disable update button
            };
            //Method after successful Ajax request 
            this.updateFacForm.successfullAjaxReq = function (response, jqXHR) {
                obj.view.updateFacBtn.prop('disabled', false); //Enable Faculty Button
                obj.view.components.success.data = "Faculty successfully updated";
                obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'FacSuccessAlert' in view
                obj.reloadSearchFac(); //Reload search request to update the displayed Faculties (without refreshing pagination) 
                obj.view.updateFacForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.updateFacForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = Object.keys(responseErrors.errors)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var responseError = _step6.value;

                                for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                    obj.view.components.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                                }
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
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
        searchFac: function searchFac() {
            this.searchAllFac.searchObject = this.view.searchFacForm; //Input element for Faculty search
            var obj = this; // Assigning the Faculty Model instance to 'obj' variable
            obj.view.searchFacError.empty(); //Remove search error alert
            this.searchAllFac.beforeAjaxReq = function () {
                //Action to be performed before Ajax request
                obj.view.searchFacBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllFac.successfullAjaxReq = function (response) {
                //Action to be performed after successfull Ajax request
                obj.view.searchFacResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchFacBtn.prop('disabled', false); //Enable search button
                if (response == '') {
                    //if the search result is empty
                    obj.view.searchNextFac.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchFacResult.append('<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>');
                } else {
                    obj.view.searchNextFac.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchFacResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Faculty view in 'searchResult' id
                    console.log('success');
                }
            };
            this.searchAllFac.failedAjaxReq = function () {
                //Action to be performed after failed ajax Request 
                obj.view.searchFacBtn.prop('disabled', false); //Enable search button
                obj.view.searchFacError.empty(); //Remove search error alert
                obj.view.searchFacError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                console.log('fail');
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function nextSearchPaginate() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function prevSearchPaginate() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.prevPaginate(); //Decrease pagination and Perform Ajax request 
        },
        //Model for new search request
        refreshSearchFac: function refreshSearchFac() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.searchReq(); //Refresh pagination to zero and Perform Ajax request 
        },
        //Model for new search request (without pagination refresh)
        reloadSearchFac: function reloadSearchFac() {
            this.searchFac(); //load all Ajax asychronous states
            this.searchAllFac.ajaxReq(); //Perform Ajax request without refreshing pagination  
        },
        //Model for transfer Faculty data to the modal
        transferFacData: function transferFacData(domObject) {
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
    var FacultyController = function FacultyController() {
        this.view = new FacultyView();
        this.model = new FacultyModel();
    };
    FacultyController.prototype = {
        //Controller for creating new Faculty
        createFac: function createFac() {
            var obj = this;
            this.view.createFacBtn.click(function (e) {
                e.preventDefault();
                obj.model.CreateFac();
            });
            return obj;
        },
        //Controller for updating Faculty
        updateFac: function updateFac() {
            var obj = this;
            this.view.updateFacBtn.click(function (e) {
                e.preventDefault();
                obj.model.UpdateFac();
            });
            return obj;
        },
        //Controller for loading created Facultys to view
        loadFac: function loadFac() {
            this.model.refreshSearchFac();
            return this;
        },
        //Controller for searching for created Facultys
        searchFac: function searchFac() {
            var obj = this;
            this.view.searchFacInput.keyup(function (e) {
                e.preventDefault();
                obj.model.refreshSearchFac();
            });
            this.view.searchFacBtn.click(function (e) {
                e.preventDefault();
                obj.model.refreshSearchFac();
            });
            return obj;
        },
        //Controller for refreshing search for created Facultys
        refreshSearch: function refreshSearch() {
            var obj = this;
            this.view.reloadSearchFac.click(function (e) {
                e.preventDefault();
                obj.view.searchFacForm[0].reset();
                obj.model.refreshSearchFac();
            });
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function nextSearchPaginate() {
            var obj = this;
            this.view.searchNextFac.click(function (e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function prevSearchPaginate() {
            var obj = this;
            this.view.searchPrevFac.click(function (e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Facultys to modal  
        transferFacData: function transferFacData() {
            var obj = this;
            this.view.searchFacResult.on('click', '.facultyModalAnchor', function (e) {
                e.preventDefault();
                var obj1 = $(this);
                console.log(obj1);
                obj.model.transferFacData(obj1);
            });
        },
        init: function init() {
            this.createFac().updateFac().loadFac().searchFac().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferFacData();
        }
    };
    new FacultyController().init();
})();