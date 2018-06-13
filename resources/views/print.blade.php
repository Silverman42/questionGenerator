<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
		.font-align-center{
			text-align: center;
		}
		.list-style--alpha{
			list-style-type: lower-alpha;
		}
		.text-tranform-u{
			text-transform: uppercase;
		}
		.page-break{
			page-break-after: always;
		}
		.quest-num{
			display: inline-block;
			width: auto;
			padding: 10px;
			border: 0.8px solid lightgray;
		}
		.question{
			display: inline-block;
			width: auto;
			padding: 10px;
		}
	</style>
</head>
<body>
	<section class="font-align-center">	
			<p><b>University of Nigeria, Nsukka</b></p>
			<p><b>Faculty of {{ $question_details->faculty->name }}, Department of {{ $question_details->departments->name }}</b></p>
			<p><b>{{$question_details->courses->name}} ( {{$question_details->courses->course_code}} ) / {{ $question_details->department_level }} Level</b></p>
			<p><b>{{$question_details->academic_session}} ACADEMIC SESSION </b></p>
	</section>
	<section class="page-break">
		@foreach ($questions as $question)
		<div style="border: 2px solid black; margin: 10px 0px">
			<div style="padding: 10px">
				<span class="quest-num">{{ $count++ }}</span><span class="question">{{ $question->question }}</span> 
			</div>
			@if($question->options !== null)
			<div style="width: 100%; border-top: 0.8px solid lightgray">	
				<ol class="list-style--alpha">
					@foreach ($question->options as $option)
						<li>{{$option->option}}</li>
					@endforeach	
				</ol>
			</div>
			@endif
		</div>	
		@endforeach
	</section>
</body>
</html>