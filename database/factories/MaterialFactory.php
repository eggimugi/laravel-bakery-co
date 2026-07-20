<?php

namespace Database\Factories;

use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'material_name' => fake()->word(),
            'stock' => fake()->numberBetween(10, 100),
            'unit' => fake()->randomElement(['kg', 'gr', 'l', 'ml', 'item']),
            'material_type' => fake()->randomElement(['powder', 'solid', 'liquid']),
        ];
    }
}
