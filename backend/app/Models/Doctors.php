<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctors extends Model
{
    use HasFactory;
    protected $fillable =['hourly_rate', 'rating', 'about', 'degree'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class);
    }
}
