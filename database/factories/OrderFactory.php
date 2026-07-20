<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id'),
            'order_date' => fake()->dateTimeBetween('-1 month', 'now'),
            'status' => fake()->randomElement(['processing', 'completed']),
            'cancelled_at' => null,
        ];
    }
}
