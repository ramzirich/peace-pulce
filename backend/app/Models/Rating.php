<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable=['doctor_id', 'rating'];
    public function user(){
        return $this->belongsTo(User::class, 'patient_id');
    }
}
