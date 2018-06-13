<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class GeneratedQuestions extends Model
{
    public $table = 'generated_questions';
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
}
