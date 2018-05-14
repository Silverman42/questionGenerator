<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
    	return view('body.manage-admin');
    }
    public function view_deactivated()
    {
    	return view('body.restore-deactive-admin');
    }
}
