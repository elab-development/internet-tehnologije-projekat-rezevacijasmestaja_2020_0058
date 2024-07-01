<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = $this->faker->dateTimeBetween('now', '+1 month');
        $checkOut = $this->faker->dateTimeBetween($checkIn, '+2 month');

        return [
            'datumPrijave' => $checkIn,
            'datumOdjave' => $checkOut,
            'brojOsoba' => $this->faker->numberBetween(1, 10),
            'userID' => $this->faker->numberBetween(6,10),
            'smestajID' => $this->faker->numberBetween(6,10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
