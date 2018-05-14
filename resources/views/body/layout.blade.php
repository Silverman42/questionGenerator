<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf_token" content="{{ csrf_token() }}">
		<title>Title Page</title>
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
	<body class="qg-main-background">
		<div class="qg-main-container" id="app">
			<nav class="qg-sidebar" id="js-qg-sidebar">
				<div class="qg-sidebar--remove-icon f-align-center" id="js-qg-sidebar--remove-icon"> X </div>
				<div class="qg-sidebar--profile">
					<img src="{{ asset('img/myAvatar.png') }}">
					<div style="font-size: 17px; padding: 15px">
						<p class="f-green font-primary">Nkeze Sylvester</p>
						<p class="f-white font-secondary">Admin</p>
					</div>
				</div>
				<div style="font-size: 13px" class="qg-sidebar--link font-primary" id="js-qg-sidebar--link">
					<a class="{{ URL::current() == url('/dashboard') ? 'active' : '' }}" href="{{ url('/dashboard') }}"> Dashboard</a>
					<a class="{{ URL::current() == url('/faculty') ? 'active' : '' }}" href="{{ url('/faculty') }}"> Faculty</a>
					<a class="{{ URL::current() == url('/departments') ? 'active' : '' }}" href="{{ url('/departments') }}"> Department</a>
					<a class="{{ URL::current() == url('/courses') ? 'active' : '' }}" href="{{ url('courses') }}"> Courses</a>
					<a href="#qg-question-sublink" class="js-qg-sublink {{ URL::current() == url('/create-question') || URL::current() == url('/generate-question-batch') ? 'active' : '' }}"> Questions</a>
						<div class="qg-sidebar--sublink" style="padding-left: 20px" id="qg-question-sublink">
							<a class="{{ URL::current() == url('/create-question') ? 'active' : '' }}" href="{{ url('create-question') }}">Create Questions</a>
							<a class="{{ URL::current() == url('/generate-question-batch') ? 'active' : '' }}" href="{{ url('generate-question-batch') }}">Generate Question Batch</a>
						</div>
					<a href="#qg-admin-sublink" class="js-qg-sublink {{ URL::current() == url('/admin/manage') || URL::current() == url('/admin/restore-deactivated') ? 'active' : '' }}"> Admin</a>
						<div class="qg-sidebar--sublink" style="padding-left: 20px" id="qg-admin-sublink">
							<a class="{{ URL::current() == url('/admin/manage') ? 'active' : '' }}" href="{{ url('admin/manage') }}">Manage Admin</a>
							<a class="{{ URL::current() == url('/admin/restore-deactivated') ? 'active' : '' }}" href="{{ url('admin/restore-deactivated') }}">Restore Deactivated Admins</a>
						</div>
				</div>
			</nav>
			<div class="qg-subcontainer" id="js-qg-subcontainer">
				<div class="qg-header qg-flex font-primary f-white">
					<span>
						<button class="qg-burger" id="js-qg-burger">
						<div></div>
						<div></div>
						<div></div>
						</button>
					</span>
					<span>
						University Of Nigeria, Nsuka
					</span>
				</div>
				@yield('body')
			</div>
		</div>
		<!-- jQuery -->
		<script src="{{ asset('js/app.js') }}"></script>
		@yield('script')
	</body>
</html>