<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comentari;
use App\Models\Valoracio;
use App\Models\TipusEina;

class Valoracio extends Model
{
    use HasFactory;

    protected $table = 'valoracions';

    protected $fillable = [
        'puntuacio',
        'user_id',
        'post_id'
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}