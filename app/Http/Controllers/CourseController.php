<?php

namespace QuestGen\Http\Controllers;

use QuestGen\Courses as Courses;
use QuestGen\Departments as Departments;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $departments = Departments::all();
        return view('body.courses')->with('departments',$departments);
    }

    /**
     * Search the department model for a resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {   
        $search = $request->course;
        $paginate = $request->paginate * 10;
        if(empty($search)){
            $courses = Courses::with('departments')->skip($paginate)->take(10)->orderBy('id','DESC')->get();    
        }
        else{
            $courses = Courses::with('departments')->where('name','LIKE',"%{$search}%")->skip($paginate)->take(10)->orderBy('id','DESC')->get();
        }
        return response()->json($courses);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate Inputs
        $validator = $request->validate([
         'name'=>'required|unique:courses|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'course_code'=>'required|string|max:10|regex:/(^[A-Za-z0-9 ]+$)+/',
         'description'=>'nullable|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'department_id'=>'integer'
        ]);
        Courses::create($request->all());
        $this->createSuccess = 'Department successfully created';
        return response()->json($this->createSuccess);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = $request->validate([
         'name'=>'required|unique:courses,name,'.$id.'|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'course_code'=>'required|unique:courses,course_code,'.$id.'|string|max:10|regex:/(^[A-Za-z0-9 ]+$)+/',
         'description'=>'nullable|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'department_id'=>'integer|required'
        ]);
        $course = Courses::where('id',$id)->update([
            'name'=>$request->name,
            'description'=>$request->description,
            'department_id'=>$request->department_id,
            'course_code'=>$request->course_code,
        ]);  
             $this->createSuccess = 'Course successfully updated';
        return response()->json($this->createSuccess);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \QuestGen\Departments  $departments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Departments $departments)
    {
        //
    }
    /**
     * fetches all courses from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch()
    {
        
    }
}
