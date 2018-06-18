@extends('authentication.layout')

@section('title')
	<title>Failed password reset</title>
@endsection

@section('auth')
<div class="col-sm-12 qg-landing-sign-in" id="changePassword">
	<div class="col-xs-12 font-primary">
		<h2 style="padding: 20px; font-size:18px" ><i class="fas fa-user fa-2x qg-header-icon"></i> Failed Password Reset</h2>
	</div>
	<div class="col-xs-12 font-primary f-align-center" style="color: rgb(200,100,100);padding: 20px">
		The password reset URL is either expired or does not exist
	</div>
	<div class="col-xs-12 font-primary f-align-center" style="padding: 15px">
			<a href="{{ route('index') }}" style="padding: 10px 10px" class="btn btn-green--transparent qg-btn js-anchor-sign-in">Go back to home page</a>
	</div>
</div>
@endsection