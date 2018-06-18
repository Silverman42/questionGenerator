<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    public $table = 'password_resets';

     public function setUpdatedAt($value){
        
     }
}
