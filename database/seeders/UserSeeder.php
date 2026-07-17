<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = User::firstOrCreate(
            [
                'email' => 'owner@mail.com',
            ],
            [
                'name' => 'Owner',
                'password' => 'password123',
            ]
        );

        $owner->assignRole('owner');

        $manager = User::firstOrCreate(
            [
                'email' => 'manager@mail.com',
            ],
            [
                'name' => 'Manager',
                'password' => 'password123',
            ]
        );

        $manager->assignRole('manager');

        $cashier = User::firstOrCreate(
            [
                'email' => 'cashier@mail.com',
            ],
            [
                'name' => 'Cashier',
                'password' => 'password123',
            ]
        );

        $cashier->assignRole('cashier');

        $customer = User::firstOrCreate(
            [
                'email' => 'customer@mail.com',
            ],
            [
                'name' => 'Customer',
                'password' => 'password123',
            ]
        );

        $customer->assignRole('customer');
    }
}
