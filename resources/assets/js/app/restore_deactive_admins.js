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