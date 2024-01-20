<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    use HasFactory;
    protected $fillable =['problem', 'severity', 'solution', 'ai_solution'];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    
}
