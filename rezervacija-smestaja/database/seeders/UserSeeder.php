<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = ['name' => 'Sara', 'email' => 'sara@gmail.com', 'password' => Hash::make('password'), 'role' => 'admin', 'email_verified_at' => now(), 'remember_token' => 'tokentoken'];

        User::factory()->count(5)->create();
        User::create($user);
    }
}
