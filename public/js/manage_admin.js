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


(function(){
  const SidebarView = function () {
	this.sidebar =$('#js-qg-sidebar');
	this.remove_icon =$('#js-qg-sidebar--remove-icon');
	this.burger = $('#js-qg-burger');
	this.link = $('.js-qg-sublink');
	this.toogleClass = 'qg-sidebar--unhide';
	this.link_toogleClass = 'qg-sidebar--sublink--unhide';
	// body...
  };
  const SidebarController = function() {
	this.view = new SidebarView;
	this.toogleClass = this.view.toogleClass;
	this.link_toogleClass = this.view.link_toogleClass;
	this.sidebar = this.view.sidebar;
  };
  SidebarController.prototype.init = function() {
	let toogleClass = this.toogleClass;
	let link_toogleClass = this.link_toogleClass;
	let sidebar = this.sidebar;
	this.view.remove_icon.click(function (e) {
		e.preventDefault();
		classToggle.remove( toogleClass , sidebar);
	});
	this.view.burger.click(function(e){
		e.preventDefault();
		classToggle.add( toogleClass , sidebar);
	});
	this.view.link.click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		target = $(target);
		classToggle.toggle( link_toogleClass , target);
	});
  };
  let sidebar = new SidebarController;
  sidebar.init();
  console.log('happy');
})();
(function() {
    /*Admin View*/
    const AdminView = function() {
            //Create Admin
            this.createAdminForm = $('#createAdmin'); //DOM object for create Admin form
            this.createAdminBtn = $('#createAdminBtn'); //DOM object for create Admin submit button
            this.createSuccessAlert = $('#adminCreateSuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#adminCreateErrorAlert'); //DOM object for error alert

            //Admin create selectors
            this.adminSelectContain = $('#createAdminSelectContain'); //DOM object for admin selector container (create)

            //Search Admin
            this.searchAdminForm = $('#searchAdmin'); //DOM object for search Admin form
            this.searchAdminBtn = $('#searchAdminBtn'); //DOM object for search Admin submit button
            this.searchAdminInput = $('#searchAdminInput'); //DOM object for search Admin input
            this.searchAdminResult = $('#searchResult'); //DOM object for search Admin result
            this.reloadSearchAdmin = $('#reloadAdminBtn'); //DOM object for reloading search Admin result
            this.searchNextAdmin = $('#adminNextSearch'); //DOM object for search Admin pagination button (Next)
            this.searchPrevAdmin = $('#adminPrevSearch'); //DOM object for search Admin pagination button (Previous)
            this.searchAdminError = $('#searchAdminError') //DOM object for displaying serach error

            //Admin update selectors
            this.adminSelectContain_2 = $('#updateAdminSelectContain'); //DOM object for admin selector container (update)
            
            //Update Admin data
            this.updateAdminDataForm = $('#modalAdminUpdate'); //DOM object for update Admin form
            this.updateAdminDataBtn = $('#updateAdminBtn'); //DOM object for update Admin submit button
            this.updateSuccessAlert = $('#adminUpdateSuccessAlert'); //DOM object for update success alert
            this.updateErrorAlert = $('#adminUpdateErrorAlert'); //DOM object for update error alert

            //Update Admin password
            this.updateAdminPassForm = $('#modalAdminPassUpdate'); //DOM object for update Admin password form
            this.updateAdminPassBtn = $('#updateAdminPassBtn'); //DOM object for update Admin password submit button
            this.updatePassSuccessAlert = $('#passUpdateSuccessAlert'); //DOM object for update success alert
            this.updatePassErrorAlert = $('#passUpdateErrorAlert'); //DOM object for update error alert

            //Update Admin Role
            this.updateAdminRoleForm = $('#modalAdminRoleUpdate'); //DOM object for update Admin role form
            this.updateAdminRoleBtn = $('#updateAdminRoleBtn'); //DOM object for update Admin role submit button
            this.updateRoleSuccessAlert = $('#roleUpdateSuccessAlert'); //DOM object for update success alert
            this.updateRoleErrorAlert = $('#roleUpdateErrorAlert'); //DOM object for update error alert

            //Update Admin Avatar
            this.updateAdminAvatForm = $('#modalUpdateAdminAvatar'); //DOM object for update Admin Avatar form
            this.updateAdminAvatBtn = $('#updateAdminAvatarBtn'); //DOM object for update Admin Avatar submit button
            this.updateAvatSuccessAlert = $('#avatarUpdateSuccessAlert'); //DOM object for update success alert
            this.updateAvatErrorAlert = $('#avatarUpdateErrorAlert'); //DOM object for update error alert

            //Update Admin Status
            this.updateAdminStatForm = $('#updateAdminStatus'); //DOM object for update Admin status form
            this.updateAdminStatBtn = $('#updateAdminStatusBtn'); //DOM object for update Admin status submit button
            this.updateStatSuccessAlert = $('#statusUpdateSuccessAlert'); //DOM object for update success alert
            this.updateStatErrorAlert = $('#statusUpdateErrorAlert'); //DOM object for update error alert

            this.AdminModalAnchor = $('.AdminModalAnchor'); //DOM object for Admin anchor button for modal popup
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
                        var error = "";
                        error = `<div class="alert alert-danger">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <strong>Error!!</strong> <p>${this.data.message} </p>${this.data.errors}
</div>`
                        return error;
                    }
                }
            }
            this.selectComponent = {
                success: {
                    data: "",
                    template: function() {
                        var html = "";
                        for (var datum of this.data) { //loop through the recieved data's object
                            html += `<option value= "${datum.id}">${datum.name}</option>`
                        }
                        return html;
                    }
                }
            }
            this.searchComponents = {
                success: {
                    data: "", //Received data from Ajax request
                    template: function() {
                        var html = '';
                        for (var datum of this.data) { //loop through the recieved data's object
                            html += `<div class="qg-card--content qg-flex qg-flex--wrap font-secondary " style="border-color: #f3f3f3">
    <div class="qg-col--xs--2 qg-col--md--1 qg-animate--card-content AdminDURL" data-url="${appData.hostname}/admin/deactivate/${datum.id}">
        <img class="qg-img--small AdminAvatarURL" style="margin-top: 10px" data-url="${appData.hostname}/admin/update-avatar/${datum.id}" src="${datum.avatar}">
    </div>
    <div class="qg-col--xs--6 qg-col--md--7 qg-animate--card-content AdminRoleURL" data-url="${appData.hostname}/admin/update-role/${datum.id}">
        <div class="font-primary js-modal-name AdminData" data-url="${appData.hostname}/admin/update/${datum.id}" style="padding: 10px">
            <span class="AdminFirstname">${datum.firstname}</span>&nbsp;<span class="AdminSurname">${datum.surname}</span>
        </div>
        <div class="font-secondary AdminPassURL" style="padding: 10px" data-url="${appData.hostname}/admin/update-pass/${datum.id}">
            <b>${datum.role}</b> / <span class="f-green js-modal-email AdminEmail">${datum.email}</span> / ${datum.faculty_id == null ? 'No Faculty' : datum.faculty.name } /${datum.department_id == null ? 'No Department' : datum.departments.name } / ${datum.course_id == null ? 'No Course' : datum.courses.course_code }
        </div>
    </div>
    <div class="qg-col--xs--10 qg-col--md--2 qg-flex">
        <a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center AdminModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
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
        /*Admin Model*/
    const AdminModel = function() {
        this.view = new AdminView();
        /*Create Admin Form*/
        this.createAdminForm = new FormSubmit(); //new create Admin instance  of form submission object
        this.updateAdminData = new FormSubmit(); //new create Admin instance of form submission object
        this.updateAdminAvatar = new FormSubmit(); //new create Admin instance of form submission object
        this.updateAdminRole = new FormSubmit(); //new create Admin instance of form submission object
        this.updateAdminPass = new FormSubmit();
        this.updateAdminStat = new FormSubmit();
        this.searchAllAdmin = new ItemSearch(); //new search Admin instance of Item search object object
        this.levelSelector = new ButtonRequest(); //new instance of  ButttonRequest object
    }
    AdminModel.prototype = {
        //Model method button ajax request
        ButtonRequest: function(obj, targetObj = [], alertObj, action) {
            var mainObject = this;
            if (obj.attr('data-state') == '1') { //if the value of the data-state attribute of the button is 1 (active)
                this.levelSelector.action = action; //url for button request
                this.levelSelector.method = 'GET'; //url for button request
                this.levelSelector.beforeAjaxReq = function() {
                    alertObj.html('<i style="color:green;font-size:10px">loading.....</i>'); //alert message during ajax request
                }
                this.levelSelector.successfullAjaxReq = function(response) {
                    alertObj.empty(); //remove alert message after succefull ajax request
                    obj.attr('data-state', '0'); //convert the state of the button to zero
                    console.log(targetObj + ' ' + typeof targetObj)
                    if (typeof targetObj === 'object') {
                        for (data of targetObj) {
                            data.attr('data-state', '1'); //convert the state of the target buttons to 1 (active)
                        }
                    }
                    obj.empty(); //remove all child elemnts of the button
                    mainObject.view.selectComponent.success.data = response; //assigning ajax response to template object for processing
                    obj.html(mainObject.view.selectComponent.success.template()) //parsing the processed response to HTML
                }
                this.levelSelector.failedAjaxReq = function() {
                    obj.attr('data-state', '1'); //convert the state of the button to zero
                    if (typeof targetObj === 'array') {
                        for (data of targetObj) {
                            data.attr('data-state', '0'); //convert the state of the target buttons to 0 (inactive)
                        }
                    }
                    alertObj.html('<i style="color:red;font-size:10px">Request failed. Please try again</i>'); //alert message during ajax request
                }
                this.levelSelector.ajaxReq();
            }
            if (typeof targetObj === 'object') {
                for (data of targetObj) {
                    data.empty(); //remove all child elements of the target button
                    data.attr('data-state', '1'); //convert the state of the target buttons to 1 (active)
                }
            }
            /* body... */
        },
        //Dropdown Selectbox for faculty (Admin Create)
        AdminFacSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/faculty';
            this.ButtonRequest($('#adminFaculty'), [$('#adminDepartment'), $('#adminCourse')], $('#createFacultyAlert'), url);
        },
        //Dropdown Selectbox for department (Admin Create)
        AdminDeptSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/department?sid=' + $('#adminFaculty').val();
            console.log('good');
            this.ButtonRequest($('#adminDepartment'), [$('#adminCourse')], $('#createDepartmentAlert'), url);
        },
        //Dropdown Selectbox for course (Admin Create)
        AdminCourseSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/course?sid=' + $('#adminDepartment').val();
            console.log('day');
            this.ButtonRequest($('#adminCourse'), [], $('#createCourseAlert'), url);
        },
        //Dropdown Selectbox for faculty (Admin Update)
        AdminFacUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/faculty';
            this.ButtonRequest($('#adminFacultyUpdate'), [$('#adminDepartmentUpdate'), $('#adminCourseUpdate')], $('#updateFacultyAlert'), url);
        },
        //Dropdown Selectbox for department (Admin Update)
        AdminDeptUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/department?sid=' + $('#adminFacultyUpdate').val()
            this.ButtonRequest($('#adminDepartmentUpdate'), [$('#adminCourseUpdate')], $('#updateDepartmentAlert'), url);
        },
        //Dropdown Selectbox for courses (Admin Update)
        AdminCourseUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/course?sid=' + $('#adminDepartmentUpdate').val();
            this.ButtonRequest($('#adminCourseUpdate'), [], $('#updateCourseAlert'), url);
        },
        //Model method for updating Admin
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
                                for (var responseError of Object.keys(responseErrors.errors)) {
                                    for (var i = responseErrors.errors[responseError].length - 1; i >= 0; i--) {
                                        obj.component.error.data.errors += "<br> - " + responseErrors.errors[responseError][i];
                                    }
                                }
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
        CreateAdmin: function () {
            /* body... */
            var obj = this
            this.view.components.success.data = "Admin successfully created"
            this.submitModule.errorAlert = this.view.createErrorAlert;
            this.submitModule.successAlert = this.view.createSuccessAlert;
            this.submitModule.formModule = this.createAdminForm;
            this.submitModule.formElement = this.view.createAdminForm;
            this.submitModule.submitButton = this.view.createAdminBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.refreshSearchAdmin() };
            this.submitModule.init();
        },
        UpdateAdminData:function () {
            /* body... */
            var obj = this
            this.view.components.success.data = "Admin data successfully updated"
            this.submitModule.errorAlert = this.view.updateErrorAlert;
            this.submitModule.successAlert = this.view.updateSuccessAlert;
            this.submitModule.formModule = this.updateAdminData;
            this.submitModule.formElement = this.view.updateAdminDataForm;
            this.submitModule.submitButton = this.view.updateAdminDataBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchAdmin() } 
            this.submitModule.init();
        },
        UpdateAdminAvatar:function () {
            var obj = this
            this.view.components.success.data = "Admin avatar successfully updated"
            this.submitModule.errorAlert = this.view.updateAvatErrorAlert;
            this.submitModule.successAlert = this.view.updateAvatSuccessAlert;
            this.submitModule.formModule = this.updateAdminAvatar;
            this.submitModule.formElement = this.view.updateAdminAvatForm;
            this.submitModule.submitButton = this.view.updateAdminAvatBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchAdmin() } 
            this.submitModule.init();
        },
        UpdateAdminRole:function () {
            //Update Admin Role
            var obj = this
            this.view.components.success.data = "Admin role successfully updated"
            this.submitModule.errorAlert = this.view.updateRoleErrorAlert;
            this.submitModule.successAlert = this.view.updateRoleSuccessAlert;
            this.submitModule.formModule = this.updateAdminRole;
            this.submitModule.formElement = this.view.updateAdminRoleForm;
            this.submitModule.submitButton = this.view.updateAdminRoleBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchAdmin() } 
            this.submitModule.init();
        },
        UpdateAdminPass:function () {
            //Update Admin password
            var obj = this
            this.view.components.success.data = "Admin password successfully changed"
            this.submitModule.errorAlert = this.view.updatePassErrorAlert;
            this.submitModule.successAlert = this.view.updatePassSuccessAlert;
            this.submitModule.formModule = this.updateAdminPass;
            this.submitModule.formElement = this.view.updateAdminPassForm;
            this.submitModule.submitButton = this.view.updateAdminPassBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchAdmin() } 
            this.submitModule.init();
        },
        UpdateAdminStat:function () {
                        this.updateAdminStatForm = $('#updateAdminStatus'); //DOM object for update Admin status form
            this.updateAdminStatBtn = $('#updateAdminStatusBtn'); //DOM object for update Admin status submit button
            this.updateStatSuccessAlert = $('#statusUpdateSuccessAlert'); //DOM object for update success alert
            this.updateStatErrorAlert = $('#statusUpdateErrorAlert'); //DOM object for update error alert
            //Update Admin Role
            var obj = this
            this.view.components.success.data = "Admin successfully deactivated"
            this.submitModule.errorAlert = this.view.updateStatErrorAlert ;
            this.submitModule.successAlert = this.view.updateStatSuccessAlert;
            this.submitModule.formModule = this.updateAdminStat;
            this.submitModule.formElement = this.view.updateAdminStatForm;
            this.submitModule.submitButton = this.view.updateAdminStatBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchAdmin() } 
            this.submitModule.init();
        },
        //Model for search Admin Ajax states
        searchAdmin: function() {
            this.searchAllAdmin.searchObject = this.view.searchAdminForm; //Input element for Admin search
            var obj = this; // Assigning the Admin Model instance to 'obj' variable
            obj.view.searchAdminError.empty(); //Remove search error alert
            this.searchAllAdmin.beforeAjaxReq = function() { //Action to be performed before Ajax request
                obj.view.searchAdminBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllAdmin.successfullAjaxReq = function(response) { //Action to be performed after successfull Ajax request
                obj.view.searchAdminResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchAdminBtn.prop('disabled', false); //Enable search button
                if (response == '') { //if the search result is empty
                    obj.view.searchNextAdmin.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchAdminResult.append(`<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>`);
                } else {
                    obj.view.searchNextAdmin.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchAdminResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Admin view in 'searchResult' id
                    console.log(response);
                }
            };
            this.searchAllAdmin.failedAjaxReq = function() { //Action to be performed after failed ajax Request
                obj.view.searchAdminBtn.prop('disabled', false); //Enable search button
                obj.view.searchAdminError.empty(); //Remove search error alert
                obj.view.searchAdminError.append(obj.view.searchComponents.error.template); //Display error alert on failed serach
                console.log('fail');
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function() {
            this.searchAdmin(); //load all Ajax asychronous states
            this.searchAllAdmin.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function() {
            this.searchAdmin(); //load all Ajax asychronous states
            this.searchAllAdmin.prevPaginate(); //Decrease pagination and Perform Ajax request
        },
        //Model for new search request
        refreshSearchAdmin: function() {
            this.searchAdmin(); //load all Ajax asychronous states
            this.searchAllAdmin.searchReq(); //Refresh pagination to zero and Perform Ajax request
        },
        //Model for new search request (without pagination refresh)
        reloadSearchAdmin: function() {
            this.searchAdmin(); //load all Ajax asychronous states
            this.searchAllAdmin.ajaxReq(); //Perform Ajax request without refreshing pagination
        },
        //Model for transfer Admin data to the modal
        transferAdminData: function(domObject) {
            /* body... */
            console.log(domObject);
            ModalDataTransfer.domObject = domObject;
            ModalDataTransfer.headerData = {
                '#modalAdminFirstname': $('.AdminFirstname'),
                '#modalAdminSurname': $('.AdminSurname'),
            }; //Data to be transfered to the modal's header
            ModalDataTransfer.formActionData = {
                '#modalAdminUpdate': $('.AdminData'),
                '#modalUpdateAdminAvatar': $('.AdminAvatarURL'),
                '#updateAdminStatus': $('.AdminDURL'),
                '#modalAdminRoleUpdate': $('.AdminRoleURL'),
                '#modalAdminPassUpdate': $('.AdminPassURL')
            }; //Data to be transfered to the action attribute of the modal's form
            ModalDataTransfer.inputData = {
                '#qg-update-firstname': $('.AdminFirstname'),
                '#qg-update-surname': $('.AdminSurname'),
                '#qg-update-email': $('.AdminEmail'),
            }; //Data to be transfered to the input's value of the modal's form
            ModalDataTransfer.init(); //perform the transfer
        }
    };
    /*Admin Controller*/
    const AdminController = function() {
        this.view = new AdminView();
        this.model = new AdminModel();
    }
    AdminController.prototype = {
        //Controller for fetching faculty to create Admin
        adminFacSelect: function() {
            var obj = this;
            obj.view.adminSelectContain.on('click', '#adminFaculty', function(e) {
                obj.model.AdminFacSelect();
            })
            return obj;
        },
        //Controller for fetching department to create Admin
        adminDeptSelect: function() {
            var obj = this;
            obj.view.adminSelectContain.on('click', '#adminDepartment', function(e) {
                obj.model.AdminDeptSelect();
            })
            return obj;
        },
        //Controller for fetching course to create Admin
        adminCourseSelect: function() {
            var obj = this;
            obj.view.adminSelectContain.on('click', '#adminCourse', function(e) {
                obj.model.AdminCourseSelect();
            })
            return obj;
        },
        //Controller for fetching faculty to update Admin
        adminFacUpdateSelect: function() {
            var obj = this;
            obj.view.adminSelectContain_2.on('click', '#adminFacultyUpdate', function(e) {
                obj.model.AdminFacUpdateSelect();
            })
            return obj;
        },
        //Controller for fetching department to update Admin
        adminDeptUpdateSelect: function() {
            var obj = this;
            obj.view.adminSelectContain_2.on('click', '#adminDepartmentUpdate', function(e) {
                obj.model.AdminDeptUpdateSelect();
            })
            return obj;
        },
        //Controller for fetching course to update Admin
        adminCourseUpdateSelect: function() {
            var obj = this;
            obj.view.adminSelectContain_2.on('click', '#adminCourseUpdate', function(e) {
                obj.model.AdminCourseUpdateSelect();
            })
            return obj;
        },
        //Controller for creating new Admin
        createAdmin: function() {
            var obj = this;
            this.view.createAdminBtn.click(function(e) {
                e.preventDefault();
                obj.model.CreateAdmin();
            })
            return obj;
        },
        //Controller for updating Admin data
        updateAdmin: function() {
            var obj = this;
            this.view.updateAdminDataBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateAdminData();
            })
            return obj;
        },
        //Controller for updating Admin avatar
        updateAdminAvatar: function() {
            var obj = this;
            this.view.updateAdminAvatBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateAdminAvatar();
            })
            return obj;
        },
        //Controller for updating Admin role
        updateAdminRole: function() {
            var obj = this;
            this.view.updateAdminRoleBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateAdminRole();
            })
            return obj;
        },
        //Controller for updating Admin password
        updateAdminPass: function() {
            var obj = this;
            this.view.updateAdminPassBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateAdminPass();
            })
            return obj;
        },
        //Controller for updating Admin status
        updateAdminStat: function() {
            var obj = this;
            this.view.updateAdminStatBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateAdminStat();
            })
            return obj;
        },
        //Controller for loading created Admins to view
        loadAdmin: function() {
            this.model.refreshSearchAdmin()
            return this;
        },
        //Controller for searching for created Admins
        searchAdmin: function() {
            var obj = this;
            this.view.searchAdminInput.keyup(function(e) {
                e.preventDefault();
                obj.model.refreshSearchAdmin()
            });
            this.view.searchAdminBtn.click(function(e) {
                e.preventDefault();
                obj.model.refreshSearchAdmin()
            })
            return obj;
        },
        //Controller for refreshing search for created Admins
        refreshSearch: function() {
            var obj = this;
            this.view.reloadSearchAdmin.click(function(e) {
                e.preventDefault();
                obj.view.searchAdminForm[0].reset();
                obj.model.refreshSearchAdmin()
            })
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function() {
            var obj = this;
            this.view.searchNextAdmin.click(function(e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function() {
            var obj = this;
            this.view.searchPrevAdmin.click(function(e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Admins to modal
        transferAdminData: function() {
            var obj = this;
            this.view.searchAdminResult.on('click', '.AdminModalAnchor', function(e) {
                e.preventDefault();
                var obj1 = $(this);
                console.log(obj1);
                obj.model.transferAdminData(obj1);
            })
        },
        init: function() {
            this.adminFacSelect()
                .adminDeptSelect()
                .adminCourseSelect()
                .adminFacUpdateSelect()
                .adminDeptUpdateSelect()
                .adminCourseUpdateSelect()
                .createAdmin()
                .updateAdmin()
                .updateAdminAvatar()
                .updateAdminRole()
                .updateAdminPass()
                .updateAdminStat()
                .loadAdmin()
                .searchAdmin()
                .refreshSearch()
                .nextSearchPaginate()
                .prevSearchPaginate()
                .transferAdminData()
        }
    }
    new AdminController().init();
})();
console.log('righthere');