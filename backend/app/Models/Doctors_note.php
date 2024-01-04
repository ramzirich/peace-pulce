<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctors_note extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable =['patient_id', 'note'];
    protected $hidden = ["deleted_at"];
    protected $dates = ['deleted_at'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function patient(){
        return $this->belongsTo(User::class, 'patient_id');
    }
}