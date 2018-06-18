<?php

namespace QuestGen\Http\Controllers;

use QuestGen\GeneratedQuestions as NQP; //New Question Paper
use Illuminate\Http\Request;
use QuestGen\Questions;
use Barryvdh\DomPDF\Facade as PDF;

class GenerateQuestionBatchController extends Controller
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
        return view('body.generate-question-batch');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'faculty_id' => 'integer|required',
            'department_id' => 'integer|required',
            'course_id' => 'integer|required',
            'question_count' => 'integer|required|max:200',
            'department_level' => 'integer|required|max:600',
            'academic_session' => 'integer|required',
            'question_type' => 'in:Theory,MC|string|required'
        ]);
        $questions = Questions::with(['options'])->whereNested(function($query) use ($request)
        {
            $query->where('faculty_id',$request->faculty_id);
            $query->where('department_id',$request->department_id);
            $query->where('course_id',$request->course_id);
            $query->where('department_level',$request->department_level);
            $query->where('question_type',$request->question_type);
            $query->where('academic_session',$request->academic_session);
        })
        ->inRandomOrder()->take($request->question_count)->get();
        $question_to_array = $questions->toArray();
        $question_id_array = array_map(function($question){ return $question['id'] ; }, $question_to_array);
        $array_to_string = (string) '';
        foreach ($question_id_array as $key => $id) {
            if($key == count($question_id_array) - 1){
                $array_to_string .= $id;
                continue;
            }
            $array_to_string .= $id.',';
        }
        $question_paper = new NQP;
        $question_paper->course_id = $request->course_id;
        $question_paper->faculty_id = $request->faculty_id;
        $question_paper->department_id = $request->department_id;
        $question_paper->unique_id = $request->academic_session.$request->course_id.str_random(6);
        $question_paper->academic_session = $request->academic_session;
        $question_paper->department_level = $request->department_level;
        $question_paper->question_type = $request->question_type;
        $question_paper->question_id_array = $array_to_string;
        $question_paper->question_count = count($question_id_array);
        $question_paper->save();
        return response()->json( $array_to_string, 200);
    }


    /**
     * Search for desired question paper
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->question_paper;
        $paginate = $request->paginate * 10;
        if(empty($search)){
            $questions = NQP::with(['courses','departments','faculty'])
            ->skip($paginate)
            ->take(10)
            ->orderBy('id','DESC')
            ->get();    
        }
        else{
            $questions = NQP::with(['courses','departments','faculty'])
            ->where('unique_id','LIKE',"%{$search}%")
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
     * Download Created Question paper.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  integer  $id
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request, $id)
    {
        $question_paper = NQP::with(['courses','departments','faculty'])->where('unique_id',$id)->first();
        if (isset($question_paper->question_id_array)) {
            $question_to_array = explode(',', $question_paper->question_id_array);
            $questions = Questions::with(['options'])->whereIn('id',$question_to_array)->get();
            $question_count = 1;
            $pdf = PDF::loadView('print',['questions'=>$questions,'question_details'=>$question_paper,'count' => $question_count]);
            return $pdf->download('question_paper.pdf');
        }
        return response('Does not exist',404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \QuestGen\GeneratedQuestions  $generatedQuestions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GeneratedQuestions $generatedQuestions)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  integer $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        NQP::where('unique_id',$id)->delete();
        return response()->json('success', 200);
    }
}
