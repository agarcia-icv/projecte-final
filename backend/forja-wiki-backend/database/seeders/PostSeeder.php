<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\TipusEina;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $proteccio = TipusEina::where('nom', 'Proteccio')->first();
        $armes = TipusEina::where('nom', 'Armes')->first();
        $agricoles = TipusEina::where('nom', 'Eines agricoles')->first();
        $estris = TipusEina::where('nom', 'Estris varis')->first();
        $materials = TipusEina::where('nom', 'Materials')->first();
        $tecniques = TipusEina::where('nom', 'Tecniques')->first();

        Post::insert([
            [
                'titol' => 'Espasa de doble tall',
                'descripcio' => 'Espasa forjada en acer amb doble tall, equilibrada per combat. Inclou procés de trempat per augmentar la resistència.',
                'epoca' => 'Edat Mitjana',
                'imatge' => 'posts/espasa.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $armes->id,
            ],
            [
                'titol' => 'Trident de pesca',
                'descripcio' => 'Eina amb tres puntes afilades utilitzada per a la pesca en aigües poc profundes.',
                'epoca' => 'Antiguitat',
                'imatge' => 'posts/trident.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $armes->id,
            ],
            [
                'titol' => 'Escut metàl·lic reforçat',
                'descripcio' => 'Escut de ferro amb reforços laterals per resistir impactes en combat.',
                'epoca' => 'Edat Mitjana',
                'imatge' => 'posts/escut.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $proteccio->id,
            ],
            [
                'titol' => 'Armadura completa',
                'descripcio' => 'Conjunt de protecció corporal format per plaques metàl·liques articulades.',
                'epoca' => 'Edat Mitjana',
                'imatge' => 'posts/armadura.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $proteccio->id,
            ],
            [
                'titol' => 'Falç agrícola',
                'descripcio' => 'Eina corba utilitzada per segar cereals i herba.',
                'epoca' => 'Tradicional',
                'imatge' => 'posts/falc.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $agricoles->id,
            ],
            [
                'titol' => 'Aixada de ferro',
                'descripcio' => 'Instrument robust per treballar la terra i preparar el sòl.',
                'epoca' => 'Tradicional',
                'imatge' => 'posts/aixada.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $agricoles->id,
            ],
            [
                'titol' => 'Ganivet de cuina forjat',
                'descripcio' => 'Ganivet artesanal amb fulla d’acer d’alta qualitat, ideal per cuina professional.',
                'epoca' => 'Contemporània',
                'imatge' => 'posts/ganivet.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $estris->id,
            ],
            [
                'titol' => 'Ferradures',
                'descripcio' => 'Peces metàl·liques corbades utilitzades per protegir les peülles dels cavalls.',
                'epoca' => 'Tradicional',
                'imatge' => 'posts/ferradura.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $estris->id,
            ],
            [
                'titol' => 'Lingot de ferro',
                'descripcio' => 'Bloc de ferro utilitzat com a matèria primera per a la forja.',
                'epoca' => 'General',
                'imatge' => 'posts/lingot.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $materials->id,
            ],
            [
                'titol' => 'Carbó vegetal per forja',
                'descripcio' => 'Combustible tradicional utilitzat per assolir altes temperatures a la fornal.',
                'epoca' => 'Tradicional',
                'imatge' => 'posts/carbo.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $materials->id,
            ],
            [
                'titol' => 'Tècnica del trempat',
                'descripcio' => 'Refredament ràpid del metall calent per augmentar la seva duresa.',
                'epoca' => 'General',
                'imatge' => 'posts/trempat.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $tecniques->id,
            ],
            [
                'titol' => 'Tècnica del martelleig',
                'descripcio' => 'Procés de donar forma al metall mitjançant cops repetits amb martell.',
                'epoca' => 'General',
                'imatge' => 'posts/martelleig.jpg',
                'user_id' => 1,
                'tipus_eina_id' => $tecniques->id,
            ],
        ]);
    }
}