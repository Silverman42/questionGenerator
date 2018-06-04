<?php

namespace QuestGen\Http\Controllers;

use QuestGen\GeneratedQuestions;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \QuestGen\GeneratedQuestions  $generatedQuestions
     * @return \Illuminate\Http\Response
     */
    public function show(GeneratedQuestions $generatedQuestions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \QuestGen\GeneratedQuestions  $generatedQuestions
     * @return \Illuminate\Http\Response
     */
    public function edit(GeneratedQuestions $generatedQuestions)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \QuestGen\GeneratedQuestions  $generatedQuestions
     * @return \Illuminate\Http\Response
     */
    public function destroy(GeneratedQuestions $generatedQuestions)
    {
        //
    }
}
