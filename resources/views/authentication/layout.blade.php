<!DOCTYPE html>
<html lang="">
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
		<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/app2.css') }}">
	</head>
	<body class="qg-landing-background">
		<div class="container-fluid" id="app">
			<div class="qg-flex qg-flex--wrap qg-landing" >
				<div class="qg-col--xs--10">
					<div class="qg-col--xs--4 qg-col--md--2" style="padding-left: 20px">
						<!--logo-->
						<img src="{{asset('img/svg/logo.svg')}}" class="qg-img--responsive">
					</div>
				</div>
				<div class="qg-col--md--5 qg-col--xs--10 qg-landing-left">
					<div class="col-sm-12 f-bold font-primary" style="padding-top:18px; color: white;">
						<h1 style="line-height: 1.5em; font-size: 2.3em !important">Question Generation Portal for Tertiary institutions</h1>
						<p>Create and organise printable question papers for <br> all faculties and departments the go !!</p>
					</div>
				</div>
				<div class="qg-col--xs--10 qg-col--md--5 qg-landing-right">
					@yield('auth')
				</div>
			</div>
		</div>
		<!-- jQuery -->
		<script src="{{ asset('js/app.js') }}"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		@yield('script')
	</body>
</html>