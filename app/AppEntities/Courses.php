<?php
namespace QuestGen\AppEntities;

use QuestGen\AppEntities\Entities;
use QuestGen\Courses as CourseModel;
use Illuminate\Support\Facades\Auth;

/**
 *	Fetch, insert and search data for Course entity
 */

class Courses implements Entities
{
	/**
	 *	Fetch all Course data from storage 
	 *  return Questgen\Course
	 */
	public function fetchAllData(){
		return CourseModel::all();
	}

	/**
	 *	Fetch some Course data from storage using id of external entities (eg department_id)
	 *  return Questgen\Course
	 */
	public function fetchDataByExternalEntityId(int $external_id){
		return CourseModel::where('department_id',$external_id)->get();
	}

	/**
	 *	Fetch some Course data from storage using authorised user data 
	 *  return Questgen\Course
	 */
	public function fetchDataByAuthUser(){
		$course_id = Auth::user()->course_id;
		$course = CourseModel::where('id',$course_id)->get();
		return $course;
	}
}