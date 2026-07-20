<?php

namespace Database\Seeders\Supply;

use App\Models\Supplier;
use App\Models\Supply;
use Illuminate\Database\Seeder;

class SupplySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = Supplier::all();

        foreach ($suppliers as $supplier) {
            Supply::factory(rand(1, 3))->create([
                'supplier_id' => $supplier->id,
            ]);
        }
    }
}
