@extends('body.layout')

@section('title')
	<title>Dashboard</title>
@endsection

@section('body')
<div class="qg-col--xs--10 font-primary" style="padding: 20px; background: white; font-size: 20px; border-bottom: 0.8px solid rgb(217, 217, 217)">
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
			<div class="qg-col--xs--10 qg-flex font-primary">
				<div class="qg-col--xs--10">
					<h5 class="font-primary f-green" style="padding:10px 10px"> <span> + &nbsp;</span> Created Question Papers</h5>
				</div>
			</div>
			<div id="searchResult">
				@if ($question_papers !== null)
					@foreach ($question_papers as $paper)
					<div class="qg-card--content qg-flex font-secondary " style="border-color: #f3f3f3">
						<div class="qg-col--xs--7 qg-animate--card-content">
							<div class="font-primary printQuestPaper" style="padding: 10px" >
								{{$paper->courses->name}} ( {{$paper->courses->course_code}} )
							</div>
							<div class="font-primary" style="padding: 10px">
								Question-paper id - {{$paper->unique_id}}
							</div>
							<div class="font-secondary deleteQuestPaper" style="padding: 10px">
								{{$paper->faculty->name}} / {{$paper->departments->name}} / <span class="f-green">{{$paper->question_type}}</span> / {{$paper->department_level}} level / {{$paper->academic_session}} session
							</div>
						</div>
						<div class="qg-col--xs--3 qg-flex">
							<a href="{{ url('/generate-question-batch/download/'.$paper->unique_id) }}" class="qg-block qg-col--xs--10 qg-anchor--green f-align-center" title="Download papers" style="font-size:17px"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
						</div>
					</div>
					@endforeach
				@else
					<p class="f-align-center font-primary"> No papers found </p>
				@endif
			</div>
			<div class="qg-card--content qg-flex font-secondary" style="border-color: #f3f3f3">
				<div class="qg-col--xs--10" style="padding: 10px"><a href="{{ route('generate-question-batch.index') }}" class="qg-block qg-btn btn btn-block btn-green--transparent" style="margin:10px auto" id="QuestionPrevSearch" > View More Questions </a></div>
			</div>
		</div>
	</div>
</div>
@endsection
@section('script')
<script type="text/javascript" src="{{ asset('js/dashboard.js') }}"></script>
@endsection