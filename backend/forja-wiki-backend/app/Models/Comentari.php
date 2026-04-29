<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentari extends Model
{
public $timestamps = true;

protected $fillable = [
    'contingut',
    'user_id',
    'post_id',
    'parent_id'
];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

public function replies() {
    return $this->hasMany(Comentari::class, 'parent_id')->with('user');
}

    public function parent() {
        return $this->belongsTo(Comentari::class, 'parent_id');
    }
}