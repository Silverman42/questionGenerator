<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    //
    public function index()
    {
    	return view('authentication.index');
    }
    public function password_recovery()
    {
    	return view('authentication.recover_password');
    }
}
