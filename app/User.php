<?php

namespace QuestGen;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'users';
    protected $fillable = [
        'firstname','surname','email', 'password','avatar','department_id','faculty_id','course_id','role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    public function departments()
    {
        return $this->belongsTo('QuestGen\Departments','department_id');
    }
    public function faculty()
    {
        return $this->belongsTo('QuestGen\Faculty','faculty_id');
    }
    public function courses()
    {
        return $this->belongsTo('QuestGen\Courses','course_id');
    }
}
