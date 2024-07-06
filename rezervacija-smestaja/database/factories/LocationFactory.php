<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'grad' => $this->faker->word,
            'drzava' => $this->faker->word,
            'putanja' => $this->faker->imageUrl,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
