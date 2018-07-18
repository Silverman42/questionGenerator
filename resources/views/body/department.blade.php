@extends('body.layout')

@section('title')
	<title>Department</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px;border-bottom: 0.8px solid rgb(217, 217, 217)" id="js-department">
	Department
</div>
<!--Department management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Edit Department : <span id="modalDeptHeader"></span></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" method="POST"  id="updateDepartment" enctype="multipart/form-data" role="form" class="font-secondary f-black">
					<input type="" name="_method" value="put" hidden="hidden">
					<div class="form-group">
						<label for="qg-update-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-update-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="qg-update-name">Select Faculty<sup style="color: red">*</sup></label>
						<select id="input" name="faculty_id" class="form-control qg-input" required="required">
							@foreach ($faculties as $faculty)
								<option value="{{$faculty->id }}">{{ $faculty->name }}</option>
							@endforeach
						</select>
					</div>
					<div class="form-group">
						<label for="input">Description </label>
						<textarea id="qg-update-description" class="form-control qg-input" id="modalDeptInput2" name="description" value="" required="required" pattern="" placeholder="Must be at most 100 characters long" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateDepartmentBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="deptUpdateSuccessAlert">
					<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="deptUpdateErrorAlert">
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
<!--Department Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Create New Department</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{URL::to('departments')}}" id="createDepartment" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group">
						<label for="qg-update-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="qg-update-name">Select Faculty <sup style="color: red">*</sup></label>
						<select id="input" name="faculty_id" class="form-control qg-input" required="required">
							@foreach ($faculties as $faculty)
								<option value="{{$faculty->id }}">{{ $faculty->name }}</option>
							@endforeach
						</select>
					</div>
					<div class="form-group">
						<label for="input">Description </label>
						<textarea id="qg-landing-dp-description" class="form-control qg-input" value="" required="required" pattern="" placeholder="Must be at most 100 characters long" name="description" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createDepartmentBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="deptSuccessAlert">
					<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="deptErrorAlert">
					<!--Error alert-->
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Manage Department-->
		<div class="qg-card" style="background: white;">

			<div class="qg-col--xs--10" style="border-bottom: 0.7px solid #f2f2f2">
				<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Manage Departments</h5>	
			</div>
			<div class="qg-col--xs--10">
				<form action="{{ route('department.search') }}" method="GET" id="searchDepartment" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="department" id="searchDepartmentInput" class="form-control qg-input font-primary" value="" placeholder="Search departments" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchDepartmentBtn"  class="btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10 f-align-center">
				<a href="#" class="btn qg-btn btn-green--transparent f-align-center" id="reloadDepartmentBtn" style="font-size: 19px;margin-bottom: 5px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchDepartmentError">
			</div>
			<div id="searchResult">
				
			</div>
			<div class="qg-card--content qg-flex font-secondary f-align-center" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button id="deptPrevSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button id="deptNextSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script src="{{ asset('js/department.js') }}"></script>
@endsection