<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'IndexController@index')->name('index');
Route::get('/recover-password', 'IndexController@password_recovery')->name('password_recovery');
Route::get('/dashboard','DashboardController@index')->name('dashboard');
//Courses Routes
Route::get('courses/search', 'CourseController@search')->name('courses.search');
Route::resource('/courses', 'CourseController')->only(['index','update','store','destroy']);
//Department Routes
Route::get('departments/search', 'DepartmentController@search')->name('department.search');
Route::resource('/departments', 'DepartmentController')->only(['index','update','store','destroy']);
//Department routes
Route::get('faculty/search', 'FacultyController@search')->name('faculty.search');
Route::resource('/faculty', 'FacultyController')->only(['index','update','store','destroy']);
//Batch Question generation routes
Route::resource('/generate-question-batch', 'GenerateQuestionBatchController');
// Question generation routes
Route::resource('/create-question', 'CreateQuestionController');
//Admin routes
Route::group(['prefix' => 'admin'], function() {
    Route::get('manage','AdminController@index');
    Route::get('restore-deactivated','AdminController@view_deactivated');
});
Auth::routes();
//Home
Route::get('/home', 'HomeController@index')->name('home');
