<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Neuroticism extends Model
{
    use HasFactory;
    protected $fillable=[
        'anxiety',
        'anger',
        'depression',
        'self_consciousness',
        'immoderation',
        'vulnerability'
    ];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
