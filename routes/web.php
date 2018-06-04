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
//Faculty routes
Route::get('faculty/search', 'FacultyController@search')->name('faculty.search');
Route::resource('/faculty', 'FacultyController')->only(['index','update','store','destroy']);
//Data Fetch routes
Route::get('fetch/faculty', 'FetchController@faculty');
Route::get('fetch/department', 'FetchController@department');
Route::get('fetch/course', 'FetchController@course');

//Batch Question generation routes
Route::resource('/generate-question-batch', 'GenerateQuestionBatchController');

// Question generation routes
Route::get('/question/search', 'CreateQuestionController@search')->name('question.search');
Route::get('/option/fetch/{id}', 'CreateQuestionController@fetch_option');
Route::put('question/update/class/{id}','CreateQuestionController@update_question_class');
Route::put('question/update/illustration/{id}','CreateQuestionController@update_question_illust');
Route::put('question/update/type/{id}','CreateQuestionController@update_question_type');
Route::resource('/question', 'CreateQuestionController')->only(['index','update','store','destroy']);

//Admin routes
Route::group(['prefix' => 'admin'], function() {
    Route::get('manage','AdminController@index');
    Route::get('restore-deactivated','AdminController@view_deactivated');
    Route::post('create','AdminController@create')->name('admin.create');
    Route::get('create','AdminController@search')->name('admin.search');
    Route::get('fetch-deactivated','AdminController@search_deactivated')->name('admin.search.deactivated');
    Route::put('update/{id}', 'AdminController@update')->name('admin.update');
    Route::put('update-avatar/{id}', 'AdminController@update_avatar')->name('admin.update.avatar');
    Route::put('update-role/{id}', 'AdminController@update_role')->name('admin.update.role');
    Route::put('update-pass/{id}', 'AdminController@update_password')->name('admin.update.pass');
    Route::put('deactivate/{id}', 'AdminController@deactivate')->name('admin.deactivate');
    Route::put('activate/{id}', 'AdminController@activate')->name('admin.activate');
});

//Home
Route::get('/home', 'HomeController@index')->name('home');

//Authentication
Route::post('/login', 'Auth\LoginController@login')->middleware('guest')->name('login');
Route::get('/logout', 'Auth\LoginController@logout')->middleware('auth')->name('logout');
Route::get('/test/page',function()
{
	return view('test');
});
Route::post('/test/',function()
{
	return dd(request()->post());
});
