@extends('body.layout')

@section('title')
	<title>Faculty</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px" id="js-faculty">
	Faculty
</div>
<!--Faculty management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Edit Faculty : <span id="modalFacHeader"></span></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" id="updateFaculty" enctype="multipart/form-data" method="POST" role="form" class="font-secondary f-black">
					<input type="" name="_method" value="put" hidden="hidden">
					<div class="form-group">
						<label for="qg-update-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-update-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="qg-update-name">Description</label>
						<textarea id="qg-update-description" class="form-control qg-input" name="description" value="" required="required" pattern="" placeholder="Must be at most 100 characters long" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateFacultyBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="facUpdateSuccessAlert">
					<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="facUpdateErrorAlert">
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
<!--Faculty Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Faculty-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Create New Faculty</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{URL::to('faculty')}}" id="createFaculty" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group">
						<label for="qg-update-name">Name<sup style="color: red">*</sup></label>
						<input type="text" name="name" id="qg-landing-dp-name" class="form-control qg-input" value="" required="required" placeholder="Must be at most 100 characters long" title="">
					</div>
					<div class="form-group">
						<label for="qg-update-name">Description</label>
						<textarea id="qg-landing-dp-description" class="form-control qg-input" value=""  placeholder="Must be at most 100 characters long" name="description" title=""></textarea>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createFacultyBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="facultySuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="facultyErrorAlert">
						<!--Error alert-->
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Manage Faculty-->
		<div class="qg-card" style="background: white;">
			<div class="qg-col--xs--10 qg-flex font-primary">
				<div class="qg-col--xs--7">
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Manage Faculty</h5>
				</div>
				<a href="#" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" id="reloadFacultyBtn" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="{{ route('faculty.search') }}" method="" id="searchFaculty" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="faculty" id="searchFacultyInput" class="form-control qg-input font-primary" value="" placeholder="Search faculty" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchFacultyBtn" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchFacultyError">
			</div>
			<div id="searchResult">
				
			</div>
			<div class="qg-card--content qg-flex font-secondary f-align-center" style="border-color: #f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button id="FacPrevSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button id="FacNextSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script src="{{ asset('js/faculty.js') }}"></script>
@endsection