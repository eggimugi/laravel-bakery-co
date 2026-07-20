<?php

namespace Database\Seeders\User;

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
                'name' => 'Owner',
                'email' => 'owner@mail.com',
                'password' => 'password123',
            ],
        );
        $owner->assignRole('owner');

        User::factory(3)->create()->each(function ($user) {
            $user->assignRole('manager');
        });

        User::factory(6)->create()->each(function ($user) {
            $user->assignRole('cashier');
        });
    }
}
