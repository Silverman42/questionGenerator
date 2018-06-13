<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateGeneratedQuestions1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('generated_questions', function(Blueprint $table) {
            $table->dropColumn(['file_directory','status']);
        });
        Schema::table('generated_questions', function(Blueprint $table) {
            $table->string('question_type',100)->default('Theory');
            $table->integer('department_level',false)->default('100');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('generated_questions', function(Blueprint $table) {
            $table->dropColumn(['question_type','department_level']);
        });
        Schema::table('generated_questions', function(Blueprint $table) {
            $table->string('file_directory',100)->nullable();
            $table->string('status',100)->nullable();
        });
    }
}
