@extends('authentication.layout')

@section('title')
	<title>Recover Password</title>
@endsection

@section('auth')
<div class="col-sm-12 qg-landing-sign-in font-primary">
	<div class="col-xs-12">
		<h2 style="padding: 20px; font-size:18px" ><i class="fas fa-key fa-2x qg-header-icon"></i> Recover Password</h2>
	</div>
	<form action="{{ route('create_token') }}" method="POST" role="form" id="recover-password">
		<div class="form-group">
			<label class="qg-landing-label" for="#qg-landing-email">E-mail</label>
			<input type="email" name="email" id="qg-landing-email" class="form-control qg-landing--input" value="" required="required"  title="">
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-green--dark qg-btn" id="recoverPBtn">Submit</button>
		</div>
		<div class="form-group font-primary" id="recoverPSuccessAlert">
			<!--Success alert-->
		</div>
		<div class="form-group font-primary" id="recoverPErrorAlert">
			<!--Error alert-->
		</div>
		<div class="form-group f-align-right">
			<span> Are you an admin ?</span>
			<a href="{{ route('index') }}" style="padding: 10px 10px" class="btn btn-green--transparent qg-btn js-anchor-sign-in">Sign In</a>
		</div>
	</form>
</div>
@endsection

@section('script')
<!-- customJs -->
	<script src="{{ asset('js/recover_password.js') }}"></script>
@endsection