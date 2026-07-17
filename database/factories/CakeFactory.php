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
        $cakes = [
            [
                'name' => 'Chocolate Cake',
                'flavour' => 'Chocolate',
                'image' => 'cakes/chocolate-cake.jpg',
            ],
            [
                'name' => 'Vanilla Cake',
                'flavour' => 'Vanilla',
                'image' => 'cakes/vanilla-cake.jpg',
            ],
            [
                'name' => 'Red Velvet Cake',
                'flavour' => 'Red Velvet',
                'image' => 'cakes/red-velvet.jpg',
            ],
            [
                'name' => 'Strawberry Cake',
                'flavour' => 'Strawberry',
                'image' => 'cakes/strawberry-cake.jpg',
            ],
            [
                'name' => 'Matcha Cake',
                'flavour' => 'Matcha',
                'image' => 'cakes/matcha-cake.jpg',
            ],
            [
                'name' => 'Cheesecake',
                'flavour' => 'Cheese',
                'image' => 'cakes/cheesecake.jpg',
            ],
            [
                'name' => 'Black Forest',
                'flavour' => 'Chocolate Cherry',
                'image' => 'cakes/black-forest.jpg',
            ],
            [
                'name' => 'Tiramisu',
                'flavour' => 'Coffee',
                'image' => 'cakes/tiramisu.jpg',
            ],
        ];

        $cake = fake()->randomElement($cakes);

        return [
            'cake_name' => $cake['name'],
            'cake_price' => fake()->numberBetween(35000, 180000),
            'stock' => fake()->numberBetween(5, 50),
            'unit' => 'pcs',
            'cake_image' => $cake['image'],
            'best_before' => fake()->dateTimeBetween('now', '+10 days'),
            'cake_flavour' => $cake['flavour'],
        ];
    }
}
