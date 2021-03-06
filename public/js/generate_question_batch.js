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
    /*Question View*/
    const QuestionView = function() {
            //Create Question Batch
            this.createQuestionForm = $('#createQuestionBatch'); //DOM object for create Question Batch form
            this.createQuestionBtn = $('#createQuestionBatchBtn'); //DOM object for create Question Batch submit button
            this.createSuccessAlert = $('#questionCreateSuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#questionCreateErrorAlert'); //DOM object for error alert

            //Question class structure selectors (for create questions)
            this.questionFaculty = $('#QuestionFaculty');
            this.questionDepartment = $('#QuestionDepartment'); 
            this.questionCourse = $('#QuestionCourse');
            this.selectFacultyAlert = $('#selectFacultyAlert');
            this.selectDepartmentAlert = $('#selectDepartmentAlert');
            this.selectCourseAlert = $('#selectCourseAlert') ;

            this.deleteErrorAlert = $('#deleteQuestionError');
            this.deleteSuccessAlert = $('#deleteQuestionSuccess');
            this.deleteQuestionForm = $('#modalDeleteQuestPaper');
            this.deleteQuestionBtn = $('#deleteQuestionBatchBtn');

            //Search Question
            this.searchQuestionForm = $('#searchQuestionPaper'); //DOM object for search Question form
            this.searchQuestionBtn = $('#searchQuestionPaperBtn'); //DOM object for search Question submit button
            this.searchQuestionInput = $('#searchQuestionPaperInput'); //DOM object for search Question input
            this.searchQuestionResult = $('#searchResult'); //DOM object for search Question result
            this.reloadSearchQuestion = $('#reloadQuestionBtn'); //DOM object for reloading search Question result
            this.searchNextQuestion = $('#QuestionNextSearch'); //DOM object for search Question pagination button (Next)
            this.searchPrevQuestion = $('#QuestionPrevSearch'); //DOM object for search Question pagination button (Previous)
            this.searchQuestionError = $('#searchQuestionError') //DOM object for displaying serach error

            this.QuestionModalAnchor = $('.QuestionModalAnchor'); //DOM object for Question anchor button for modal popup
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
                            html += `<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
					<div class="qg-col--xs--7 qg-animate--card-content">
						<div class="font-primary printQuestPaper" data-url="${appData.hostname}/generate-question-batch/download/${datum.unique_id}" style="padding: 10px" >
							${datum.courses.name} ( ${datum.courses.course_code} )
						</div>
						<div class="font-primary" style="padding: 10px">
							Question-paper id - ${datum.unique_id} 
						</div>
						<div class="font-secondary deleteQuestPaper" data-url="${appData.hostname}/generate-question-batch/${datum.unique_id}" style="padding: 10px">
							${datum.faculty.name} / ${datum.departments.name} / <span class="f-green">${datum.question_type}</span> / ${datum.department_level}level / ${datum.academic_session} session
						</div>
					</div>
					<div class="qg-col--xs--3 qg-flex">
						<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center QuestionModalAnchor" title="settings" style="font-size:17px"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>
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
        /*Question Model*/
    const QuestionModel = function() {
        this.view = new QuestionView();
        /*Create Question Form*/
        this.formObject = new FormSubmit(); //new create Question instance  of form submission object
        this.searchAllQuestion = new ItemSearch(); //new search Question instance of Item search object object
        this.levelSelector = new ButtonRequest(); //new instance of  ButttonRequest object
    }
    QuestionModel.prototype = {
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
        //Dropdown Selectbox for faculty (Question Create)
        QuestionFacSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/faculty';
            this.ButtonRequest(this.view.questionFaculty, [this.view.questionDepartment, this.view.questionCourse], this.view.selectFacultyAlert, url);
        },
        //Dropdown Selectbox for department (Question Create)
        QuestionDeptSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/department?sid=' + this.view.questionFaculty.val();
            this.ButtonRequest(this.view.questionDepartment, [this.view.questionCourse], this.view.selectDepartmentAlert, url);
        },
        //Dropdown Selectbox for course (Question Create)
        QuestionCourseSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/course?sid=' + this.view.questionDepartment.val();
            this.ButtonRequest(this.view.questionCourse, [], this.view.selectCourseAlert, url);
        },
        //Dropdown Selectbox for faculty (Question Update)
        QuestionFacUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/faculty';
            this.ButtonRequest(this.view.questionFacultyUpdate, [this.view.questionDepartmentUpdate, this.view.questionCourseUpdate], this.view.updateFacultyAlert, url);
        },
        //Dropdown Selectbox for department (Question Update)
        QuestionDeptUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/department?sid=' + this.view.questionFacultyUpdate.val()
            this.ButtonRequest(this.view.questionDepartmentUpdate, [this.view.questionCourseUpdate], this.view.updateDepartmentAlert, url);
        },
        //Dropdown Selectbox for courses (Question Update)
        QuestionCourseUpdateSelect: function() {
            var obj = this;
            var url = appData.hostname + '/fetch/course?sid=' + this.view.questionDepartmentUpdate.val();
            this.ButtonRequest(this.view.questionCourseUpdate, [], this.view.updateCourseAlert, url);
        },
        //Model method for updating Question
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
                            obj.successAlert.append(obj.component.success.template()); //Append success message from server to id 'QuestionSuccessAlert' in view
                            obj.refreshSearch() //Reload search request to update the displayed Questions
                            obj.formElement[0].reset(); //Reset submit form
                        };
                        //Method after failed Ajax request
                        this.formModule.failedAjaxReq = function(jqXHR, textStatus, error) {
                            var responseErrors;
                            obj.submitButton.prop('disabled', false); //Enable submit button for create Question form
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
        CreateQuestion: function () {
            /* Model to create new question */
            var obj = this
            this.view.components.success.data = "Question paper successfully created"
            this.submitModule.errorAlert = this.view.createErrorAlert;
            this.submitModule.successAlert = this.view.createSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.createQuestionForm;
            this.submitModule.submitButton = this.view.createQuestionBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.refreshSearchQuestion() }; //
            this.submitModule.init();
        },
        DeleteQuestion: function () {
            /* Model to create new question */
            var obj = this
            this.view.components.success.data = "Question paper successfully deleted"
            this.submitModule.errorAlert = this.view.deleteErrorAlert;
            this.submitModule.successAlert = this.view.deleteSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.deleteQuestionForm;
            this.submitModule.submitButton = this.view.deleteQuestionBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.refreshSearchQuestion() }; //
            this.submitModule.init();
        },
        //Model for search Question Ajax states
        searchQuestion: function() {
        	console.log('hello')
            this.searchAllQuestion.searchObject = this.view.searchQuestionForm; //Input element for Question search
            var obj = this; // Assigning the Question Model instance to 'obj' variable
            obj.view.searchQuestionError.empty(); //Remove search error alert
            this.searchAllQuestion.beforeAjaxReq = function() { //Action to be performed before Ajax request
                obj.view.searchQuestionBtn.prop('disabled', true); //Disable search button
            };
            this.searchAllQuestion.successfullAjaxReq = function(response) { //Action to be performed after successfull Ajax request
                obj.view.searchQuestionResult.empty(); //Removing all child elements of 'serachResult' id after Ajax request
                obj.view.searchQuestionBtn.prop('disabled', false); //Enable search button
                if (response == '') { //if the search result is empty
                    obj.view.searchNextQuestion.prop('disabled', true); //Disable Next Search Button
                    obj.view.searchQuestionResult.append(`<div class="qg-col--xs--10" style="padding:10px; text-align:center"><b>No result returned !!</b></div>`);
                } else {
                    obj.view.searchNextQuestion.prop('disabled', false); //Enable Next Search Button
                    obj.view.searchComponents.success.data = response; // Assign recieved data to search component
                    obj.view.searchQuestionResult.append(obj.view.searchComponents.success.template()); //Append search component's template to Question view in 'searchResult' id
                }
            };
            this.searchAllQuestion.failedAjaxReq = function() { //Action to be performed after failed ajax Request
                obj.view.searchQuestionBtn.prop('disabled', false); //Enable search button
                obj.view.searchQuestionError.empty(); //Remove search error alert
                obj.view.searchQuestionError.append(obj.view.searchComponents.error.template); //Display error alert on failed search
            };
        },
        //Model for next pagination button
        nextSearchPaginate: function() {
            this.searchQuestion(); //load all Ajax asychronous states
            this.searchAllQuestion.nextPaginate(); //increase pagination and Perform Ajax request
        },
        //Model for previous pagination button
        prevSearchPaginate: function() {
            this.searchQuestion(); //load all Ajax asychronous states
            this.searchAllQuestion.prevPaginate(); //Decrease pagination and Perform Ajax request
        },
        //Model for new search request
        refreshSearchQuestion: function() {
            this.searchQuestion(); //load all Ajax asychronous states
            this.searchAllQuestion.searchReq(); //Refresh pagination to zero and Perform Ajax request
        },
        //Model for new search request (without pagination refresh)
        reloadSearchQuestion: function() {
            this.searchQuestion(); //load all Ajax asychronous states
            this.searchAllQuestion.ajaxReq(); //Perform Ajax request without refreshing pagination
        },
        //Model for transfer Question data to the modal
        transferQuestionData: function(domObject) {
            /* body... */
            var obj = this;
            ModalDataTransfer.domObject = domObject;
            ModalDataTransfer.headerData = ''; //Data to be transfered to the modal's header
            ModalDataTransfer.formActionData = { //Data to be transfered to the action attribute of the modal's form
                '#modalDeleteQuestPaper': $('.deleteQuestPaper'),
                '#modalPrintQuestPaper': $('.printQuestPaper')
            }; 
            ModalDataTransfer.init(); //perform the transfer
        }
    };
    /*Question Controller*/
    const QuestionController = function() {
        this.view = new QuestionView();
        this.model = new QuestionModel();
    }
    QuestionController.prototype = {
        //Controller for fetching faculty to create Question
        QuestionFacSelect: function() {
            var obj = this;
            obj.view.questionFaculty.click(function(e) {
                obj.model.QuestionFacSelect();
            })
            return obj;
        },
        //Controller for fetching department to create Question
        QuestionDeptSelect: function() {
            var obj = this;
            obj.view.questionDepartment.click(function(e) {
                obj.model.QuestionDeptSelect();
            })
            return obj;
        },
        //Controller for fetching course to create Question
        QuestionCourseSelect: function() {
            var obj = this;
            obj.view.questionCourse.click(function(e) {
                obj.model.QuestionCourseSelect();
            })
            return obj;
        },
        //Controller for creating new Question
        createQuestion: function() {
            var obj = this;
            this.view.createQuestionBtn.click(function(e) {
                e.preventDefault();
                obj.model.CreateQuestion();
            })
            return obj;
        },
        //Controller for loading created Questions to view
        loadQuestion: function() {
            this.model.refreshSearchQuestion()
            return this;
        },
        //Controller for searching for created Questions
        searchQuestion: function() {
            var obj = this;
            this.view.searchQuestionInput.keyup(function(e) {
                e.preventDefault();
                obj.model.refreshSearchQuestion()
            });
            this.view.searchQuestionBtn.click(function(e) {
                e.preventDefault();
                obj.model.refreshSearchQuestion()
            })
            return obj;
        },
        //Controller for refreshing search for created Questions
        refreshSearch: function() {
            var obj = this;
            this.view.reloadSearchQuestion.click(function(e) {
                e.preventDefault();
                obj.view.searchQuestionForm[0].reset();
                obj.model.refreshSearchQuestion()
            })
            return obj;
        },
        //Controller to paginate search (next)
        nextSearchPaginate: function() {
            var obj = this;
            this.view.searchNextQuestion.click(function(e) {
                e.preventDefault();
                obj.model.nextSearchPaginate();
            });
            return obj;
        },
        //Controller to paginate search (previous)
        prevSearchPaginate: function() {
            var obj = this;
            this.view.searchPrevQuestion.click(function(e) {
                e.preventDefault();
                obj.model.prevSearchPaginate();
            });
            return obj;
        },
        //Controller to tranfer data from downloaded Questions to modal
        transferQuestionData: function() {
            var obj = this;
            this.view.searchQuestionResult.on('click', '.QuestionModalAnchor', function(e) {
                e.preventDefault();
                var obj1 = $(this);
                obj.model.transferQuestionData(obj1);
            })
            return obj;
        },
        deleteQuestionPaper: function () {
        	var obj = this;
            this.view.deleteQuestionBtn.click(function(e) {
                e.preventDefault();
                var obj1 = $(this);
                obj.model.DeleteQuestion();
            })
            return obj;
        },
        init: function() {
            this.QuestionFacSelect()
                .QuestionDeptSelect()
                .QuestionCourseSelect()
                .createQuestion()
                .searchQuestion()
                .refreshSearch()
                .nextSearchPaginate()
                .prevSearchPaginate()
                .loadQuestion()
                .transferQuestionData()
                .deleteQuestionPaper()
                /*
                .searchQuestion()
                .refreshSearch()
                .nextSearchPaginate()
                .prevSearchPaginate()
                .updateQuestion()
                .updateQuestionClass()
                .updateQuestionIllust()
                .updateQuestionType()
                .removeParentElement();
                */
        }
    }
    new QuestionController().init();
})();
