@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Manage Admin
</div>
<!--Admin management modal-->
<div class="modal fade" id="modal-id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header font-primary">
				<h4 class="modal-title">Edit Admin</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">Name</label>
						<input type="text" id="admin-name" class="form-control qg-input" name="name" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Email</label>
						<input type="email" id="admin-email" class="form-control qg-input" name="email" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Passowrd</label>
						<input type="password" id="admin-email" class="form-control qg-input" name="password" required="true" min='6'>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="department">Role</label>
						<select name="role" id="Role" class="form-control qg-input" required="required">
							<option value="admin">Admin</option>
							<option value="hod" data-select-target="#department">HOD</option>
							<option value="admin" data-select-target="#department+#course">Lecturer</option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="department">Department</label>
						<select name="department_id" id="department" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="course">Course</label>
						<select name="course_id" id="course" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group font-primary">
						<button type="submit" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
				</form><hr>
				<form method="POST" action="" class="font-primary" enctype="">
					<div class="form-group" style="font-size: 13px">
						<label for="avatar">Change Avatar</label>
						<input type="file" id="avatar" class="form-control qg-input" name="avatar">
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
<!--Manage Admin Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> New Admin</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: lightgray">
				<form action="" method="POST" role="form" class="font-secondary f-black">
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">Name</label>
						<input type="text" id="admin-name" class="form-control qg-input" name="name" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Email</label>
						<input type="email" id="admin-email" class="form-control qg-input" name="email" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Passowrd</label>
						<input type="password" id="admin-email" class="form-control qg-input" name="password" required="true" min='6'>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="role">Role</label>
						<select name="role" id="role" class="form-control qg-input" required="required">
							<option value="admin">Admin</option>
							<option value="hod" data-select-target="#department">HOD</option>
							<option value="admin" data-select-target="#department+#course">Lecturer</option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="department">Department</label>
						<select name="department_id" id="department" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="course">Course</label>
						<select name="course_id" id="course" class="form-control qg-input" required="required">
							<option value=""></option>
						</select>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="avatar">Avatar</label>
						<input type="file" id="avatar" class="form-control qg-input" name="avatar">
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
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Edit Admin</h5>
				</div>
				<a href="#" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<div class="qg-col--xs--10">
				<form action="" method="" class="qg-flex">
					<div class="qg-col--xs--9">
						<input type="text" name="" id="qg-landing-dp-name" class="form-control qg-input font-primary" value="" placeholder="Search admins" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" class="btn qg-btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary js-modal-name" style="padding: 10px">
						Nkeze Sylvester Uche
					</div>
					<div class="font-secondary" style="padding: 10px">
						Chemistry Department / <span class="f-green js-modal-email">snkeze9@gmail.com</span> / Lecturer / CHEM 220
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Deactivate"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Kingsly Amuche
					</div>
					<div class="font-secondary" style="padding: 10px">
						Physics Department / <span class="f-green">serial@gmail.com</span> / Lecturer / PHY 220
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Deactivate"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Olori James
					</div>
					<div class="font-secondary" style="padding: 10px">
						Geology Department / <span class="f-green">snkeze9@gmail.com</span> / HOD
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#" class="qg-block qg-col--xs--5 qg-anchor--red f-align-center" title="Deactivate"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="Edit" style="font-size:17px"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: lightgray">
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script type="text/javascript"></script>
@endsection