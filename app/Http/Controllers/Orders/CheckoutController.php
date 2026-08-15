<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\Cake;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.cake_id' => ['required', 'integer', 'exists:cakes,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cakeIds = collect($validated['items'])
            ->pluck('cake_id');

        $cakes = Cake::whereIn('id', $cakeIds)->get();

        $items = collect($validated['items'])
            ->map(function ($item) use ($cakes) {
                $cake = $cakes->firstWhere('id', $item['cake_id']);

                return [
                    'id' => $cake->id,
                    'cake_name' => $cake->cake_name,
                    'cake_price' => $cake->cake_price,
                    'unit' => $cake->unit,
                    'quantity' => $item['quantity'],
                    'subtotal' => $cake->cake_price * $item['quantity'],
                ];
            });

        return Inertia::render('orders/checkout/page', [
            'items' => $items,
        ]);
    }
}
