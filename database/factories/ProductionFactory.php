<?php

namespace Database\Factories;

use App\Models\Cake;
use App\Models\Production;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Production>
 */
class ProductionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::role(['owner', 'manager'])->inRandomOrder()->value('id'),
            'cake_id' => Cake::factory(),
            'quantity' => fake()->numberBetween(1, 10),
            'production_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'cancelled_at' => null,
        ];
    }

    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'cancelled_at' => fake()->dateTimeBetween($attributes['production_date'], 'now'),
        ]);
    }
}
