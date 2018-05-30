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
				<h4 class="modal-title">Edit Admin: <span id="modalAdminFirstname"></span>&nbsp;<span id="modalAdminSurname"></span></h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<form action="" method="POST" role="form" id="modalAdminUpdate" class="font-secondary f-black">
					<input type="" name="_method" value="put" hidden="hidden">
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">First-Name</label>
						<input type="text" id="qg-update-firstname" class="form-control qg-input" name="firstname" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">Surname</label>
						<input type="text" id="qg-update-surname" class="form-control qg-input" name="surname" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Email</label>
						<input type="email" id="qg-update-email" class="form-control qg-input" name="email" required="true">
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="adminUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="adminUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form><hr>
				<form action="" method="POST" role="form" id="modalAdminPassUpdate" class="font-secondary f-black">
					<input type="" hidden="" name="_method" value="put">
					<div class="form-group" style="font-size: 13px">
						<label for="admin-passowrd">Passowrd</label>
						<input type="password" class="form-control qg-input" name="password" required="true" min='6'>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-passowrd-confirm">Confirm Passowrd</label>
						<input type="password" id="admin-passowrd-confirm" class="form-control qg-input" name="password_confirmation" required="true" min='6'>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminPassBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="passUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="passUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form>
				<hr>	
				<form action="" method="POST" role="form" id="modalAdminRoleUpdate" class="font-secondary f-black">	
					<input type="" hidden="" name="_method" value="put">
					<div class="form-group" style="font-size: 13px">
						<label for="department">Role</label>
						<select v-on:change='toggleAdminLevel($event,selectorEntriesUpdate)' name="role" id="Role" class="form-control qg-input" required="required">
							<option value="admin">Admin</option>
							<option value="dean" data-select-target="#department">Dean</option>
							<option value="hod" data-select-target="#department">HOD</option>
							<option value="lecturer" data-select-target="#department+#course">Lecturer</option>
						</select>
					</div>
					<div id="updateAdminSelectContain">
						<div v-if="selectorEntriesUpdate[0]" class="form-group" style="font-size: 13px">
							<label for="department">Faculty</label>
							<div id="updateFacultyAlert"></div>
							<select data-url="" data-state="1" name="faculty_id" id="adminFacultyUpdate" class="form-control qg-input" required="required">
								
							</select>
						</div>
						<div v-if="selectorEntriesUpdate[1]" class="form-group" style="font-size: 13px">
							<label for="department">Department</label>
							<div id="updateDepartmentAlert"></div>
							<select data-url="" data-state="0" name="department_id" id="adminDepartmentUpdate" class="form-control qg-input" required="required">
							</select>
						</div>
						<div v-if="selectorEntriesUpdate[2]" class="form-group" style="font-size: 13px">
							<label for="course">Course</label>
							<div id="updateCourseAlert"></div>
							<select data-url="" data-state="0" name="course_id" id="adminCourseUpdate" class="form-control qg-input" required="required">
							</select>
						</div>
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminRoleBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="roleUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="roleUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form>
				<hr>	
				<!--Update Administrator Avatar-->
				<form method="POST" action="" id="modalUpdateAdminAvatar" class="font-primary" enctype="multipart/form-data">
					<input type="" hidden="" name="_method" value="put">
					<div class="form-group" style="font-size: 13px">
						<label for="avatar">Change Avatar</label>
						<input type="file" class="form-control qg-input" name="avatar">
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminAvatarBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="avatarUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="avatarUpdateErrorAlert">
						<!--Error alert-->
					</div>
				</form><hr>
				<!--Update Administrator Status-->
				<form method="POST" action="" id="updateAdminStatus" class="font-primary" enctype="multipart/form-data">
					<input type="" hidden="" name="_method" value="put">
					<div class="form-group font-primary">
						<button type="submit" id="updateAdminStatusBtn" class="btn btn-block btn-red--dark qg-btn">Deactivate Administrator</button>
					</div>
					<div class="form-group font-primary" id="statusUpdateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="statusUpdateErrorAlert">
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
<!--Create Admin Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Create New Department-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> New Admin</h5>
			<div class="qg-card--content font-secondary" style="padding:10px; border-color: #f3f3f3">
				<form action="{{route('admin.create')}}" method="POST" role="form" id="createAdmin" class="font-secondary f-black">
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">First-Name</label>
						<input type="text" class="form-control qg-input" name="firstname" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-name">Surname</label>
						<input type="text" class="form-control qg-input" name="surname" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Email</label>
						<input type="email" class="form-control qg-input" name="email" required="true">
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Password</label>
						<input type="password"  class="form-control qg-input" name="password" required="true" min='6'>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="admin-email">Confirm Password</label>
						<input type="password" class="form-control qg-input" name="password_confirmation" required="true" min='6'>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="role">Role</label>
						<select v-on:change='toggleAdminLevel($event,selectorEntries)' name="role" id="role" class="form-control qg-input" required="required">
							<option value="admin">Admin</option>
							<option value="dean">Dean</option>
							<option value="hod" data-select-target="#department">HOD</option>
							<option value="lecturer" data-select-target="#department+#course">Lecturer</option>
						</select>
					</div>
					<div id="createAdminSelectContain">
						<div v-if='selectorEntries[0]' class="form-group" style="font-size: 13px">
							<label for="adminFaculty">Faculty</label>
							<div id="createFacultyAlert"></div>
							<select data-state="1" name="faculty_id" id="adminFaculty" class="form-control qg-input" required="required">
								<option data-url="" data-state="" id="adminFacultySelect" value=""></option>
							</select>
						</div>
						<div v-if='selectorEntries[1]' class="form-group" style="font-size: 13px">
							<label for="adminDepartment">Department</label>
							<div id="createDepartmentAlert"></div>
							<select data-state="0" name="department_id" id="adminDepartment" class="form-control qg-input" required="required">
								<option data-url="" data-state="" id="adminDepartmentSelect"></option>
							</select>
						</div>
						<div v-if='selectorEntries[2]' class="form-group" style="font-size: 13px">
							<label for="adminCourse">Course</label>
							<div id="createCourseAlert"></div>
							<select data-state="0" name="course_id" id="adminCourse" class="form-control qg-input" required="required">
								<option data-url="" data-state="" id="adminCourseSelect" value=""></option>
							</select>
						</div>
					</div>
					<div class="form-group" style="font-size: 13px">
						<label for="avatar">Avatar</label>
						<input type="file" class="form-control qg-input" name="avatar">
					</div>
					<div class="form-group font-primary">
						<button type="submit" id="createAdminBtn" class="btn btn-green--dark qg-btn">Submit</button>
					</div>
					<div class="form-group font-primary" id="adminCreateSuccessAlert">
						<!--Success alert-->
					</div>
					<div class="form-group font-primary" id="adminCreateErrorAlert">
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
					<h5 class="font-primary f-green" style="padding:3px 10px"> <span> + &nbsp;</span> Manage Courses</h5>
				</div>
				<a href="#" id="reloadAdminBtn" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<!--Search Administrator-->
			<div class="qg-col--xs--10">
				<form action="{{ route('admin.search') }}" method="" class="qg-flex" id="searchAdmin">
					<div class="qg-col--xs--9">
						<input type="text" name="admin" id="searchAdminInput" class="form-control qg-input font-primary" value="" placeholder="Search Administrators" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" class="btn qg-btn btn-green--dark" id="searchAdminBtn" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<div class="qg-col--xs--10  font-primary" id="searchAdminError">
			</div>
			<div id="searchResult">
			</div>
			<!--Search Administrator paginators-->
			<div class="qg-card--content qg-flex font-secondary" style="border-color:#f3f3f3">
				<div class="qg-col--xs--5" style="padding: 10px"><button id="adminPrevSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto" ><< Previous</button></div>
				<div class="qg-col--xs--5" style="padding: 10px"><button id="adminNextSearch" class="qg-block qg-btn btn btn-green--transparent" style="margin:10px auto">Next >></button></div>
			</div>
			
		</div>
	</div>
</div>
@endsection
@section('script')
<script src="{{ asset('js/manage_admin.js') }}"></script>
@endsection