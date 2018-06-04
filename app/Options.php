<?php

namespace QuestGen;

use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    public $table = 'options';
    public $fillable = ['option']; 

    public function Questions()
    {
    	return $this->belongsTo('QuestGen\Questions','questions_id');
    }
}
