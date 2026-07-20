<?php

namespace Database\Factories;

use App\Models\DetailSupply;
use App\Models\Material;
use App\Models\Supply;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DetailSupply>
 */
class DetailSupplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supply_id' => Supply::factory(),
            'material_id' => Material::factory(),
            'material_price' => fake()->randomFloat(2, 1, 100),
            'quantity' => fake()->numberBetween(1, 50),
        ];
    }
}
