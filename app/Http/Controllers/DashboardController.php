<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
	function __construct()
	{
		$this->middleware('auth');
	}
    public function index()
    {
    	return view('body.dashboard');
    }
}
