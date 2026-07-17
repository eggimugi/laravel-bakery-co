<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\StoreRequest;
use App\Http\Requests\Order\UpdateRequest;
use App\Models\Cake;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'detailOrders.cake'])->paginate();

        return Inertia::render('orders/view-orders', [
            'orders' => Inertia::scroll(fn () => $orders),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cakes = Cake::paginate();

        return Inertia::render('orders/order', [
            'cakes' => Inertia::scroll(fn () => $cakes),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, OrderService $orderService)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;

        $orderService->createWithDetails($validated, $userId);

        return redirect()->route('orders.create')->with('success', 'Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'orderDetails.cake']);

        return Inertia::render('orders/show-order', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['user', 'orderDetails.cake']);

        return Inertia::render('orders/edit-order', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order, OrderService $orderService)
    {
        $userId = $request->user()->id;

        $orderService->updateWithDetails($order, $userId);

        return redirect()->route('orders.index', $order)->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Order $order, OrderService $orderService)
    {
        $userId = $request->user()->id;

        $orderService->cancelOrder($order, $userId);

        return redirect()->route('orders.index')->with('success', 'Order canceled successfully.');
    }
}
