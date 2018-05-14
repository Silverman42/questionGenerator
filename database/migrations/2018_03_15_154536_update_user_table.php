<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('role')->default('admin');
            $table->string('course')->nullable();
            $table->string('avatar')->default('avatar.png');
            $table->string('department')->nullable();
            $table->string('faculty')->nullable();
            $table->integer('department_id',false)->nullable()->unsigned();
            $table->integer('course_id',false)->nullable()->unsigned();
            $table->integer('faculty_id',false)->nullable()->unsigned();
            $table->softDeletes();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('department');
            $table->foreign('course_id')->references('id')->on('courses');
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
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_course_id_foreign');
            $table->dropForeign('users_department_id_foreign');
            $table->dropForeign('users_faculty_id_foreign');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role','course','avatar','department','department_id','course_id','faculty_id');
        });
    }
}
