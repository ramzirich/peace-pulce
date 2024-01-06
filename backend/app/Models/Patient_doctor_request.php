<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient_doctor_request extends Model
{
    use HasFactory;
    protected $fillable =['patient_id', 'doctor_id', 'request'];
    public $timestamps = true;
    public function user()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
    public function doctor()
    {
        return $this->belongsTo(Doctors::class, 'doctor_id')->with('user');
    }
}
