(function() {
    /*Question View*/
    const QuestionView = function() {
            //Create Question
            this.createQuestionForm = $('#createQuestion'); //DOM object for create Question form
            this.createQuestionBtn = $('#createQuestionBtn'); //DOM object for create Question submit button
            this.createSuccessAlert = $('#questionCreateSuccessAlert'); //DOM object for success alert
            this.createErrorAlert = $('#questionCreateErrorAlert'); //DOM object for error alert

            //Question class structure selectors (for create questions)
            this.questionFaculty = $('#QuestionFaculty');
            this.questionDepartment = $('#QuestionDepartment'); 
            this.questionCourse = $('#QuestionCourse');
            this.selectFacultyAlert = $('#selectFacultyAlert');
            this.selectDepartmentAlert = $('#selectDepartmentAlert');
            this.selectCourseAlert = $('#selectCourseAlert') ;

            //Question class structure selectors (for update questions)
            this.questionFacultyUpdate = $('#QuestionFacultyUpdate')
            this.questionDepartmentUpdate = $('#QuestionDepartmentUpdate')
            this.questionCourseUpdate = $('#QuestionCourseUpdate')
            this.updateFacultyAlert = $('#updateFacultyAlert')
            this.updateDepartmentAlert = $('#updateDepartmentAlert')
            this.updateCourseAlert = $('#updateCourseAlert')

            //Search Question
            this.searchQuestionForm = $('#searchQuestion'); //DOM object for search Question form
            this.searchQuestionBtn = $('#searchQuestionBtn'); //DOM object for search Question submit button
            this.searchQuestionInput = $('#searchQuestionInput'); //DOM object for search Question input
            this.searchQuestionResult = $('#searchResult'); //DOM object for search Question result
            this.reloadSearchQuestion = $('#reloadQuestionBtn'); //DOM object for reloading search Question result
            this.searchNextQuestion = $('#QuestionNextSearch'); //DOM object for search Question pagination button (Next)
            this.searchPrevQuestion = $('#QuestionPrevSearch'); //DOM object for search Question pagination button (Previous)
            this.searchQuestionError = $('#searchQuestionError') //DOM object for displaying serach error

            //Update Question data
            this.updateQuestionDataForm = $('#updateQuestion'); //DOM object for update Question form
            this.updateQuestionDataBtn = $('#updateQuestionBtn'); //DOM object for update Question submit button
            this.updateSuccessAlert = $('#questionUpdateSuccessAlert'); //DOM object for update success alert
            this.updateErrorAlert = $('#questionUpdateErrorAlert'); //DOM object for update error alert

            //Update Question type
            this.updateQuestionType= $('#updateQuestionType'); //DOM object for update Question type form
            this.updateQuestionTypeBtn = $('#updateQuestionTypeBtn'); //DOM object for update Question type submit button
            this.upQuestTypeSuccessAlert = $('#questionTypeUpdateSuccessAlert'); //DOM object for update success alert
            this.upQuestTypeErrorAlert = $('#questionTypeUpdateErrorAlert'); //DOM object for update error alert

            //Update Question Class structure
            this.upQuestionClassForm = $('#updateQuestionClassStruct'); //DOM object for update Question class structure form
            this.upQuestionClassBtn = $('#updateQuestionClassStructBtn'); //DOM object for update Question class structure submit button
            this.upQuestClassSuccessAlert = $('#upQuestClassSuccessAlert'); //DOM object for update success alert
            this.upQuestClassErrorAlert = $('#upQuestClassErrorAlert'); //DOM object for update error alert

            //Update Question illustration
            this.updateQuestIllustForm = $('#updateQuestionIllust'); //DOM object for update Question illustration form
            this.updateQuestIllustBtn = $('#updateQuestionIllustBtn'); //DOM object for update Question illustration submit button
            this.upQuestIllustSuccessAlert = $('#upQuestIllustSuccessAlert'); //DOM object for update success alert
            this.upQuestIllustErrorAlert = $('#upQuestIllustErrorAlert'); //DOM object for update error alert

            //Options
            this.optionObj = $('#createdOptions'); //DOM object for update error alert

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
                        <div class="font-primary list-question" data-url="${appData.hostname}/question/${datum.id}" style="padding: 10px">${datum.question}</div>
                        <div class="qg-col--xs--4 list-question-illust" data-url='${appData.hostname}/question/update/illustration/${datum.id}'>
                            ${datum.illustration !== null ? '<img src="'+datum.illustration+'" class="qg-img--curved qg-img--responsive" >' : '' }
                        </div>
                        <div class="font-secondary option-url" style="padding: 10px" data-url="${appData.hostname}/option/fetch/${datum.id}">
                           <span class="list-question-class" data-url="${appData.hostname}/question/update/class/${datum.id}"> ${datum.faculty.name}</span> / ${datum.departments.name} / ${datum.courses.name} ( ${datum.courses.course_code} ) / <span class="f-green list-question-type" data-url="${appData.hostname}/question/update/type/${datum.id}">${datum.question_type}</span> / ${datum.department_level} / <span class="list-academic-session">${datum.academic_session}</span> session 
                        </div>
                    </div>
                    <div class="qg-col--xs--3 qg-flex">
                        <a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center questionModalAnchor" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
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
            this.optionComponent = {
                success: {
                    data: "", //Received data from Ajax request
                    template: function() {
                        var html = '';
                        if(this.data.length > 0){
                            for (var datum of this.data) { //loop through the recieved data's object
                            html += `<div class="qg-flex">
                                <div class="qg-col--xs--9" style="padding: 0px 4px">
                                    <input type="text" value="${datum.option}" name="options[]" class="form-control qg-input new-option-input" value=""  placeholder="option" title="">
                                </div>
                                <div class="qg-col--xs--2">
                                    <a href="" class="btn qg-btn btn-red--dark removeOption">
                                      <span class="glyphicon glyphicon-remove"></span>
                                    </a>
                                </div>
                            </div>`
                            }
                            return html;
                        }
                        return 'No option found';
                    }
                },
                error: {
                    template: `<div class="alert alert-danger">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <strong>Error!!</strong> <p>Internal Server Error, Please try again</p>
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
        this.loadOptions = new ButtonRequest(); //new instance of  ButttonRequest object
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
            this.view.components.success.data = "Question successfully created"
            this.submitModule.errorAlert = this.view.createErrorAlert;
            this.submitModule.successAlert = this.view.createSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.createQuestionForm;
            this.submitModule.submitButton = this.view.createQuestionBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.refreshSearchQuestion() };
            this.submitModule.init();
        },
        UpdateQuestionData:function () {
            /* body... */
            var obj = this
            this.view.components.success.data = "Question data successfully updated"
            this.submitModule.errorAlert = this.view.updateErrorAlert;
            this.submitModule.successAlert = this.view.updateSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.updateQuestionDataForm;
            this.submitModule.submitButton = this.view.updateQuestionDataBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchQuestion() } 
            this.submitModule.init();
        },
        UpdateQuestionClass:function () {
            var obj = this
            this.view.components.success.data = "Question avatar successfully updated"
            this.submitModule.errorAlert = this.view.upQuestClassErrorAlert;
            this.submitModule.successAlert = this.view.upQuestClassSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.upQuestionClassForm;
            this.submitModule.submitButton = this.view.upQuestionClassBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchQuestion() } 
            this.submitModule.init();
        },
        UpdateQuestionIllust:function () {
            //Update Question illustration
            var obj = this
            this.view.components.success.data = "Question Illustration successfully updated"
            this.submitModule.errorAlert = this.view.upQuestIllustErrorAlert;
            this.submitModule.successAlert = this.view.upQuestIllustSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.updateQuestIllustForm;
            this.submitModule.submitButton = this.view.updateQuestIllustBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchQuestion() } 
            this.submitModule.init();
        },
        UpdateQuestionType:function () {
            //Update Question type
            var obj = this
            this.view.components.success.data = "Question type successfully changed"
            this.submitModule.errorAlert = this.view.upQuestTypeErrorAlert;
            this.submitModule.successAlert = this.view.upQuestTypeSuccessAlert;
            this.submitModule.formModule = this.formObject;
            this.submitModule.formElement = this.view.updateQuestionType;
            this.submitModule.submitButton = this.view.updateQuestionTypeBtn;
            this.submitModule.component = this.view.components;
            this.submitModule.refreshSearch = function () { obj.reloadSearchQuestion() } 
            this.submitModule.init();
        },
        //Model for search Question Ajax states
        searchQuestion: function() {

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
        //Load question options to modal
        LoadOptions: function(mainObject){
            mainObject.view.optionObj.empty(); //Empty the options html object 
            var questionType = ModalDataTransfer.domObject.parent().parent().find($('.list-question-type')).text()
            var optionURL = ModalDataTransfer.domObject.parent().parent().find($('.option-url')).data('url')
            if (questionType == 'MC') { //Check if the question type is Multiple choice
                mainObject.loadOptions.action = optionURL; //url for option request
                mainObject.loadOptions.method = 'GET'; //url for button request
                mainObject.loadOptions.beforeAjaxReq = function() {
                    mainObject.view.optionObj.html('<i style="color:green;font-size:14px">loading options.....</i>'); //alert message during ajax request
                }
                mainObject.loadOptions.successfullAjaxReq = function(response) {
                    mainObject.view.optionObj.empty(); //remove alert message after succefull ajax requestFullscreen()
                    mainObject.view.optionComponent.success.data = response; //assigning ajax response to template object for processing
                    mainObject.view.optionObj.html(mainObject.view.optionComponent.success.template()) //parsing the processed response to HTML
                }
                mainObject.loadOptions.failedAjaxReq = function() {
                    mainObject.view.optionObj.empty(); //remove alert message after failed ajax request
                    mainObject.view.optionObj.html(mainObject.view.optionComponent.error.template); //alert message during ajax request
                }
                mainObject.loadOptions.ajaxReq();
            }
        }
        ,
        //Model for transfer Question data to the modal
        transferQuestionData: function(domObject) {
            /* body... */
            var obj = this;
            ModalDataTransfer.domObject = domObject;
            ModalDataTransfer.headerData = ''; //Data to be transfered to the modal's header
            ModalDataTransfer.formActionData = {
                '#updateQuestion': $('.list-question'),
                '#updateQuestionIllust': $('.list-question-illust'),
                '#updateQuestionType': $('.list-question-type'),
                '#updateQuestionClassStruct': $('.list-question-class'),
            }; //Data to be transfered to the action attribute of the modal's form
            ModalDataTransfer.inputData = {
                '#modal-question': $('.list-question'),
                '#modal-academic-session': $('.list-academic-session'),
            }; //Data to be transfered to the input's value of the modal's form
            ModalDataTransfer.fetchData = function() {
                obj.LoadOptions(obj);
            }
            ModalDataTransfer.init(); //perform the transfer
        },
        //Model for removing parent elment question options parent element
        removeParentElement:function (obj) {
            return obj.parent().parent().remove();
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
        //Controller for fetching faculty to update Question
        QuestionFacUpdateSelect: function() {
            var obj = this;
            obj.view.questionFacultyUpdate.click(function(e) {
                obj.model.QuestionFacUpdateSelect();
            })
            return obj;
        },
        //Controller for fetching department to update Question
        QuestionDeptUpdateSelect: function() {
            var obj = this;
            obj.view.questionDepartmentUpdate.click(function(e) {
                obj.model.QuestionDeptUpdateSelect();
            })
            return obj;
        },
        //Controller for fetching course to update Question
        QuestionCourseUpdateSelect: function() {
            var obj = this;
            obj.view.questionCourseUpdate.click(function(e) {
                obj.model.QuestionCourseUpdateSelect();
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
        //Controller for updating Question data
        updateQuestion: function() {
            var obj = this;
            this.view.updateQuestionDataBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateQuestionData();
            })
            return obj;
        },
        //Controller for updating Question class
        updateQuestionClass: function() {
            var obj = this;
            this.view.upQuestionClassBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateQuestionClass();
            })
            return obj;
        },
        //Controller for updating Question illustration
        updateQuestionIllust: function() {
            var obj = this;
            this.view.updateQuestIllustBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateQuestionIllust();
            })
            return obj;
        },
        //Controller for updating Question type
        updateQuestionType: function() {
            var obj = this; 
            this.view.updateQuestionTypeBtn.click(function(e) {
                e.preventDefault();
                obj.model.UpdateQuestionType();
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
            this.view.searchQuestionResult.on('click', '.questionModalAnchor', function(e) {
                e.preventDefault();
                var obj1 = $(this);
                obj.model.transferQuestionData(obj1);
            })
            return obj;
        },
        //Controller for removing parent elment question options parent element
        removeParentElement:function () {
            var obj = this
            this.view.optionObj.on('click','.removeOption',function (e) {
                e.preventDefault();
                var obj1 = $(this);
                obj.model.removeParentElement(obj1);
            });
            return this
        },
        init: function() {
            this.QuestionFacSelect()
                .QuestionDeptSelect()
                .QuestionCourseSelect()
                .QuestionFacUpdateSelect()
                .QuestionDeptUpdateSelect()
                .QuestionCourseUpdateSelect()
                .createQuestion()
                .loadQuestion()
                .searchQuestion()
                .refreshSearch()
                .nextSearchPaginate()
                .prevSearchPaginate()
                .transferQuestionData()
                .updateQuestion()
                .updateQuestionClass()
                .updateQuestionIllust()
                .updateQuestionType()
                .removeParentElement();
        }
    }
    new QuestionController().init();
})();
