@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Generate Question Batch
</div>
<!--Genrate Question Batch Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Generate Questions</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="" method="POST" role="form" class="font-secondary f-black">
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
						<select name="departmental_level" id="input" class="form-control qg-input" required="required">
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
							<input type="number" name="" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" max="2199" min="1988" placeholder="e.g 2018" title="">
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
						<button type="submit" class="btn btn-green--dark qg-btn">Submit</button>
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
				<a href="#" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="" method="" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="" id="qg-landing-dp-name" class="form-control qg-input font-primary" value="" placeholder="Search question batches" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Chemistry ( CHEM 220 )
					</div>
					<div class="font-secondary" style="padding: 10px">
						Physical Science/ Chemistry / <span class="f-green">Theory</span> / 100 level / 2017 session
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="download" style="font-size:17px"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Physics ( PHY 220 )
					</div>
					<div class="font-secondary" style="padding: 10px">
						Physics Department / <span class="f-green">Theory</span> / 100 level / 2017 session
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="download" style="font-size:17px"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Geology ( GEO 220 )
					</div>
					<div class="font-secondary" style="padding: 10px">
						Geology Department / <span class="f-green">MC</span> / 100 level / 2017 session
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="download" style="font-size:17px"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script type="text/javascript" src="{{ asset('js/generate_question_batch.js') }}"></script>
@endsection