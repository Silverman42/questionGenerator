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
           
            //Search Admin
            this.searchAdminForm = $('#searchAdmin'); //DOM object for search Admin form
            this.searchAdminBtn = $('#searchAdminBtn'); //DOM object for search Admin submit button
            this.searchAdminInput = $('#searchAdminInput'); //DOM object for search Admin input
            this.searchAdminResult = $('#searchResult'); //DOM object for search Admin result
            this.reloadSearchAdmin = $('#reloadAdminBtn'); //DOM object for reloading search Admin result
            this.searchNextAdmin = $('#adminNextSearch'); //DOM object for search Admin pagination button (Next)
            this.searchPrevAdmin = $('#adminPrevSearch'); //DOM object for search Admin pagination button (Previous)
            this.searchAdminError = $('#searchAdminError') //DOM object for displaying serach error

            this.searchComponents = {
                success: {
                    data: "", //Received data from Ajax request
                    template: function() {
                        var html = '';
                        for (var datum of this.data) { //loop through the recieved data's object
                            html += `<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
    <div class="qg-col--xs--1 qg-animate--card-content AdminDURL">
        <img class="qg-img--small AdminAvatarURL" src="${datum.avatar}">
    </div>
    <div class="qg-col--xs--7 qg-animate--card-content AdminRoleURL">
        <div class="font-primary js-modal-name AdminData" style="padding: 10px">
            <span class="AdminFirstname">${datum.firstname}</span>&nbsp;<span class="AdminSurname">${datum.surname}</span>
        </div>
        <div class="font-secondary AdminPassURL" style="padding: 10px">
            <b>${datum.role}</b> / <span class="f-green js-modal-email AdminEmail">${datum.email}</span> / ${datum.faculty_id == null ? 'No Faculty' : datum.faculty.name } /${datum.department_id == null ? 'No Department' : datum.departments.name } / ${datum.course_id == null ? 'No Course' : datum.courses.course_code }
        </div>
    </div>
    <div class="qg-col--xs--2 qg-flex">
        <a href="${appData.hostname}/admin/activate/${datum.id}" data-toggle="modal" data-name="${datum.firstname} ${datum.surname}" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center AdminActivateBtn" title="Activate Admin" style="font-size:17px"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
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
        this.activateAdminForm = new ButtonRequest(); //new create Admin instance  of form submission object
        this.searchAllAdmin = new ItemSearch(); //new search Admin instance of Item search object object
    }
    AdminModel.prototype = {
        //Model method for updating Admin
        submitModule: (function() {
            var obj;
            var submitButton = {
                    buttonModule: "",
                    buttonAction: "",
                    buttonData: "",
                    submitButton: "",
                    reloadSearch: "",
                    init: function() {
                        obj = this ;
                        this.buttonModule.action = this.buttonAction;
                        this.buttonModule.method = 'POST';
                        this.buttonModule.data = this.buttonData;
                        //Method before Ajax request
                        //Method after successful Ajax request
                        this.buttonModule.beforeAjaxReq = function() {
                        };
                        this.buttonModule.successfullAjaxReq = function(response, jqXHR) {
                            obj.reloadSearch() //Reload search request to update the displayed Admins
                        };
                        //Method after failed Ajax request
                        this.buttonModule.failedAjaxReq = function(jqXHR, textStatus, error) {
                         	alert('Administration activation failed, please try again')
                            console.log(error);
                        };
                        this.buttonModule.ajaxReq();
                    }
                }
                return submitButton;
        }()),
        ActivateAdmin: function (elementObj) {
            /* body... */
            var obj = this
            this.submitModule.buttonModule = this.activateAdminForm;
            this.submitModule.buttonAction = elementObj.attr('href');
            this.submitModule.buttonData = '_method=put';
            this.submitModule.submitButton = this.view.activateAdminBtn;
            this.submitModule.reloadSearch = function () {
            	var adminName = elementObj.data('name')
				alert(adminName+" has been successfully reactivated"); 
				obj.reloadSearchAdmin(); 				
			};
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
        }
    };
    /*Admin Controller*/
    const AdminController = function() {
        this.view = new AdminView();
        this.model = new AdminModel();
    }
    AdminController.prototype = {
        //Controller for creating new Admin
        activateAdmin: function() {
            var obj = this;
            this.view.searchAdminResult.on('click','.AdminActivateBtn',function(e) {
                e.preventDefault();
                var elementObj = $(this);
                obj.model.ActivateAdmin(elementObj);
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
        init: function() {
            this.activateAdmin()
                .loadAdmin()
                .searchAdmin()
                .refreshSearch()
                .nextSearchPaginate()
                .prevSearchPaginate()
        }
    }
    new AdminController().init();
})();