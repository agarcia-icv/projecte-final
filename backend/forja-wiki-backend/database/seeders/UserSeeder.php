<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123456'),          'rol' => 'admin',
            ],
            [
                'name' => 'Editor',
                'email' => 'editor@gmail.com',
                'password' => Hash::make('123456'),           'rol' => 'editor',
            ],
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => Hash::make('123456'),              'rol' => 'user',
            ],
        ]);
    }
}