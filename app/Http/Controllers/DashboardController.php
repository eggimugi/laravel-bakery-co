<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $popularCakes = Cake::withCount('detailOrders as order_count')
            ->orderByDesc('order_count')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'popularCakes' => $popularCakes,
        ]);
    }
}
