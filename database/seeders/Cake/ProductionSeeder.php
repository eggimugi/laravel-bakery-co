<?php

namespace Database\Seeders\Cake;

use App\Models\Cake;
use App\Models\Production;
use Illuminate\Database\Seeder;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cakes = Cake::all();

        foreach ($cakes as $cake) {
            Production::factory(rand(2, 5))->create([
                'cake_id' => $cake->id,
            ]);
        }
    }
}
