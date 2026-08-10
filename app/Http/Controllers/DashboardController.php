<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use App\Models\StockMovement;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $popularCakes = Cake::withCount('detailOrders as orders_count')
            ->orderByDesc('orders_count')
            ->take(5)
            ->get();

        $topStaff = User::role(['manager', 'cashier'])
            ->with('roles')
            ->withCount('orders as orders_count')
            ->orderByDesc('orders_count')
            ->take(4)
            ->get();

        $allCakes = Cake::all();

        $stockMovements = StockMovement::with('user:id,name')
            ->with('stockable') // tidak perlu morphWith kalau cuma butuh field dasar
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'popularCakes' => $popularCakes,
            'topStaff' => $topStaff,
            'stockMovements' => $stockMovements,
            'allCakes' => $allCakes,
        ]);
    }
}
