<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Post;
use App\Models\Comentari;
use App\Models\Valoracio;
use App\Models\TipusEina;

class Comentari extends Model
{
    protected $fillable = [
        'contingut',
        'user_id',
        'post_id',
        'parent_id',
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comentari::class, 'parent_id');
    }
    
    public function replies()
    {
        return $this->hasMany(Comentari::class, 'parent_id');
    }

    public function deleteWithChildren()
    {
        foreach ($this->replies as $reply) {
            $reply->deleteWithChildren();
        }

        $this->delete();
    }
    }
