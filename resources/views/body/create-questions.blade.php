@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Create Questions
</div>
<!--Question management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Edit Subjects</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group">
						<input type="text" name="" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Question" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Department</label>
						<select name="department_id" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Course</label>
						<select name="course_id" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Difficulty</label>
						<select name="difficulty" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
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
						<label for="input">Question Type</label>
						<select name="question_type" id="input" class="form-control qg-input" required="required">
							<option value="Theory">Theory</option>
							<option value="MC">MC</option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label>Options</label>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_1">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_1" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_2">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_2" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_3">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_3" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_1">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_4" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div class="qg-col--xs--10 font-primary" style="color: lightgrey">
							Select any of the radio inputs on the left of each option to chose an answer for the question
						</div>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Answer</label>
						<input type="text" name="answer" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Question" title="">
					</div>
					<div class="form-group font-primary">
						<button type="submit" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
				</form> <hr/>
				<form method="POST" action="" class="font-primary">
					<div class="form-group" style="font-size: 13px">
						<label for="input">Change Question Illustration</label>
						<input type="file" name="question_illustration" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Question" title="">
					</div>
					<div class="form-group font-primary">
						<button type="submit" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
				</form>
			</div>
			<div class="modal-footer font-primary">
				<button type="button" class="btn qg-btn btn-red--dark" data-dismiss="modal">Close</button>
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
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: lightgray">
				<form action="" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group">
						<label for="question">Question</label>
						<input type="text" name="" id="question" class="form-control qg-input" value="" required="required" placeholder="" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Department</label>
						<select name="department_id" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Course</label>
						<select name="course_id" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Difficulty</label>
						<select name="difficulty" id="input" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
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
						<label for="input">Question Type</label>
						<select name="question_type" id="input" class="form-control qg-input" required="required">
							<option value="Theory">Theory</option>
							<option value="MC">MC</option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label>Options</label>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_1">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_1" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_2">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_2" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_3">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_3" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div  class="qg-flex">
							<div class="qg-col--xs--1">
								<div class="radio">
									<input type="radio" name="answer" id="input" value="option_1">
								</div>
							</div>
							<div class="qg-col--xs--9">
								<input type="text" name="option_4" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="Question" title="">
							</div>
						</div>
						<div class="qg-col--xs--10 font-primary" style="color: lightgrey">
							Select any of the radio inputs on the left of each option to chose an answer for the question
						</div>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Academic Session</label>
						<input type="number" name="answer" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" max="2099" min="1988" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Question Illustration</label>
						<input type="file" name="question_illustration" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Question" title="">
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
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Manage Questions</h5>
				</div>
				<a href="#" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="" method="" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="" id="qg-landing-dp-name" class="form-control qg-input font-primary" value="" placeholder="Search questions" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua
						?
					</div>
					<div class="font-secondary" style="padding: 10px">
						Chemistry ( CHEM 220 ) / <span class="f-green">Theory</span> / 100 level
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Remove"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua
						?
					</div>
					<div class="font-secondary" style="padding: 10px">
						Physics ( PHY 220 ) / <span class="f-green">Theory</span> / 100 level
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Remove"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua
						?
					</div>
					<div class="font-secondary" style="padding: 10px">
						Agriculture ( AGIC 220 ) / <span class="f-green">MC</span> / 100 level
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Remove"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: lightgray">
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
	@endsection
	@section('script')
	<script type="text/javascript"></script>
	@endsection