<?php

namespace Database\Seeders\Cake;

use App\Models\Cake;
use Illuminate\Database\Seeder;

class CakeSeeder extends Seeder
{
    public function run(): void
    {
        Cake::factory(10)->create();
    }
}