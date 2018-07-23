@extends('body.layout')

@section('title')
	<title>Restore Deactivated Admin</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px; border-bottom: 0.8px solid rgb(217, 217, 217)">
	Restore Deactivated Admins
</div>
<!--Manage Admin Body-->
<div class="qg-body">
	<div class="qg-col--sm--10" style="padding: 20px">
		<div class="qg-card" style="background: white;">
			<!--Search Admin-->
			<div class="qg-col--xs--10">
				<form action="{{ route('admin.search.deactivated') }}" method="" class="qg-flex" id="searchAdmin">
					<div class="qg-col--xs--9">
						<input type="text" name="admin" id="searchAdminInput" class="form-control qg-input font-primary" value="" placeholder="Search Administrators" title="">
					</div>
					<div class="qg-col--xs--1">
						<button type="submit" id="searchAdminBtn"  class="btn btn-green--dark" name=""><span class="glyphicon glyphicon-search"></span></button>
					</div>
				</form>
			</div>
			<!--Refresh Search-->
			<div class="qg-col--xs--10 f-align-center">
				<a href="#" class="btn qg-btn btn-green--transparent f-align-center" id="reloadAdminBtn" style="font-size: 19px" title="Refresh"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
			</div>
			<!--Search Error Alert-->
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