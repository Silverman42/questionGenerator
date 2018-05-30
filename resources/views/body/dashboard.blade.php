@extends('body.layout')
@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px">
	Dashboard
</div>
<!--Dashboard Body-->
<div class="qg-body">
	<div class="qg-col--sm--5" style="padding: 20px">
		<!--Card for Dashboard Details-->
		<div class="qg-card" style="background: white">
			<div class="font-primary qg-col--xs--10 qg-flex" style="padding:10px">
				<div class="qg-col--xs--7">
					<span> # &nbsp;</span>
					<span class="f-green">Total Courses</span>
				</div>
				<div class="qg-col--xs--3">
					<span class="badge badge-secondary">3</span>
				</div>
			</div>
			<div class="font-primary qg-col--xs--10 qg-flex" style="padding:10px">
				<div class="qg-col--xs--7">
					<span> # &nbsp;</span>
					<span class="f-green">Departments</span>
				</div>
				<div class="qg-col--xs--3">
					<span class="badge badge-secondary">6</span>
				</div>
			</div>
			<div class="font-primary qg-col--xs--10 qg-flex" style="padding:10px">
				<div class="qg-col--xs--7">
					<span> # &nbsp;</span>
					<span class="f-green">Broad Questions</span>
				</div>
				<div class="qg-col--xs--3">
					<span class="badge badge-secondary">3</span>
				</div>
			</div>
			<div class="font-primary qg-col--xs--10 qg-flex" style="padding:10px">
				<div class="qg-col--xs--7">
					<span> # &nbsp;</span>
					<span class="f-green">Faculties</span>
				</div>
				<div class="qg-col--xs--3">
					<span class="badge badge-secondary">6</span>
				</div>
			</div>
		</div>
		<!--Recently added papers-->
		<div class="qg-card" style="background: white;">
			<h5 class="font-primary f-green" style="padding:10px"> <span> + &nbsp;</span> Recently Created Question Papers</h5>
			<div class="qg-card--content qg-flex font-secondary" style="padding:10px; border-color: lightgray">
				<div class="qg-col--xs--6">How does ATP supply energy for cellular activities?</div>
				<div class="qg-col--xs--4">
					<button class="btn btn-responsive btn-green--dark qg-btn">View Question</button>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="padding:10px; border-color: lightgray">
				<div class="qg-col--xs--6">What is subsistent farming ?</div>
				<div class="qg-col--xs--4">
					<button class="btn btn-responsive btn-green--dark qg-btn">View Question</button>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="padding:10px; border-color: lightgray">
				<div class="qg-col--xs--6"> What is the conjugate base of H2PO4-?</div>
				<div class="qg-col--xs--4">
					<button class="btn btn-responsive btn-green--dark qg-btn">View Question</button>
				</div>
			</div>
		</div>
	</div>
	<div class="qg-col--sm--5" style="padding: 20px">
		<div class="qg-card" style="background: white;">
			<div class="font-primary qg-flex f-green" style="padding:10px">
				<div class="qg-col--xs--7">
					<span> + &nbsp;</span>Question Paper View
				</div>
				<div class="qg-col--xs--3">
					<button class="btn btn-responsive btn-green--dark qg-btn">Print</button>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
				<div class="qg-col--xs--7 qg-animate--card-content">
					<div class="font-primary" style="padding: 10px">
						Chemistry ( CHEM 220 )
					</div>
					<div class="font-secondary" style="padding: 10px">
						Chemistry Department / <span class="f-green">Theory</span> / 100 level / 2017 session
					</div>
				</div>
				<div class="qg-col--xs--3 qg-flex">
					<a href="#modal-id" data-toggle="modal" class="qg-block qg-col--xs--5 qg-anchor--green f-align-center" title="download" style="font-size:17px"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
				</div>
			</div>
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
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
			<div class="qg-card--content qg-flex font-secondary " style="border-color: lightgray">
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
		</div>
	</div>
</div>
@endsection
@section('script')
<script type="text/javascript"></script>
@endsection