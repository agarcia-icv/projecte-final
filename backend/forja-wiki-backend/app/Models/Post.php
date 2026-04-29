<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'titol',
        'descripcio',
        'dataPost',
        'epoca',
        'imatge',
        'user_id',
        'tipus_eina_id'
    ];

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

    protected $casts = [
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
}