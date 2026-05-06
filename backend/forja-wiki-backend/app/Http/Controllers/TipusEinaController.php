<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipusEina;

class TipusEinaController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TipusEina::all()
        ]);
    }
}
