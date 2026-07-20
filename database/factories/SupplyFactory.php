<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\Supply;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Supply>
 */
class SupplyFactory extends Factory
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
            'supplier_id' => Supplier::inRandomOrder()->value('id'),
            'supply_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'cancelled_at' => null,
        ];
    }

    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'cancelled_at' => fake()->dateTimeBetween($attributes['supply_date'], 'now'),
        ]);
    }
}
