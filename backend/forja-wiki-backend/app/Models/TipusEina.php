<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comentari;
use App\Models\Valoracio;
use App\Models\TipusEina;

class TipusEina extends Model
{
    use HasFactory;

    protected $table = 'tipus_eines';

    protected $fillable = [
        'nom'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'tipus_eina_id');
    }
}