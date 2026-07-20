<?php

namespace Database\Seeders\User;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = Role::firstOrCreate(['name' => 'owner']);
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $cashier = Role::firstOrCreate(['name' => 'cashier']);

        $owner->syncPermissions(Permission::all());

        $manager->syncPermissions(
            Permission::whereNotLike('name', 'user.%')->get()
        );

        $cashier->syncPermissions([
            'cake.view',
            'order.view',
            'order.create',
            'order.update',
            'order.cancel',
        ]);
    }
}
