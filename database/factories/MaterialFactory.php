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
        $materials = [
            [
                'material_name' => 'Flour',
                'material_price' => 10000,
                'stock' => 100,
                'unit' => 'kg',
                'material_type' => 'powder',
            ],
            [
                'material_name' => 'Sugar',
                'material_price' => 8000,
                'stock' => 200,
                'unit' => 'kg',
                'material_type' => 'powder',
            ],
            [
                'material_name' => 'Butter',
                'material_price' => 15000,
                'stock' => 50,
                'unit' => 'kg',
                'material_type' => 'solid',
            ],
            [
                'material_name' => 'Eggs',
                'material_price' => 2000,
                'stock' => 300,
                'unit' => 'pcs',
                'material_type' => 'solid',
            ],
            [
                'material_name' => 'Milk',
                'material_price' => 12000,
                'stock' => 80,
                'unit' => 'liter',
                'material_type' => 'liquid',
            ]
        ];

        $material = fake()->randomElement($materials);

        return [
            'material_name' => $material['material_name'],
            'material_price' => $material['material_price'],
            'stock' => $material['stock'],
            'unit' => $material['unit'],
            'material_type' => $material['material_type'],
        ];
    }
}
