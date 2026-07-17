<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'cake' => [
                'view',
                'create',
                'update',
                'delete',
            ],

            'material' => [
                'view',
                'create',
                'update',
                'delete',
            ],

            'composition' => [
                'view',
                'create',
                'update',
                'delete',
            ],

            'production' => [
                'view',
                'create',
                'update',
                'cancel',
            ],

            'supplier' => [
                'view',
                'create',
                'update',
                'delete',
            ],

            'supply' => [
                'view',
                'create',
                'update',
                'cancel',
            ],

            'order' => [
                'view',
                'create',
                'update',
                'cancel',
            ],

            'user' => [
                'view',
                'create',
                'update',
                'delete',
            ],
        ];

        foreach ($permissions as $resource => $actions) {
            foreach ($actions as $action) {
                Permission::firstOrCreate([
                    'name' => "{$resource}.{$action}",
                    'guard_name' => 'web',
                ]);
            }
        }

        $owner = Role::firstOrCreate([
            'name' => 'owner',
        ]);

        $manager = Role::firstOrCreate([
            'name' => 'manager',
        ]);

        $cashier = Role::firstOrCreate([
            'name' => 'cashier',
        ]);

        $customer = Role::firstOrCreate([
            'name' => 'customer',
        ]);

        $owner->syncPermissions(Permission::all());

        $manager->syncPermissions(
            Permission::whereNotLike('name', 'user.%')->get()
        );

        $cashier->syncPermissions([
            'cake.view',

            'composition.view',

            'order.view',
            'order.create',
            'order.update',
            'order.cancel',
        ]);

        $customer->syncPermissions([
            'cake.view',

            'composition.view',

            'order.view',
            'order.create',
            'order.cancel',
        ]);
    }
}
