<?php

namespace App\Http\Controllers;

use App\Http\Requests\Supply\StoreRequest;
use App\Http\Requests\Supply\UpdateRequest;
use App\Models\Material;
use App\Models\Supplier;
use App\Models\Supply;
use App\Services\SupplyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $supplies = Supply::with(['user', 'supplier', 'detailSupplies.material'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('supplier', function ($q) use ($search) {
                    $q->where('supplier_name', 'like', "%{$search}%");
                });
            })
            ->paginate(8)
            ->withQueryString();

        $stats = [
            'totalSupplies' => Supply::count(),
            'completed' => Supply::whereNotNull('cancelled_at')->count(),
            'cancelled' => Supply::whereNull('cancelled_at')->count(),
        ];

        return Inertia::render('supplies/index', [
            'supplies' => $supplies,
            'filters' => $request->only(['search']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $suppliers = Supplier::select('id', 'supplier_name')->get();
        $materials = Material::select('id', 'material_name')->get();
        $stats = [
            'totalSupplies' => Supply::count(),
            'completed' => Supply::whereNotNull('cancelled_at')->count(),
            'cancelled' => Supply::whereNull('cancelled_at')->count(),
        ];

        return Inertia::render('supplies/add-supply', [
            'suppliers' => $suppliers,
            'materials' => $materials,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, SupplyService $supplyService)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;

        $supplyService->createWithDetails($validated, $userId);

        return redirect()->route('supplies.create')->with('success', 'Supply created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Supply $supply)
    {
        $supply->load(['user', 'supplier', 'detailSupplies.material']);

        return Inertia::render('supplies/show-supply', [
            'supply' => $supply,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supply $supply)
    {
        $supply->load(['user', 'supplier', 'detailSupplies.material']);
        $suppliers = Supplier::select('id', 'supplier_name')->get();
        $materials = Material::select('id', 'material_name')->get();
        $stats = [
            'totalSupplies' => Supply::count(),
            'completed' => Supply::whereNotNull('cancelled_at')->count(),
            'cancelled' => Supply::whereNull('cancelled_at')->count(),
        ];

        return Inertia::render('supplies/edit-supply', [
            'supply' => $supply,
            'suppliers' => $suppliers,
            'materials' => $materials,
            'stats' => $stats,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Supply $supply, SupplyService $supplyService)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;

        $supplyService->updateWithDetails($supply, $validated, $userId);

        return redirect()->route('supplies.edit', ['supply' => $supply->id])->with('success', 'Supply updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Supply $supply, SupplyService $supplyService)
    {
        $userId = $request->user()->id;
        $supplyService->cancelSupply($supply, $userId);

        return redirect()->route('supplies.index')->with('success', 'Supply cancelled successfully.');
    }
}
