<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    //
    public  $table = 'department';
    public $fillable = ['name','description','faculty_id'];
    public function Faculty()
    {
    	return $this->belongsTo('QuestGen\Faculty');
    }
    public function Courses()
    {
    	return $this->hasMany('QuestGen\Courses','department_id');
    }
    public function User()
    {
        return $this->hasMany('QuestGen\User','department_id');
    }
    public function Questions()
    {
        return $this->hasMany('QuestGen\Questions', 'department_id');
    }

}
