<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    public $table = 'faculty';
    public $fillable = ['name','description'];
    public function Departments()
    {
    	return $this->hasMany('QuestGen\Departments');
    }
    public function User()
    {
    	return $this->hasMany('QuestGen\User','faculty_id');
    }
}
