<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['grad' => 'Pariz', 'drzava' => 'Francuska', 'putanja' => 'https://via.placeholder.com/640x480.png/007711?text=quidem', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Berlin', 'drzava' => 'Nemacka', 'putanja' => 'https://via.placeholder.com/640x480.png/007711?text=quidem', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Beograd', 'drzava' => 'Srbija', 'putanja' => 'https://via.placeholder.com/640x480.png/007711?text=quidem', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Madrid', 'drzava' => 'Spanija', 'putanja' => 'https://via.placeholder.com/640x480.png/007711?text=quidem', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Amsterdam', 'drzava' => 'Holandija', 'putanja' => 'https://via.placeholder.com/640x480.png/007711?text=quidem', 'created_at' => now(), 'updated_at' => now()]
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
