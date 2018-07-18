@extends('body.layout')

@section('title')
	<title>Create Questions</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px; border-bottom: 0.8px solid rgb(217, 217, 217)">
	Create Questions
</div>
<!--Question management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Edit Created Question</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" id="updateQuestion" method="POST" role="form" class="font-secondary f-black">
					<input type="" name="_method" value="put" hidden="">
					<div class="form-group">
						<label for="question">Question</label>
						<textarea  name="question" id="modal-question" class="form-control qg-input" value="" required="required"></textarea>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Academic Session</label>
						<input type="number" name="academic_session" id="modal-academic-session" class="form-control qg-input" value="" required="required" max="2099" min="1988" title="">
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
					<div class="form-group font-primary">
						<button type="submit" id="updateQuestionBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="questionUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="questionUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form><hr>
				<!--Update Question Type-->
				<form action="" id="updateQuestionType" method="POST" role="form" class="font-secondary f-black">
					<input name="_method" value="put" hidden="">
					<question-type></question-type>
					<p class="font-secondary" style="padding:5px">Preset Options</p>
					<div id="createdOptions"></div>
					<div class="form-group font-primary">
						<button type="submit" id="updateQuestionTypeBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="questionTypeUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="questionTypeUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form><hr>
				<!--Update question class structure-->
				<form action="" id="updateQuestionClassStruct" method="POST" role="form" class="font-secondary f-black">
					<input type="" name="_method" value="put" hidden="">
					<div class="form-group" style="font-size: 13px">
						<label for="input">Faculty</label>
						<div id="updateFacultyAlert"></div>
						<select name="faculty_id" id="QuestionFacultyUpdate" data-state="1" class="form-control qg-input" required="">
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Department</label>
						<div id="updateDepartmentAlert"></div>
						<select name="department_id" id="QuestionDepartmentUpdate" data-state="0" class="form-control qg-input" required="">
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Course</label>
						<div id="updateCourseAlert"></div>
						<select name="course_id" id="QuestionCourseUpdate" data-state="0" class="form-control qg-input" required="" >
						</select>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateQuestionClassStructBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="upQuestClassSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="upQuestClassErrorAlert">
						<!--Error alert-->
					</div>
				</form><hr/>
				<!--Update question illustration-->
				<form method="POST" action="" id="updateQuestionIllust" class="font-primary">
					<input type="" name="_method" value="put" hidden="">
					<div class="form-group" style="font-size: 13px">
						<label for="input">Change Question Illustration</label>
						<input type="file" name="illustration" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Question" title="">
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateQuestionIllustBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="upQuestIllustSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="upQuestIllustErrorAlert">
						<!--Error alert-->
					</div>
				</form>
			</div>
			<div class="modal-footer font-primary">
				<button type="button" class="btn qg-btn btn-red--transparent" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<!--Question Create Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Create New Question</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{ route('question.store') }}" method="POST" id="createQuestion" role="form" class="font-secondary f-black">
					<div class="form-group">
						<label for="question">Question</label>
						<textarea  name="question" id="question" class="form-control qg-input" value="" required="required"></textarea>
					</div>
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
					<question-type></question-type>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Academic Session</label>
						<input type="number" name="academic_session" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" max="2099" min="1988" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Question Illustration</label>
						<input type="file" name="question_illustration" class="form-control qg-input">
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createQuestionBtn" class="btn btn-green--dark qg-btn">Submit</button>
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
			<div class="qg-col--xs--10" style="border-bottom: 0.7px solid #f2f2f2">
				<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Manage Questions</h5>	
			</div>
			<div class="qg-col--xs--10">
				<form action="{{ route('question.search') }}" method="GET" id="searchQuestion" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="question" id="searchQuestionInput" class="form-control qg-input font-primary" value="" placeholder="Search questions" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchQuestionBtn" class="btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10 f-align-center">
				<a href="#" class="btn qg-btn btn-green--transparent f-align-center" id="reloadQuestionBtn" style="font-size: 19px;margin-bottom: 5px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchQuestionError">
			
			</div>
			<div id="searchResult">

			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" id="QuestionPrevSearch" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" id="QuestionNextSearch" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script src="{{ asset('js/create_questions.js') }}"></script>
@endsection

