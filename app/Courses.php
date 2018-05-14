<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    public $table = 'courses';
    public $fillable = ['name','description','department_id','course_code'];
    public function Departments()
    {
    	return $this->belongsTo('QuestGen\Departments','department_id');
    }
}