<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AccommodationType;

class AccommodationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //AccommodationType::factory()->count(5)->create();

        $accommodationTypes = [
            ['naziv' => 'stan', 'created_at' => now(), 'updated_at' => now()],
            ['naziv' => 'kuca', 'created_at' => now(), 'updated_at' => now()],
            ['naziv' => 'apartman', 'created_at' => now(), 'updated_at' => now()]
        ];

        foreach ($accommodationTypes as $type) {
            AccommodationType::create($type);
        }
    }
}
