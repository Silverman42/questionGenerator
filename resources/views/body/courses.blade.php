@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Courses
</div>
<!--Department management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary f-align-left">
				<h4 class="modal-title">Edit Courses : <span id="modalCourseHeader"></span></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" method="POST" id="updateCourse" role="form" class="font-secondary f-black">
					<input type="" hidden="hidden" name="_method" value="put">
					<div class="form-group">
						<label for="qg-update-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-update-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="qg-update-course-code">Course code<sup style="color: red">*</sup></label>
						<input type="text" name="course_code" id="qg-update-course-code" class="form-control qg-input" value="" required="required" placeholder="Must be at most 10 characters long" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Select Department <sup style="color: red">*</sup></label>
						<select name="department_id" id="input" class="form-control qg-input" required="required">
							@foreach ($departments as $department)
							<option value="{{ $department->id }}">{{ $department->name }}</option>
							@endforeach
						</select>
					</div>
					<div class="form-group">
						<label for="input">Description </label>
						<textarea id="qg-update-description" name='description' class="form-control qg-input" value="" placeholder="Must be at most 100 characters long" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateCourseBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="courseUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="courseUpdateErrorAlert">
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
<!--Department Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Create New Course</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{ route('courses.store') }}" id="createCourse" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group">
						<label for="qg-landing-dp-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="">Course code<sup style="color: red">*</sup></label>
						<input type="text" name="course_code" class="form-control qg-input" value="" required="required" placeholder="Must be at most 10 characters long" title="">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="input">Select Department <sup style="color: red">*</sup></label>
						<select name="department_id" id="input" class="form-control qg-input" required="required">
							@foreach ($departments as $department)
							<option value="{{ $department->id }}">{{ $department->name }}</option>
							@endforeach
						</select>
					</div>
					<div class="form-group">
						<label for="input">Description </label>
						<textarea id="qg-landing-dp-description" name="description" class="form-control qg-input" value=""  placeholder="Must be at most 100 characters long" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createCourseBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="courseSuccessAlert">
					<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="courseErrorAlert">
					<!--Error alert-->
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Manage Department-->
		<div class="qg-card" style="background: white;">
			<div class="qg-col--xs--10 qg-flex font-primary">
				<div class="qg-col--xs--7">
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Manage Courses</h5>
				</div>
				<a href="#" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" id="reloadCourseBtn" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="{{ route('courses.search') }}" method="" class="qg-flex" id="searchCourse">
					<div class="qg-col--xs--9">
						<input type="text" name="course" id="searchCourseInput" class="form-control qg-input font-primary" value="" placeholder="Search Course" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchCourseBtn" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchCourseError">
			</div>
			<div id="searchResult">
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button id="coursePrevSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button id="courseNextSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>	
		</div>
	</div>
</div>
@endsection
@section('script')
<script src="{{ asset('js/course.js') }}"></script>
@endsection