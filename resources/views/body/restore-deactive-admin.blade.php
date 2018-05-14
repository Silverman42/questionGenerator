@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Restore Deactivated Admins
</div>
<!--Manage Admin Body-->
<div class="qg-body">
	<div class="qg-col--sm--10" style="padding: 20px">
		<!--Manage Questions-->
		<div class="qg-card" style="background: white;">
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
				<div class="qg-col--xs--3">
					<a href="#" class="qg-block qg-anchor--green f-align-center" title="Restore"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
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
				<div class="qg-col--xs--3">
					<a href="#" class="qg-block qg-anchor--green f-align-center" title="Restore"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
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
				<div class="qg-col--xs--3">
					<a href="#" class="qg-block qg-anchor--green f-align-center" title="Restore"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
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