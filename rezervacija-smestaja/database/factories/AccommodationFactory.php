<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Accommodation>
 */
class AccommodationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brojKreveta = $this->faker->numberBetween(1, 10);
        return [
            'naziv' => $this->faker->name,
            'opis' => $this->faker->sentence,
            'lokacijaID' => $this->faker->numberBetween(1, 5),
            'adresa' => $this->faker->address,
            'brojKreveta' => $brojKreveta,
            'maksimalanBrojOsoba' => $brojKreveta,
            'cenaPoNoci' => $this->faker->randomFloat(2, 20, 1000),
            'udaljenostOdCentra' => $this->faker->randomFloat(2, 0.1, 10),
            'putanja' => $this->faker->imageUrl,
            'tipSmestajaID' => $this->faker->numberBetween(1, 3),
            'userID' => $this->faker->numberBetween(6, 10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
