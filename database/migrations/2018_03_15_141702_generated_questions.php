<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GeneratedQuestions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('generated_questions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('course_id',false)->unsigned();
            $table->integer('department_id',false)->unsigned();
            $table->integer('faculty_id',false)->unsigned();
            $table->string('unique_id')->unique();
            $table->integer('academic_session',false);
            $table->string('file_directory');
            $table->string('status');
            $table->string('question_id_array');
            $table->integer('question_count',false);
            $table->timestamps();
        });
        Schema::table('generated_questions', function (Blueprint $table) {
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('department_id')->references('id')->on('department');
            $table->foreign('faculty_id')->references('id')->on('department');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('generated_questions');
    }
}
