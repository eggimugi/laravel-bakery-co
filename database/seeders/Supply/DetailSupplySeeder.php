<?php

namespace Database\Seeders\Supply;

use App\Models\DetailSupply;
use App\Models\Material;
use App\Models\Supply;
use Illuminate\Database\Seeder;

class DetailSupplySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $supplies = Supply::all();
        $materials = Material::all();

        foreach ($supplies as $supply) {
            $randomMaterials = $materials->random(rand(2, 4));

            foreach ($randomMaterials as $material) {
                DetailSupply::factory(rand(1, 5))->create([
                    'supply_id' => $supply->id,
                    'material_id' => $material->id,
                ]);
            }
        }
    }
}
