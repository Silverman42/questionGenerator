<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;
use QuestGen\Faculty as Faculty;
use QuestGen\Departments as Department;
use QuestGen\Courses as Course;

class FetchController extends Controller
{
    /*
	* @description: Controller to fetch data
    */
    public function faculty(Request $request)
    {
    	$faculty = Faculty::all();
    	return response()->json($faculty);
    }
    public function department(Request $request)
    {
    	if ($request->has('sid')) {
    		$request->validate([
    			'sid'=>'integer'
    		]);
    		$department = Department::where('faculty_id',$request->sid)->get();
    		return response()->json($department);
    	}
    }
    public function course(Request $request)
    {
    	if ($request->has('sid')) {
    		$request->validate([
    			'sid'=>'integer'
    		]);
    		$course = Course::where('department_id',$request->sid)->get();
    		return response()->json($course);
    	}
    }
}
