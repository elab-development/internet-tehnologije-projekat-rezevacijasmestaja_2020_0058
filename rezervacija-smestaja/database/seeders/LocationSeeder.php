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
        //Location::factory()->count(5)->create();

        $locations = [
            ['grad' => 'Pariz', 'drzava' => 'Francuska', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Berlin', 'drzava' => 'Nemacka', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Beograd', 'drzava' => 'Srbija', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Madrid', 'drzava' => 'Spanija', 'created_at' => now(), 'updated_at' => now()],
            ['grad' => 'Amsterdam', 'drzava' => 'Holandija', 'created_at' => now(), 'updated_at' => now()]
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
