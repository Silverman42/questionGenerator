<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;
use QuestGen\AppEntities\Faculty as FacultyEntity;
use QuestGen\AppEntities\Departments as DepartmentEntity;
use QuestGen\AppEntities\Courses as CourseEntity;
use QuestGen\AdminActivities\FetchCompartment;

use QuestGen\Courses as Course;


class FetchController extends Controller
{   
    public function __construct()
    {
        $this->middleware('auth');
    }
    /*
	* @description: Controller to fetch data
    */
    public function faculty(Request $request)
    {
        $fetchData = new FetchCompartment(new FacultyEntity,'faculty');
    	$faculty = $fetchData->byRole();
    	return response()->json($faculty);
    }
    public function department(Request $request)
    {
        $fetchData = new FetchCompartment(new DepartmentEntity,'department',$request->sid);
        $department = $fetchData->byRole();
        return response()->json($department);
    }
    public function course(Request $request)
    {
        $fetchData = new FetchCompartment(new CourseEntity,'course',$request->sid);
        $course = $fetchData->byRole();
        return response()->json($course);
    }
}
