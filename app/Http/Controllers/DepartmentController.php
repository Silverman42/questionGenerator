<?php

namespace QuestGen\Http\Controllers;

use QuestGen\Departments as Departments;
use QuestGen\Faculty as Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{   
    public $createSuccess = ""; //confirm a succesfull operation for creating new department
    public $createError = ""; //confirm an unsuccesfull operation for creating new department
    public $updateSuccess = ""; //confirm a succesfull operation for updating department
    public $updateError = ""; //confirm an unsuccesfull operation for updating department
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $faculty = Faculty::all();
        return view('body.department')->with('faculties',$faculty);
    }
    /**
     * Search the department model for a resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {   
        $search = $request->department;
        $paginate = $request->paginate * 10;
        if(empty($request->department)){
            $department = Departments::with('Faculty')->skip($paginate)->take(10)->orderBy('id','DESC')->get();    
        }
        else{
            $department = Departments::with('Faculty')->where('name','LIKE',"%{$search}%")->skip($paginate)->take(10)->orderBy('id','DESC')->get();
        }
        return response()->json($department);
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
         'name'=>'required|unique:department|string|max:50|regex:/(^[A-Za-z0-9 ]+$)+/',
         'description'=>'nullable|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'faculty_id'=>'integer'
        ]);
        Departments::create($request->all());
        $this->createSuccess = 'Department successfully created';
        return response()->json($this->createSuccess);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $departments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $departments)
    {
        $validator = $request->validate([
         'name'=>'required|unique:department,name,'.$departments.'|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'description'=>'nullable|string|max:100|regex:/(^[A-Za-z0-9 ]+$)+/',
         'faculty_id'=>'integer'
        ]);
        $department = Departments::where('id',$departments)->update([
            'name'=>$request->name,
            'description'=>$request->description,
            'faculty_id'=>$request->faculty_id
        ]);  
             $this->createSuccess = 'Department successfully updated';
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
     * fetches all departments from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch()
    {
        
    }
}
