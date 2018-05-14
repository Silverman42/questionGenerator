<!DOCTYPE html>
<html lang="">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
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
		<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/app2.css') }}">
	</head>
	<body class="qg-landing-background">
		<div class="container-fluid">
			<div class="qg-flex" >
				<div class="qg-landing qg-col--lg--5">
					<div class="qg-landing-left" style="padding-top:90px;">
						<div class="col-sm-12 f-bold font-primary" style="padding-top:18px; color: white;">
							<p class="f-green" style="font-size: 30px; line-height: 30px;">University of Nigeria, Nsukka</p>
							<h1 style="line-height: 60px; font-size: 60px !important">Question Generation Portal</h1>
						</div>
					</div>
					<div class="qg-landing-right qg-col--md--5">
						<nav class="qg-navbar-1 font-primary f-align-center f-green">
							University of Nigeria, Nsukka
						</nav>
						@yield('auth')
					</div>
				</div>
			</div>
		</div>
		<!-- jQuery -->
		<script src="{{ asset('js/app.js') }}"></script>
		<!-- customJs -->
		<script src="{{ asset('js/app2.js') }}"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	</body>
</html>