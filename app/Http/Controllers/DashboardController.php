<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;
use QuestGen\GeneratedQuestions as NQP;

class DashboardController extends Controller
{
	function __construct()
	{
		$this->middleware('auth');
	}
    public function index()
    {
    	//Fetch question papers
    	$question_papers = NQP::with(['courses','departments','faculty'])
            ->take(10)
            ->orderBy('id','DESC')
            ->get();
    	return view('body.dashboard')->with('question_papers',$question_papers);
    }
}
