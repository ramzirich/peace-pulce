<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Favorite_hobby extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable =['hobbies_id'];
    protected $hidden = ["deleted_at"];
    protected $dates = ['deleted_at'];
    public $timestamps = false;

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function hobby(){
        return $this->belongsTo(Hobby::class, 'hobbies_id');
    }
}
