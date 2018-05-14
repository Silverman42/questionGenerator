<?php

namespace QuestGen\Http\Controllers;

use Illuminate\Http\Request;
use QuestGen\Faculty as Faculty;
class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('body.faculty');
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
         'name'=>'required|unique:faculty|string|max:100',
         'description'=>'nullable|string|max:200',
        ]);
        Faculty::create($request->all());
        $this->createSuccess = 'Faculty successfully created';
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
         'name'=>'required|unique:faculty,name,'.$id.'|string|max:100',
         'description'=>'nullable|string|max:100'
        ]);
        $department = Faculty::where('id',$id)->update([
            'name'=>$request->name,
            'description'=>$request->description,
        ]);  
        $this->createSuccess = 'Department successfully updated';
        return response()->json($this->createSuccess);
    }
    /**
     * search the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {   
        $search = $request->faculty;
        $paginate = $request->paginate * 10;
        if(empty($search)){
            $faculty = Faculty::skip($paginate)->take(10)->orderBy('id','DESC')->get();    
        }
        else{
            $faculty = Faculty::where('name','LIKE',"%{$search}%")->skip($paginate)->take(10)->orderBy('id','DESC')->get();
        }
        return response()->json($faculty);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
