<?php
namespace QuestGen\AppEntities;

use QuestGen\AppEntities\Entities;
use QuestGen\Departments as DepartmentModel;
use Illuminate\Support\Facades\Auth;

/**
 *	Fetch, insert and search data for Department entity
 */

class Departments implements Entities
{
	/**
	 *	Fetch all Department data from storage 
	 *  return Questgen\Department
	 */
	public function fetchAllData(){
		return DepartementModel::all();
	}

	/**
	 *	Fetch some Department data from storage using id of external entities (eg Faculty_id)
	 *  return Questgen\Department
	 */
	public function fetchDataByExternalEntityId(int $external_id){
		return DepartmentModel::where('faculty_id',$external_id)->get();
	}

	/**
	 *	Fetch some Department data from storage using authorised user data 
	 *  return Questgen\Department
	 */
	public function fetchDataByAuthUser(){
		$department_id = Auth::user()->department_id;
		$department = DepartmentModel::where('id',$department_id)->get();
		return $department;
	}
}