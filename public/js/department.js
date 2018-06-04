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
        fetchData: '',
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
        processFetchedData: function processFetchedData() {
            if (this.fetchData !== '') {
                this.fetchData();
            }
            return this;
        },
        init: function init() {
            this.processHeader().processInputData().processFormAction().processFetchedData();
        }
    };
    return moduleName;
}();

(function () {
    var SidebarView = function SidebarView() {
        this.sidebar = $('#js-qg-sidebar');
        this.remove_icon = $('#js-qg-sidebar--remove-icon');
        this.burger = $('#js-qg-burger');
        this.link = $('.js-qg-sublink');
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
            e.preventDefault();
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
    if ($('#js-department').length == 1) {
        /*Department View*/
        var DepartmentView = function DepartmentView() {
            this.createDeptForm = $('#createDepartment'); //DOM object for create department form
            this.createDeptBtn = $('#createDepartmentBtn'); //DOM object for create department submit button
            this.searchDeptForm = $('#searchDepartment'); //DOM object for search department form 
            this.searchDeptBtn = $('#searchDepartmentBtn'); //DOM object for search department submit button
            this.searchDeptInput = $('#searchDepartmentInput'); //DOM object for search department input
            this.searchDeptResult = $('#searchResult'); //DOM object for search department result
            this.reloadSearchDept = $('#reloadDepartmentBtn'); //DOM object for reloading search department result
            this.searchNextDept = $('#deptNextSearch'); //DOM object for search department pagination button (Next)
            this.searchPrevDept = $('#deptPrevSearch'); //DOM object for search department pagination button (Previous)
            this.searchDeptError = $('#searchDepartmentError'); //DOM object for displaying serach error
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
                                html += '<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--8 qg-animate--card-content">\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-primary deptName" data-url="' + appData.hostname + '/departments/' + datum.id + '" style="padding: 10px">' + datum.name + '</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-secondary" style="padding: 10px">\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="badge badge-primary" style=\'font-size:13px\'>' + datum.faculty.name + ' Faculty</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<p class="deptDescription" style=\'color:grey\'>' + datum.description + '</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--2 qg-flex">\n\t\t\t\t\t\t\t\t\t\t\t<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center departmentModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>';
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
        /*Department Model*/
        var DepartmentModel = function DepartmentModel() {
            this.view = new DepartmentView();
            /*Create Department Form*/
            this.createDeptForm = new FormSubmit(); //new create department instance  of form submission object 
            this.updateDeptForm = new FormSubmit(); //new create department instance of form submission object
            this.searchAllDept = new ItemSearch(); //new search department instance of Item search object object
        };
        DepartmentModel.prototype = {
            //Model method for creating department
            CreateDept: function CreateDept() {
                var obj = this;
                obj.view.createSuccessAlert.empty(); //Remove success alert elements
                obj.view.createErrorAlert.empty(); //Remove error alert elements
                this.createDeptForm.formObject = this.view.createDeptForm;
                //Method before Ajax request 
                this.createDeptForm.beforeAjaxReq = function () {
                    obj.view.createDeptBtn.prop('disabled', true);
                };
                //Method after successful Ajax request 
                this.createDeptForm.successfullAjaxReq = function (response, jqXHR) {
                    obj.view.createDeptBtn.prop('disabled', false);
                    obj.view.components.success.data = "Department successfully created";
                    obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'deptSuccessAlert' in view
                    obj.reloadSearchDept(); //Reload search request to update the displayed Faculties (without refreshing pagination)
                    obj.view.createDeptForm[0].reset(); //Reset submit form
                    console.log('success' + ' ' + jqXHR + ' ' + response);
                };
                //Method after failed Ajax request
                this.createDeptForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
                this.createDeptForm.ajaxReq();
                console.log(this.view.createDeptForm.attr('action'));
            },
            //Model method for updating department
            UpdateDept: function UpdateDept() {
                var obj = this;
                obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
                obj.view.updateErrorAlert.empty(); //Remove update error alert elements
                this.updateDeptForm.formObject = this.view.updateDeptForm;
                console.log(this.updateDeptForm.formObject.attr('method') + ' ' + this.updateDeptForm.formObject.attr('action'));
                //Method before Ajax request 
                this.updateDeptForm.beforeAjaxReq = function () {
                    obj.view.updateDeptBtn.prop('disabled', true); //Disable update button
                };
                //Method after successful Ajax request 
                this.updateDeptForm.successfullAjaxReq = function (response, jqXHR) {
                    obj.view.updateDeptBtn.prop('disabled', false); //Enable Department Button
                    obj.view.components.success.data = "Department successfully updated";
                    obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'deptSuccessAlert' in view
                    obj.reloadSearchDept(); //Reload search request to update the displayed Faculties (without refreshing pagination) 
                    obj.view.updateDeptForm[0].reset(); //Reset submit form
                    console.log('success' + ' ' + jqXHR + ' ' + response);
                };
                //Method after failed Ajax request
                this.updateDeptForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
                this.updateDeptForm.ajaxReq();
                console.log(this.view.updateDeptForm.attr('action'));
            },
            //Model for search department Ajax states
            searchDept: function searchDept() {
                this.searchAllDept.searchObject = this.view.searchDeptForm; //Input element for department search
                var obj = this; // Assigning the Department Model instance to 'obj' variable
                obj.view.searchDeptError.empty(); //Remove search error alert
                this.searchAllDept.beforeAjaxReq = function () {
                    //Action to be performed before Ajax request
                    obj.view.searchDeptBtn.prop('disabled', true); //Disable search button
                };
                this.searchAllDept.successfullAjaxReq = function (response) {
                    //Action to be performed after successfull Ajax request
                    obj.view.searchDeptResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                    obj.view.searchDeptBtn.prop('disabled', false); //Enable search button
                    if (response == '') {
                        //if the search result is empty
                        obj.view.searchNextDept.prop('disabled', true); //Disable Next Search Button
                        obj.view.searchDeptResult.append('<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>');
                    } else {
                        obj.view.searchNextDept.prop('disabled', false); //Enable Next Search Button
                        obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                        obj.view.searchDeptResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Department view in 'searchResult' id
                        console.log('success');
                    }
                };
                this.searchAllDept.failedAjaxReq = function () {
                    //Action to be performed after failed ajax Request 
                    obj.view.searchDeptBtn.prop('disabled', false); //Enable search button
                    obj.view.searchDeptError.empty(); //Remove search error alert
                    obj.view.searchDeptError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                    console.log('fail');
                };
            },
            //Model for next pagination button
            nextSearchPaginate: function nextSearchPaginate() {
                this.searchDept(); //load all Ajax asychronous states
                this.searchAllDept.nextPaginate(); //increase pagination and Perform Ajax request
            },
            //Model for previous pagination button
            prevSearchPaginate: function prevSearchPaginate() {
                this.searchDept(); //load all Ajax asychronous states
                this.searchAllDept.prevPaginate(); //Decrease pagination and Perform Ajax request 
            },
            //Model for new search request
            refreshSearchDept: function refreshSearchDept() {
                this.searchDept(); //load all Ajax asychronous states
                this.searchAllDept.searchReq(); //Refresh pagination to zero and Perform Ajax request 
            },
            //Model for new search request (without pagination refresh)
            reloadSearchDept: function reloadSearchDept() {
                this.searchDept(); //load all Ajax asychronous states
                this.searchAllDept.ajaxReq(); //Perform Ajax request without refreshing pagination  
            },
            //Model for transfer department data to the modal
            transferDeptData: function transferDeptData(domObject) {
                /* body... */
                console.log(domObject);
                ModalDataTransfer.domObject = domObject;
                ModalDataTransfer.headerData = { '#modalDeptHeader': $('.deptName') }; //Data to be transfered to the modal's header
                ModalDataTransfer.formActionData = { '#updateDepartment': $('.deptName') }; //Data to be transfered to the action attribute of the modal's form
                ModalDataTransfer.inputData = { '#qg-update-name': $('.deptName'), '#qg-update-description': $('.deptDescription') }; //Data to be transfered to the input's value of the modal's form
                ModalDataTransfer.init(); //perform the transfer
            }
        };
        /*Department Controller*/
        var DepartmentController = function DepartmentController() {
            this.view = new DepartmentView();
            this.model = new DepartmentModel();
        };
        DepartmentController.prototype = {
            //Controller for creating new department
            createDept: function createDept() {
                var obj = this;
                this.view.createDeptBtn.click(function (e) {
                    e.preventDefault();
                    obj.model.CreateDept();
                });
                return obj;
            },
            //Controller for updating department
            updateDept: function updateDept() {
                var obj = this;
                this.view.updateDeptBtn.click(function (e) {
                    e.preventDefault();
                    obj.model.UpdateDept();
                });
                return obj;
            },
            //Controller for loading created departments to view
            loadDept: function loadDept() {
                this.model.refreshSearchDept();
                return this;
            },
            //Controller for searching for created departments
            searchDept: function searchDept() {
                var obj = this;
                this.view.searchDeptInput.keyup(function (e) {
                    e.preventDefault();
                    obj.model.refreshSearchDept();
                });
                this.view.searchDeptBtn.click(function (e) {
                    e.preventDefault();
                    obj.model.refreshSearchDept();
                });
                return obj;
            },
            //Controller for refreshing search for created departments
            refreshSearch: function refreshSearch() {
                var obj = this;
                this.view.reloadSearchDept.click(function (e) {
                    e.preventDefault();
                    obj.view.searchDeptForm[0].reset();
                    obj.model.refreshSearchDept();
                });
                return obj;
            },
            //Controller to paginate search (next)
            nextSearchPaginate: function nextSearchPaginate() {
                var obj = this;
                this.view.searchNextDept.click(function (e) {
                    e.preventDefault();
                    obj.model.nextSearchPaginate();
                });
                return obj;
            },
            //Controller to paginate search (previous)
            prevSearchPaginate: function prevSearchPaginate() {
                var obj = this;
                this.view.searchPrevDept.click(function (e) {
                    e.preventDefault();
                    obj.model.prevSearchPaginate();
                });
                return obj;
            },
            //Controller to tranfer data from downloaded departments to modal  
            transferDeptData: function transferDeptData() {
                var obj = this;
                this.view.searchDeptResult.on('click', '.departmentModalAnchor', function (e) {
                    e.preventDefault();
                    var obj1 = $(this);
                    console.log(obj1);
                    obj.model.transferDeptData(obj1);
                });
            },
            init: function init() {
                this.createDept().updateDept().loadDept().searchDept().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferDeptData();
            }
        };
        new DepartmentController().init();
    }
})();