@extends('authentication.layout')
@section('auth')
<div class="col-sm-12 qg-landing-sign-in" id="sign-in">
	<div class="col-xs-12 font-primary">
		<h2 style="padding: 20px; font-size:18px" ><i class="fas fa-user fa-2x qg-header-icon"></i> Sign In</h2>
	</div>
	<form action="{{ asset('login') }}" method="POST" role="form" id="loginForm" class="font-secondary f-black">
		<div class="form-group">
			<label class="qg-landing-label" for="#qg-landing-email">E-mail</label>
			<input type="email" name="email" id="qg-landing-email" class="form-control qg-landing--input" value="" required="required" title="">
		</div>
		<div class="form-group">
			<label class="qg-landing-label" for="#qg-landing-email">Password</label>
			<input type="password" name="password" id="qg-landing-password" class="form-control qg-landing--input" value="" required="required" min="6" title="">
		</div>
		<div class="form-group f-align-left">
			<a href="{{URL::to('recover-password')}}" class="qg-anchor--dark js-anchor-recover-pass">Forgotten password ?</a>
		</div>
		<div class="form-group font-primary" id="loginSuccessAlert">
			<!--Success alert-->
		</div>
		<div class="form-group font-primary" id="loginErrorAlert">
			<!--Error alert-->
		</div>
		<div class="form-group font-primary">
			<button type="submit" class="btn btn-green--dark qg-btn" id="loginBtn">Submit</button>
		</div>
	</form>
</div>
@endsection