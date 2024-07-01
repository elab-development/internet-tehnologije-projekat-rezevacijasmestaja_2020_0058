<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Location;
use App\Models\AccommodationType;
use App\Models\Accommodation;
use App\Models\Reservation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            //LocationSeeder::class,
            //AccommodationTypeSeeder::class,
            //UserSeeder::class,
            //AccommodationSeeder::class,
            ReservationSeeder::class
        ]);
    }
}
