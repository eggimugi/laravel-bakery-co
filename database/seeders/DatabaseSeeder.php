<?php

namespace Database\Seeders;

use Database\Seeders\Cake\CakeSeeder;
use Database\Seeders\Cake\CompositionSeeder;
use Database\Seeders\Cake\MaterialSeeder;
use Database\Seeders\Cake\ProductionSeeder;
use Database\Seeders\Order\DetailOrderSeeder;
use Database\Seeders\Order\OrderSeeder;
use Database\Seeders\Supply\DetailSupplySeeder;
use Database\Seeders\Supply\SupplierSeeder;
use Database\Seeders\Supply\SupplySeeder;
use Database\Seeders\User\PermissionSeeder;
use Database\Seeders\User\RoleSeeder;
use Database\Seeders\User\UserSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,

            CakeSeeder::class,
            MaterialSeeder::class,
            SupplierSeeder::class,

            CompositionSeeder::class,
            ProductionSeeder::class,
            SupplySeeder::class,

            DetailSupplySeeder::class,
            OrderSeeder::class,
            DetailOrderSeeder::class,
        ]);
    }
}
