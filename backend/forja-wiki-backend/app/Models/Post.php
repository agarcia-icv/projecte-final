<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comentari;
use App\Models\Valoracio;
use App\Models\TipusEina;

class Post extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comentaris() {
        return $this->hasMany(Comentari::class);
    }

    public function valoracions() {
        return $this->hasMany(Valoracio::class);
    }

    public function tipus() {
        return $this->belongsTo(TipusEina::class, 'tipus_eina_id');
    }
}
