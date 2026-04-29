<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipusEina;

class TipusEinaSeeder extends Seeder
{
    public function run(): void
    {
        $tipus = [
            'Proteccio',
            'Armes',
            'Eines agricoles',
            'Estris varis',
            'Materials',
            'Tecniques'
        ];

        foreach ($tipus as $nom) {
            TipusEina::updateOrCreate(
                ['nom' => $nom],
                ['nom' => $nom]
            );
        }
    }
}