<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    public $table = 'questions';
    public $fillable = ['question','faculty_id','department_id','course_id','department_level','question_type','academic_session','illustration'];

    public function Faculty()
    {
    	return $this->belongsTo('QuestGen\Faculty','faculty_id');
    }

    public function Departments()
    {
    	return $this->belongsTo('QuestGen\Departments','department_id');
    }

    public function Courses()
    {
    	return $this->belongsTo('QuestGen\Courses','course_id');
    }

    public function Options()
    {
    	return $this->hasMany('QuestGen\Options','questions_id');
    }
}
