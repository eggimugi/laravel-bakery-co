<?php

namespace App\Http\Controllers;

use App\Http\Requests\Production\StoreRequest;
use App\Http\Requests\Production\UpdateRequest;
use App\Models\Cake;
use App\Models\Production;
use App\Services\ProductionService;
use Illuminate\Http\Request;

class ProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productions = Production::with(['user', 'cake'])
            ->when(request('search'), function ($query, $search) {
                $query->whereHas('cake', function ($q) use ($search) {
                    $q->where('cake_name', 'like', "%{$search}%");
                });
            })
            ->paginate(8)
            ->withQueryString();

        $stats = [
            'totalProductions' => Production::count(),
            'completed' => Production::whereNull('cancelled_at')->count(),
            'cancelled' => Production::whereNotNull('cancelled_at')->count(),
        ];

        return inertia('productions/production-history', [
            'productions' => $productions,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $cakes = Cake::select('id', 'cake_name')->get();
        $selectedCakeId = $request->integer('cake_id') ?: null;

        $stats = [
            'totalProductions' => Production::count(),
            'completed' => Production::whereNull('cancelled_at')->count(),
            'cancelled' => Production::whereNotNull('cancelled_at')->count(),
        ];

        return inertia('productions/add-production', [
            'cakes' => $cakes,
            'selectedCakeId' => $selectedCakeId,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, ProductionService $productionService)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;

        $productionService->produce($validated, $userId);

        return redirect()->route('productions.create')->with('success', 'Production recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Production $production)
    {
        $production->load(['user', 'cake']);

        return inertia('productions/show-production', [
            'production' => $production,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Production $production)
    {
        $production->load(['user', 'cake']);
        $stats = [
            'totalProductions' => Production::count(),
            'completed' => Production::whereNull('cancelled_at')->count(),
            'cancelled' => Production::whereNotNull('cancelled_at')->count(),
        ];

        return inertia('productions/edit-production', [
            'production' => $production,
            'stats' => $stats,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Production $production, ProductionService $productionService)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;

        $productionService->edit($production, $validated, $userId);

        return redirect()->route('productions.edit', $production)->with('success', 'Production updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Production $production, ProductionService $productionService)
    {
        $userId = $request->user()->id;

        $productionService->cancel($production, $userId);

        return redirect()->route('productions.index')->with('success', 'Production cancelled successfully.');
    }
}
