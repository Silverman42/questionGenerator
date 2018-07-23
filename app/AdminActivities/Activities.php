<?php
namespace QuestGen\AdminActivities;

interface Activities{
	/*
	@description: Activity function for HOD 
	*/
	public function forHOD();

	/*
	@description: Activity function for Dean
	*/
	public function forDean();

	/*
	@description: Activity function for Lecturer 
	*/
	public function forLecturer();

	/*
	@description: Activity function for Admin
	*/
	public function forAdmin();
}