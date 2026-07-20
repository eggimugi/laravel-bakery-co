<?php

namespace Database\Factories;

use App\Models\Cake;
use App\Models\DetailOrder;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DetailOrder>
 */
class DetailOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'cake_id' => Cake::factory(),
            'quantity' => fake()->numberBetween(1, 10),
        ];
    }
}
