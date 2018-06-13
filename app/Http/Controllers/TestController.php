<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;
use QuestGen\Questions;
use Barryvdh\DomPDF\Facade as PDF;

class TestController extends Controller
{
    public function index()
    {
    	return view('test');
    }

    public function create(Request $request)
    {
    	$questions = Questions::with(['options'])->where('question_type','MC')->inRandomOrder()->take(20)->get();
    	$question_to_array = $questions->toArray();
    	$question_id_array = array_map(function($question){ return $question['id'] ; }, $question_to_array);
    	$pdf = PDF::loadView('print',['questions'=>$questions]);
    	return $pdf->download('question_paper.pdf');
    	#return dd($request->post());
    }
}
