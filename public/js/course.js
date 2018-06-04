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
    /*Course View*/
    var CourseView = function CourseView() {
        this.createCourseForm = $('#createCourse'); //DOM object for create Course form
        this.createCourseBtn = $('#createCourseBtn'); //DOM object for create Course submit button
        this.searchCourseForm = $('#searchCourse'); //DOM object for search Course form 
        this.searchCourseBtn = $('#searchCourseBtn'); //DOM object for search Course submit button
        this.searchCourseInput = $('#searchCourseInput'); //DOM object for search Course input
        this.searchCourseResult = $('#searchResult'); //DOM object for search Course result
        this.reloadSearchCourse = $('#reloadCourseBtn'); //DOM object for reloading search Course result
        this.searchNextCourse = $('#courseNextSearch'); //DOM object for search Course pagination button (Next)
        this.searchPrevCourse = $('#coursePrevSearch'); //DOM object for search Course pagination button (Previous)
        this.searchCourseError = $('#searchCourseError'); //DOM object for displaying serach error
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
                            html += '<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--8 qg-animate--card-content">\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-primary courseName" data-url="' + appData.hostname + '/courses/' + datum.id + '" style="padding: 10px">' + datum.name + '</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="font-secondary" style="padding: 10px">\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="badge badge-primary" style=\'font-size:13px\'>' + datum.departments.name + ' Faculty</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="badge badge-success" style=\'font-size:13px\'>' + datum.course_code + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t<p class="courseDescription" style=\'color:grey\'>' + datum.description + '</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="qg-col--xs--2 qg-flex">\n\t\t\t\t\t\t\t\t\t\t\t<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center courseModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>';
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
    /*Course Model*/
    var CourseModel = function CourseModel() {
        this.view = new CourseView();
        /*Create Course Form*/
        this.createCourseForm = new FormSubmit(); //new create Course instance  of form submission object 
        this.updateCourseForm = new FormSubmit(); //new create Course instance of form submission object
        this.searchAllCourse = new ItemSearch(); //new search Course instance of Item search object object
    };
    CourseModel.prototype = {
        //Model method for creating Course
        CreateCourse: function CreateCourse() {
            var obj = this;
            obj.view.createSuccessAlert.empty(); //Remove success alert elements
            obj.view.createErrorAlert.empty(); //Remove error alert elements
            this.createCourseForm.formObject = this.view.createCourseForm;
            //Method before Ajax request 
            this.createCourseForm.beforeAjaxReq = function () {
                obj.view.createCourseBtn.prop('disabled', true);
            };
            //Method after successful Ajax request 
            this.createCourseForm.successfullAjaxReq = function (response, jqXHR) {
                obj.view.createCourseBtn.prop('disabled', false);
                obj.view.components.success.data = "Course successfully created";
                obj.view.createSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'CourseSuccessAlert' in view
                obj.refreshSearchCourse(); //Reload search request to update the displayed Courses 
                obj.view.createCourseForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.createCourseForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
            this.createCourseForm.ajaxReq();
            console.log(this.view.createCourseForm.attr('action'));
        },
        //Model method for updating Course
        UpdateCourse: function UpdateCourse() {
            var obj = this;
            obj.view.updateSuccessAlert.empty(); //Remove update success alert elements
            obj.view.updateErrorAlert.empty(); //Remove update error alert elements
            this.updateCourseForm.formObject = this.view.updateCourseForm;
            console.log(this.updateCourseForm.formObject.attr('method') + ' ' + this.updateCourseForm.formObject.attr('action'));
            //Method before Ajax request 
            this.updateCourseForm.beforeAjaxReq = function () {
                obj.view.updateCourseBtn.prop('disabled', true); //Disable update button
            };
            //Method after successful Ajax request 
            this.updateCourseForm.successfullAjaxReq = function (response, jqXHR) {
                obj.view.updateCourseBtn.prop('disabled', false); //Enable Course Button
                obj.view.components.success.data = "Course successfully updated";
                obj.view.updateSuccessAlert.append(obj.view.components.success.template()); //Append success message from server to id 'CourseSuccessAlert' in view
                obj.reloadSearchCourse(); //Reload search request to update the displayed Courseulties (without refreshing pagination) 
                obj.view.updateCourseForm[0].reset(); //Reset submit form
                console.log('success' + ' ' + jqXHR + ' ' + response);
            };
            //Method after failed Ajax request
            this.updateCourseForm.failedAjaxReq = function (jqXHR, textStatus, error) {
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
            this.updateCourseForm.ajaxReq();
            console.log(this.view.updateCourseForm.attr('action'));
        },
        //Model for search Course Ajax states
        searchCourse: function searchCourse() {
            this.searchAllCourse.searchObject = this.view.searchCourseForm; //Input element for Course search
            var obj = this; // Assigning the Course Model instance to 'obj' variable
            obj.view.searchCourseError.empty(); //Remove search error alert
            this.searchAllCourse.beforeAjaxReq = function () {
                //Action to be performed before Ajax request
                obj.view.searchCourseBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllCourse.successfullAjaxReq = function (response) {
                //Action to be performed after successfull Ajax request
                obj.view.searchCourseResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchCourseBtn.prop('disabled', false); //Enable search button
                if (response == '') {
                    //if the search result is empty
                    obj.view.searchNextCourse.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchCourseResult.append('<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>');
                } else {
                    obj.view.searchNextCourse.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchCourseResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Course view in 'searchResult' id
                    console.log(response);
                }
            };
            this.searchAllCourse.failedAjaxReq = function () {
                //Action to be performed after failed ajax Request 
                obj.view.searchCourseBtn.prop('disabled', false); //Enable search button
                obj.view.searchCourseError.empty(); //Remove search error alert
                obj.view.searchCourseError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                console.log('fail');
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function nextSearchPaginate() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function prevSearchPaginate() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.prevPaginate(); //Decrease pagination and Perform Ajax request 
        },
        //Model for new search request
        refreshSearchCourse: function refreshSearchCourse() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.searchReq(); //Refresh pagination to zero and Perform Ajax request 
        },
        //Model for new search request (without pagination refresh)
        reloadSearchCourse: function reloadSearchCourse() {
            this.searchCourse(); //load all Ajax asychronous states
            this.searchAllCourse.ajaxReq(); //Perform Ajax request without refreshing pagination  
        },
        //Model for transfer Course data to the modal
        transferCourseData: function transferCourseData(domObject) {
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
    var CourseController = function CourseController() {
        this.view = new CourseView();
        this.model = new CourseModel();
    };
    CourseController.prototype = {
        //Controller for creating new Course
        createCourse: function createCourse() {
            var obj = this;
            this.view.createCourseBtn.click(function (e) {
                e.preventDefault();
                obj.model.CreateCourse();
            });
            return obj;
        },
        //Controller for updating Course
        updateCourse: function updateCourse() {
            var obj = this;
            this.view.updateCourseBtn.click(function (e) {
                e.preventDefault();
                obj.model.UpdateCourse();
            });
            return obj;
        },
        //Controller for loading created Courses to view
        loadCourse: function loadCourse() {
            this.model.refreshSearchCourse();
            return this;
        },
        //Controller for searching for created Courses
        searchCourse: function searchCourse() {
            var obj = this;
            this.view.searchCourseInput.keyup(function (e) {
                e.preventDefault();
                obj.model.refreshSearchCourse();
            });
            this.view.searchCourseBtn.click(function (e) {
                e.preventDefault();
                obj.model.refreshSearchCourse();
            });
            return obj;
        },
        //Controller for refreshing search for created Courses
        refreshSearch: function refreshSearch() {
            var obj = this;
            this.view.reloadSearchCourse.click(function (e) {
                e.preventDefault();
                obj.view.searchCourseForm[0].reset();
                obj.model.refreshSearchCourse();
            });
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function nextSearchPaginate() {
            var obj = this;
            this.view.searchNextCourse.click(function (e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function prevSearchPaginate() {
            var obj = this;
            this.view.searchPrevCourse.click(function (e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Courses to modal  
        transferCourseData: function transferCourseData() {
            var obj = this;
            this.view.searchCourseResult.on('click', '.courseModalAnchor', function (e) {
                e.preventDefault();
                var obj1 = $(this);
                console.log(obj1);
                obj.model.transferCourseData(obj1);
            });
        },
        init: function init() {
            this.createCourse().updateCourse().loadCourse().searchCourse().refreshSearch().nextSearchPaginate().prevSearchPaginate().transferCourseData();
        }
    };
    new CourseController().init();
})();
console.log('righthere');