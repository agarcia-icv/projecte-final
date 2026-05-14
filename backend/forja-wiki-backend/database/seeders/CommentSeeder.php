<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $users = DB::table('users')->pluck('id');
        $posts = DB::table('posts')->pluck('id');

        if ($users->isEmpty() || $posts->isEmpty()) {
            return;
        }

        $comments = [
            [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => null,
                'contingut' => "Molt bon article, molt ben explicat!",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => null,
                'contingut' => "Interessant, no coneixia aquesta tècnica.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => null,
                'contingut' => "Això és història pura de la forja!",
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => null,
                'contingut' => "M'agradaria veure més exemples pràctics.",
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('comentaris')->insert($comments);


        $parentComments = DB::table('comentaris')
            ->whereNull('parent_id')
            ->pluck('id');

     
        $replies = [];

        foreach ($parentComments as $commentId) {
            $replies[] = [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => $commentId,
                'contingut' => "Totalment d'acord amb això 🔥🔥🔥",
                'created_at' => $now,
                'updated_at' => $now,
            ];

            $replies[] = [
                'user_id' => $users->random(),
                'post_id' => $posts->random(),
                'parent_id' => $commentId,
                'contingut' => "Bona aportació, gràcies!",
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('comentaris')->insert($replies);
    }
}