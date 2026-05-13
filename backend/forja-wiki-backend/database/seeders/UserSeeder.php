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
                'password' => Hash::make('123456'),          
                'rol' => 'admin',
            ],
            [
                'name' => 'Adria',
                'email' => 'adria@gmail.com',
                'password' => Hash::make('123456'),          
                'rol' => 'admin',
            ],
            [
                'name' => 'Daniel',
                'email' => 'daniel@gmail.com',
                'password' => Hash::make('123456'),          
                'rol' => 'admin',
            ],
            [
                'name' => 'Editor',
                'email' => 'editor@gmail.com',
                'password' => Hash::make('123456'),           
                'rol' => 'editor',
            ],
            [
                'name' => 'Miquel',
                'email' => 'miquel@gmail.com',
                'password' => Hash::make('123456'),           
                'rol' => 'editor',
            ],
            [
                'name' => 'David',
                'email' => 'david@gmail.com',
                'password' => Hash::make('123456'),           
                'rol' => 'editor',
            ],
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => Hash::make('123456'),              
                'rol' => 'user',
            ],
            [
                'name' => 'Izan',
                'email' => 'izan@gmail.com',
                'password' => Hash::make('123456'),              
                'rol' => 'user',
            ],
            [
                'name' => 'Oscar',
                'email' => 'oscar@gmail.com',
                'password' => Hash::make('123456'),              
                'rol' => 'user',
            ],
        ]);
    }
}