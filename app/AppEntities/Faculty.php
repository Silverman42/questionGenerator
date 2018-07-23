<?php
namespace QuestGen\AppEntities;

use QuestGen\AppEntities\Entities;
use QuestGen\Faculty as FacultyModel;
use Illuminate\Support\Facades\Auth;

/**
 *	Fetch, insert and search data for Faculty entity
 */

class Faculty implements Entities
{
	/**
	 *	Fetch all Faculty data from storage 
	 *  return Questgen\Faculty
	 */
	public function fetchAllData(){
		return FacultyModel::all();
	}

	/**
	 *	Fetch some Faculty data from storage using 
	 *  return Questgen\Faculty
	 */
	public function fetchDataByExternalEntityId(int $external_id){

	}

	/**
	 *	Fetch some Faculty data from storage using authorised user data 
	 *  return Questgen\Faculty
	 */
	public function fetchDataByAuthUser(){
		$faculty_id = Auth::user()->faculty_id;
		$faculty = FacultyModel::where('id',$faculty_id)->get();
		return $faculty;
	}
}