<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\StoreRequest;
use App\Models\Cake;
use App\Models\DetailOrder;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = Order::with(['user', 'detailOrders.cake'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('detailOrders.cake', function ($q) use ($search) {
                    $q->where('cake_name', 'like', "%{$search}%");
                });
            })
            ->when($request->filter, function ($query, $filter) {
                match ($filter) {
                    'newest' => $query->orderBy('order_date', 'desc'),
                    'latest' => $query->orderBy('order_date', 'asc'),
                    'completed' => $query->where('status', 'completed'),
                    'processing' => $query->where('status', 'processing'),
                    'highest' => $query->orderByDesc(
                        DetailOrder::selectRaw('COALESCE(SUM(cakes.cake_price * detail_orders.quantity), 0)')
                            ->join('cakes', 'cakes.id', '=', 'detail_orders.cake_id')
                            ->whereColumn('detail_orders.order_id', 'orders.id')
                    )->orderBy('id', 'desc'),
                    default => null,
                };
            })
            ->paginate(6)
            ->withQueryString();

        $stats = [
            'totalOrder' => Order::count(),
            'completed' => Order::where('status', 'completed')->count(),
            'processing' => Order::where('status', 'processing')->count(),
        ];

        return Inertia::render('orders/view-orders', [
            'orders' => Inertia::scroll($orders),
            'filters' => $request->only(['search', 'filter']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cakes = Cake::paginate();

        $stats = [
            'totalCakes' => Cake::count(),
            'available' => Cake::where('stock', '>', 0)->count(),
            'unavailable' => Cake::where('stock', '=', 0)->count(),
        ];

        return Inertia::render('orders/order', [
            'cakes' => Inertia::scroll(fn () => $cakes),
            'stats' => $stats,
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
