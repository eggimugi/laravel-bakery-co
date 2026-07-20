<?php

namespace Database\Factories;

use App\Models\Cake;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cake>
 */
class CakeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cake_name' => fake()->word(),
            'cake_price' => fake()->numberBetween(35000, 180000),
            'stock' => fake()->numberBetween(5, 50),
            'unit' => fake()->randomElement(['piece', 'tray']),
            'cake_image' => fake()->imageUrl(640, 480, 'cakes', true),
            'best_before' => fake()->dateTimeBetween('now', '+10 days'),
            'cake_flavour' => fake()->word(),
        ];
    }
}
