@extends('authentication.layout')
@section('title')
	<title>Reset Password</title>
@endsection
@section('auth')
<div class="col-sm-12 qg-landing-sign-in" id="changePassword">
	<div class="col-xs-12 font-primary">
		<h2 style="padding: 20px; font-size:18px" ><i class="fas fa-user fa-2x qg-header-icon"></i> Change Password</h2>
	</div>
	<form action="{{ route('update_password') }}" method="POST" role="form" id="resetPassForm" class="font-secondary f-black">
		<input type="text" name="email" value="{{$email}}" hidden>
		<div class="form-group">
			<label class="qg-landing-label" for="#qg-landing-email">New Password</label>
			<input type="password" name="password" id="qg-landing-password" class="form-control qg-landing--input" value="" required="required" min="6" title="">
		</div>
		<div class="form-group">
			<label class="qg-landing-label" for="#qg-landing-email">Confirm New Password</label>
			<input type="password" name="password_confirmation" id="qg-landing-confirm-password" class="form-control qg-landing--input" value="" required="required" min="6" title="">
		</div>
		<div class="form-group f-align-left">
			<a href="{{route('index')}}" class="qg-anchor--dark js-anchor-recover-pass">Go back to Login Page</a>
		</div>
		<div class="form-group font-primary" id="resetPassSuccessAlert">
			<!--Success alert-->
		</div>
		<div class="form-group font-primary" id="resetPassErrorAlert">
			<!--Error alert-->
		</div>
		<div class="form-group font-primary">
			<button type="submit" class="btn btn-green--dark qg-btn" id="resetPassBtn">Submit</button>
		</div>
	</form>
</div>
@endsection
@section('script')
<!-- customJs -->
	<script src="{{ asset('js/reset_password.js') }}"></script>
@endsection