<?php

namespace Database\Seeders\Cake;

use App\Models\Cake;
use App\Models\Composition;
use App\Models\Material;
use Illuminate\Database\Seeder;

class CompositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cakes = Cake::all();
        $materials = Material::all();

        foreach ($cakes as $cake) {
            $randomMaterials = $materials->random(rand(2, 4));

            foreach ($randomMaterials as $material) {
                Composition::factory()->create([
                    'cake_id' => $cake->id,
                    'material_id' => $material->id,
                ]);
            }
        }
    }
}
