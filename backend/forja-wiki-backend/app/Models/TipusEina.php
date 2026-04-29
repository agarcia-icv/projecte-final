<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipusEina extends Model
{
    protected $table = 'tipus_eines';

    public $timestamps = false;

    protected $fillable = ['nom'];
}