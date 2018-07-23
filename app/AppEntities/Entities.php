<?php
namespace QuestGen\AppEntities;

interface Entities{
	public function fetchAllData();
	public function fetchDataByExternalEntityId(int $external_id);
	public function fetchDataByAuthUser();
}