<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => '123456',
                'rol' => 'admin',
            ],
            [
                'name' => 'Editor',
                'email' => 'editor@gmail.com',
                'password' => '123456',
                'rol' => 'editor',
            ],
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => '123456',
                'rol' => 'user',
            ],
        ]);
    }
}