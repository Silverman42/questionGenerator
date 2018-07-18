<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf_token" content="{{ csrf_token() }}">
		@yield('title')
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="{{ asset('css/app.css') }}">
		<link href="http://www.fontspace.com/arro/vegur?text=&fontsize=26" rel="stylesheet">
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/app2.css') }}">
	</head>
	<div class="modal fade" id="modal-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header font-primary">
					<h4 class="modal-title">{{ Auth::user()->surname."'s" }} Profile</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body f-align-center font-primary">
					<p style="padding: 10px">
						<span class="font-secondary">Name - </span>{{ Auth::user()->firstname.' '.Auth::user()->surname }}
					</p>
					<p style="padding: 10px">
						<span class="font-secondary">Role - </span>{{ Auth::user()->role }}
					</p>
					<p style="padding: 10px">
						<span class="font-secondary">Faculty - </span>{{ Auth::user()->faculty_id == null ? "None" : Auth::user()->faculty->name }}
					</p>
					<p style="padding: 10px">
						<span class="font-secondary">Department - </span>{{ Auth::user()->department_id == null ? 'None' : Auth::user()->departments->name }}
					</p>
					<p style="padding: 10px">
						<span class="font-secondary">Course - </span>{{ Auth::user()->course_id == null ? 'None' : Auth::user()->courses->name }}
					</p>
					<div style="padding: 10px">	
						<a href="{{ route('logout') }}" class="btn btn-block qg-btn btn-red--dark font-primary" title="Logout">
							<i class="fas fa-sign-out-alt"></i> Logout
						</a>
					</div>
				</div>
				<div class="modal-footer font-primary">
					<button type="button" class="btn qg-btn btn-red--transparent" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<body class="qg-main-background">
		<div class="qg-main-container" id="app">
			<nav class="qg-sidebar" id="js-qg-sidebar">
				<div class="qg-sidebar--remove-icon f-align-center" id="js-qg-sidebar--remove-icon"> X </div>
				<div class="qg-sidebar--profile">
					<!--Logo!-->
				</div>
				<div style="font-size: 13px" class="qg-sidebar--link font-primary" id="js-qg-sidebar--link">
					<a class="{{ URL::current() == url('/dashboard') ? 'active' : '' }}" href="{{ url('/dashboard') }}"> Dashboard</a>
					@if (Auth::user()->role == 'admin')
					<a class="{{ URL::current() == url('/faculty') ? 'active' : '' }}" href="{{ url('/faculty') }}"> Faculty</a>
					@endif
					@if (in_array(Auth::user()->role, ['admin','dean']))
					<a class="{{ URL::current() == url('/departments') ? 'active' : '' }}" href="{{ url('/departments') }}"> Department</a>
					@endif
					@if (in_array(Auth::user()->role, ['admin','dean','hod']))
					<a class="{{ URL::current() == url('/courses') ? 'active' : '' }}" href="{{ url('courses') }}"> Courses</a>
					@endif
					<a href="#qg-question-sublink" class="js-qg-sublink {{ URL::current() == url('/question') || URL::current() == url('/generate-question-batch') ? 'active' : '' }}"> Questions</a>
					<div class="qg-sidebar--sublink" style="padding-left: 20px" id="qg-question-sublink">
						<a class="{{ URL::current() == url('/question') ? 'active' : '' }}" href="{{ url('/question') }}">Create Questions</a>
						<a class="{{ URL::current() == url('/generate-question-batch') ? 'active' : '' }}" href="{{ url('generate-question-batch') }}">Generate Question Batch</a>
					</div>
					@if (Auth::user()->role == 'admin')
					<a href="#qg-admin-sublink" class="js-qg-sublink {{ URL::current() == url('/admin/manage') || URL::current() == url('/admin/restore-deactivated') ? 'active' : '' }}"> Admin</a>
					<div class="qg-sidebar--sublink" style="padding-left: 20px" id="qg-admin-sublink">
						<a class="{{ URL::current() == url('/admin/manage') ? 'active' : '' }}" href="{{ url('admin/manage') }}">Manage Admin</a>
						<a class="{{ URL::current() == url('/admin/restore-deactivated') ? 'active' : '' }}" href="{{ url('admin/restore-deactivated') }}">Restore Deactivated Admins</a>
					</div>
					@endif
				</div>
			</nav>
			<div class="qg-subcontainer" id="js-qg-subcontainer">
				<div class="qg-header qg-flex font-primary f-white">
					<div class="qg-col--xs--1 qg-col--md--0">
						<a href="" id="js-qg-burger" class="qg-burger">
							<i class="fas fa-bars"></i>
						</a>
					</div>
					<div class="qg-col--xs--8 qg-col--md--9 " style="padding-left: 12px; padding-top: 5px">
						University Of Nigeria, Nsuka
					</div>
					<div class="qg-col--xs--1">
						<a href="#modal-1" data-toggle="modal" style="outline: none">
							<img src="{{ Auth::user()->avatar }}" class="qg-img--small qg-img--circle" style="border:2px solid white">
						</a>

					</div>
				</div>
				@yield('body')
			</div>
		</div>
		<!-- jQuery -->
		<script src="{{ asset('js/app.js') }}"></script>
		@yield('script')
	</body>
</html>