<?php

namespace Database\Factories;

use App\Models\Cake;
use App\Models\Composition;
use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Composition>
 */
class CompositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cake_id' => Cake::factory(),
            'material_id' => Material::factory(),
            'quantity' => fake()->numberBetween(1, 10),
        ];
    }
}
