<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctors>
 */
class DoctorsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'about' => fake()->name(),
            'hourly_rate' => 10,
            'degree' => fake()->name(),
            'specialization' => fake()->name(),
            'user_id' =>2
        ];
    }
}
