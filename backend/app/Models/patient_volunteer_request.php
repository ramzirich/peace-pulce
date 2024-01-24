<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class patient_volunteer_request extends Model 
{
    use HasFactory;
    protected $fillable =['patient_id', 'volunteer_id', 'request'];
    public $timestamps = true;
    public function user()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
    public function volunteer()
    {
        return $this->belongsTo(Volunteer::class, 'volunteer_id'); 
    }
}
