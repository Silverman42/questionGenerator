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
