@extends('body.layout')

@section('title')
	<title>Restore Deactivated Admin</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Restore Deactivated Admins
</div>
<!--Manage Admin Body-->
<div class="qg-body">
	<div class="qg-col--sm--10" style="padding: 20px">
		<div class="qg-card" style="background: white;">
			<div class="qg-col--xs--10 qg-flex font-primary">
				<div class="qg-col--xs--7">
				</div>
				<a href="#" id="reloadAdminBtn" class="qg-col--xs--3 qg-block qg-anchor--green f-align-center" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<!--Search Administrator-->
			<div class="qg-col--xs--10">
				<form action="{{ route('admin.search.deactivated') }}" method="" class="qg-flex" id="searchAdmin">
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
<script type="text/javascript" src="{{ asset('js/restore_deactive_admins.js') }}"></script>
@endsection