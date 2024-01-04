<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stress_cause extends Model
{
    use HasFactory;
    protected $fillable = ["name"];

    protected $hidden = ["deleted_at"];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
