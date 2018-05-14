<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
    	return view('body.dashboard');
    }
}
