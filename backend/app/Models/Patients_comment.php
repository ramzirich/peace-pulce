<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patients_comment extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable =['doctor_id', 'comment'];
    protected $hidden = ["deleted_at"];
    protected $dates = ['deleted_at'];

    public function user(){
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor(){
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
