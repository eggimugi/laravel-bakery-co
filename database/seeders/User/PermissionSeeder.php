<?php

namespace Database\Seeders\User;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
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
    }
}
