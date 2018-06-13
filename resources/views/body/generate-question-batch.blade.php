@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Generate Question Batch
</div>
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Question Paper</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form method="GET" action="" id="modalPrintQuestPaper" class="font-primary" enctype="multipart/form-data">
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminStatusBtn" class="btn btn-block qg-btn btn-green--transparent font-secondary">Download Question Paper</button>
					</div>
				</form>
				<form method="POST" action="" id="modalDeleteQuestPaper" class="font-primary" enctype="multipart/form-data">
					<input type="" hidden="" name="_method" value="delete">
					<div class="form-group font-primary">
						<button type="submit" id="deleteQuestionBatchBtn" class="btn btn-block btn-red--dark qg-btn">Delete Question Paper</button>
					</div>
					<div class="form-group font-primary" id="deleteQuestionSuccess">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="deleteQuestionError">
						<!--Error alert-->
					</div>
				</form>
			</div>
			<div class="modal-footer font-primary">
				<button type="button" class="btn qg-btn btn-red--dark" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<!--Genrate Question Batch Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Generate Questions</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{ route('generate-question-batch.store') }}" method="POST" role="form" id="createQuestionBatch" class="font-secondary f-black">
					<div class="form-group" style="font-size: 13px">
						<label for="input">Faculty</label>
						<div id="selectFacultyAlert"></div>
						<select name="faculty_id" id="QuestionFaculty" data-state="1" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Department</label>
						<div id="selectDepartmentAlert"></div>
						<select name="department_id" id="QuestionDepartment" data-state="0" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Course</label>
						<div id="selectCourseAlert"></div>
						<select name="course_id" id="QuestionCourse" data-state="0" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Question count</label>
						<p style="color:lightgrey">Max. number of question count is 200</p>
						<input type="number" name="question_count" class="form-control qg-input" required="" max="2099">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Departmental Level</label>
						<select name="department_level" id="input" class="form-control qg-input" required="required">
							<option value="100">100</option>
							<option value="200">200</option>
							<option value="300">300</option>
							<option value="400">400</option>
							<option value="500">500</option>
							<option value="600">600</option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Academic Session</label>
						<p style="color:lightgrey">Max. academic session is 2099</p>
						<div class="form-group">
							<input type="number" name="academic_session" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" max="2199" min="1988" placeholder="e.g 2018" title="">
						</div>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Question Type</label>
						<select name="question_type" id="input" class="form-control qg-input" required="required">
							<option value="Theory">Theory</option>
							<option value="MC">MC</option>
						</select>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createQuestionBatchBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="questionCreateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="questionCreateErrorAlert">
						<!--Error alert-->
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Manage Questions-->
		<div class="qg-card" style="background: white;">
			<div class="qg-col--xs--10 qg-flex font-primary">
				<div class="qg-col--xs--7">
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Manage Questions Batches</h5>
				</div>
				<a href="#" id="reloadQuestionBtn" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="{{ route('generate-question-batch.search') }}" method="GET" id="searchQuestionPaper" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="question_paper" id="searchQuestionPaperInput" class="form-control qg-input font-primary" value="" placeholder="Search question batches" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchQuestionPaperBtn" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchQuestionError">
			</div>
			<div id="searchResult">
				
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" id="QuestionPrevSearch" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" id="QuestionNextSearch">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script type="text/javascript" src="{{ asset('js/generate_question_batch.js') }}"></script>
@endsection