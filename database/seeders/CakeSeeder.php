<?php

namespace Database\Seeders;

use App\Models\Cake;
use Illuminate\Database\Seeder;

class CakeSeeder extends Seeder
{
    public function run(): void
    {
        Cake::factory()->count(20)->create();
    }
}