<?php
namespace QuestGen\AdminActivities;

use QuestGen\AdminActivities\Activities;
use QuestGen\AppEntities\Entities;
use Illuminate\Support\Facades\Auth;
/**
 *	Fetch compartment data for each Administrator 
 */
class FetchCompartment implements Activities
{	
	public $entity;
	public $entity_id;
	public $entity_type;
	function __construct(Entities $entity,string $entity_type = null, int $entity_id = null)
	{
		$this->entity = $entity;
		$this->entity_id = $entity_id;
		$this->entity_type = $entity_type;
	}

	/**
	 * Check the for entity (faculty, department or course) data to be fetched for admin 
	 *	
	 * return QuestGen/Faculty | QuestGen/Departments | QuestGen/Courses 
	 */
	public function forAdmin()
	{
		switch ($this->entity_type) {
			case 'faculty':
				return $this->entity->fetchAllData();

			case 'course':
				return $this->entity->fetchDataByExternalEntityId($this->entity_id);

			case 'department':
				return $this->entity->fetchDataByExternalEntityId($this->entity_id);
			
		}
	}

	/**
	 * Check the for entity (faculty, department or course) data to be fetched for Dean 
	 *	
	 * return QuestGen/Faculty | QuestGen/Departments | QuestGen/Courses 
	 */
	public function forDean()
	{
		switch ($this->entity_type) {
			case 'faculty':
				return $this->entity->fetchDataByAuthUser();

			case 'course':
				return $this->entity->fetchDataByExternalEntityId($this->entity_id);

			case 'department':
				return $this->entity->fetchDataByExternalEntityId($this->entity_id);
			
		}
	}

	/**
	 * Check the for entity (faculty, department or course) data to be fetched for HOD 
	 *	
	 * return QuestGen/Faculty | QuestGen/Departments | QuestGen/Courses 
	 */
	public function forHOD()
	{
		switch ($this->entity_type) {
			case 'faculty':
				return $this->entity->fetchDataByAuthUser();

			case 'course':
				return $this->entity->fetchDataByExternalEntityId($this->entity_id);

			case 'department':
				return $this->entity->fetchDataByAuthUser();
			
		}
	}

	/**
	 * Check the for entity (faculty, department or course) data to be fetched for Lecturer
	 *	
	 * return QuestGen/Faculty | QuestGen/Departments | QuestGen/Courses 
	 */
	public function forLecturer()
	{
		switch ($this->entity_type) {
			case 'faculty':
				return $this->entity->fetchDataByAuthUser();

			case 'course':
				return $this->entity->fetchDataByAuthUser();

			case 'department':
				return $this->entity->fetchDataByAuthUser();;
			
		}
	}
	/**
	 * Check the role of authenticated user to determine which
	 * data is to be fetched
	 *	
	 * return QuestGen/Faculty | QuestGen/Departments | QuestGen/Courses 
	 */
	public function byRole()
	{
		$admin_role = Auth::user()->role;
		switch ($admin_role) {
			case 'admin':
				return $this->forAdmin();

			case 'dean':
				return $this->forDean();

			case 'hod':
				return $this->forHOD();

			case 'lecturer':
				return $this->forLecturer();	
		}
	}
}