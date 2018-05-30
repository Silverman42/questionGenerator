<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Questions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->text('question');
            $table->string('difficulty');
            $table->integer('department_level',false,5);
            $table->string('question_type');
            $table->string('illustration')->nullable();
            $table->string('answer');
            $table->integer('academic_session',false,5);
            $table->integer('course_id',false)->unsigned();
            $table->integer('faculty_id',false)->unsigned();
            $table->string('status');
            $table->integer('department_id',false)->unsigned();
            $table->timestamps();
        });
        Schema::table('questions', function (Blueprint $table) {
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('department_id')->references('id')->on('department');
            $table->foreign('faculty_id')->references('id')->on('faculty');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
