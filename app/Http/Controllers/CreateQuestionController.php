<?php

namespace QuestGen\Http\Controllers;

use QuestGen\Questions;
use QuestGen\Options;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CreateQuestionController extends Controller
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
        return view('body.create-questions');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $option_array = [];
        if ($request->question_type == 'MC') {
            $request->validate([
                'options'=>'required|array|min:1',
                'options.*'=>'required|string|distinct',
            ]);
        }
        $request->validate([
            'question'=>'required|string',
            'faculty_id'=>'integer|filled',
            'department_id'=>'integer|filled',
            'course_id'=>'integer|filled',
            'department_level'=>'integer|filled',
            'question_type'=> 'alpha|filled',
            'academic_session'=>'integer|max:2099|required',
            'question_illustration'=>'image|mimes:jpeg,png|max:100'
        ]);
        $illustration_url = request()->hasFile('question_illustration') ? request()->question_illustration->store('public/question_illustration') : null ;
        $illustration_url = str_replace('public', '/storage', $illustration_url);
        $question = Questions::create([
            'question'=> htmlspecialchars($request->question,ENT_COMPAT,'UTF-8'),
            'illustration'=> $illustration_url,
            'faculty_id'=> $request->faculty_id,
            'department_id'=> $request->department_id,
            'course_id'=> $request->course_id,
            'department_level'=> $request->department_level,
            'question_type'=> $request->question_type,
            'academic_session'=> $request->academic_session
        ]);
        if (!$question) {
            return response()->json('Question creation failed, please try again', 422);
        }
        if ($request->question_type == 'MC') {
            foreach ($request->options as $value) {
                $option_array[] = ['option' => htmlspecialchars($value,ENT_COMPAT,'UTF-8')];
            }
            $find_question = Questions::find($question->id);
            $find_question->options()->createMany($option_array);
        }
        return response()->json($illustration_url, 200);  
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'question'=>'required|string',
            'academic_session'=>'integer|max:2099|required',
            'department_level'=>'integer|required'
        ]);
        $question = Questions::find($id);
        $question->question = htmlspecialchars($request->question,ENT_COMPAT,'UTF-8');
        $question->academic_session = $request->academic_session;
        $question->department_level = $request->department_level;
        $question->save();
        return response()->json('Question data successfully updated',200);
    }

    /**
     * Update the question class structure in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update_question_class(Request $request, $id)
    {
        $request->validate([
            'faculty_id'=>'required|integer',
            'department_id'=>'integer|required',
            'course_id'=>'integer|required'
        ]);
        $question = Questions::find($id);
        $question->faculty_id = $request->faculty_id;
        $question->department_id = $request->department_id;
        $question->course_id = $request->course_id;
        $question->save();
        return response()->json('Question class structure successfully updated',200);
    }

    /**
     * Update the question class structure in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update_question_illust(Request $request, $id)
    {
        $request->validate([
            'question_illustration'=>'image|mimes:jpeg,png|max:100'
        ]);
        $question = Questions::find($id);
        if ($question->illustration !== null) {
            $illustration_url = str_replace('/storage', '/public', $question->illustration);
            Storage::delete([$illustration_url]);
        }
        $illustration_url = $request->hasFile('question_illustration') ? $request->question_illustration->store('public/question_illustration') : null ;
        $illustration_url = str_replace('public', '/storage', $illustration_url);
        $question->illustration = $illustration_url;
        $question->save();
        return response()->json('Question illustration successfully updated',200);
    }

    /**
     * Update the question type in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update_question_type(Request $request, $id)
    {
        $request->validate([
            'question_type'=>'alpha|required|in:MC,Theory'
        ]);
        if ($request->question_type == 'MC') {
            $request->validate([
                'options'=>'required|array|min:1',
                'options.*'=>'required|string|distinct',
            ]);
            Options::where('questions_id',$id)->delete();
            foreach ($request->options as $value) {
                $option_array[] = ['option' => htmlspecialchars($value,ENT_COMPAT,'UTF-8')];
            }
            $find_question = Questions::find($id);
            $find_question->options()->createMany($option_array);
        }
        if ($request->question_type == 'Theory') {
            Options::where('questions_id',$id)->delete();
        }
        $question = Questions::find($id);
        $question->question_type = $request->question_type;
        $question->save();
        return response()->json('Question type successfully updated',200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \QuestGen\Questions  $questions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Questions $questions)
    {
        //
    }

    /**
     * Search for the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->question;
        $paginate = $request->paginate * 10;
        if(empty($search)){
            $questions = Questions::with(['courses','departments','faculty'])
            ->skip($paginate)
            ->take(10)
            ->orderBy('id','DESC')
            ->get();    
        }
        else{
            $questions = Questions::with(['courses','departments','faculty'])
            ->where('question','LIKE',"%{$search}%")
            ->orWhere('question_type','LIKE',"%{$search}%")
            ->orWhere('academic_session','LIKE',"%{$search}%")
            ->orWhere('department_level','LIKE',"%{$search}%")
            ->skip($paginate)
            ->take(10)
            ->orderBy('id','DESC')
            ->get();
        }
        return response()->json($questions);
    }

    /**
     * Fetch question option from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function fetch_option($id)
    {
        $option = Options::where('questions_id', $id)->get();
        return response()->json($option);
    }
}
