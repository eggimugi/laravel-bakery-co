<?php

namespace Database\Seeders\Order;

use App\Models\Cake;
use App\Models\DetailOrder;
use App\Models\Order;
use Illuminate\Database\Seeder;

class DetailOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();
        $cakes = Cake::all();

        foreach ($orders as $order) {
            $randomCakes = $cakes->random(rand(1, 5));

            foreach ($randomCakes as $cake) {
                DetailOrder::factory(rand(1, 5))->create([
                    'order_id' => $order->id,
                    'cake_id' => $cake->id,
                ]);
            }
        }
    }
}
