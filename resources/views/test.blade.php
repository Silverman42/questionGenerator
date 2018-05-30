<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<form action='{{ url('/test') }}' method="POST">
		{{ csrf_field() }}
		<input type="text" name="input_1">
		<input type="text" name="input_2">
		<input type="file" name="_file">
		<input type="submit" name="" value="Submit">
	</form>
</body>
</html>