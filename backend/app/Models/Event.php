<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    Use SoftDeletes;
    protected $fillable = ["name", "description", "start_time", "end_time"];
    protected $dates = ["deleted_at"];
    protected $hidden = ["deleted_at"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
