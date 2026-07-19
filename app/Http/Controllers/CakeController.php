<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use Inertia\Inertia;

class CakeController extends Controller
{
    public function index()
    {
        $cakes = Cake::all();
        $lessStockCakes = Cake::where('stock', '<=', 3)->get();

        return Inertia::render('cakes/index', [
            'cakes' => $cakes,
            'lessStockCakes' => $lessStockCakes,
        ]);
    }

    public function create()
    {
        $cakes = Cake::all();

        return Inertia::render('cakes/add-cake', [
            'cakes' => $cakes,
        ]);
    }

    public function store()
    {
        $validated = request()->validate([
            'cake_name' => 'required|string|max:255',
            'cake_price' => 'required|numeric|min:0',
            'unit' => 'required|string|in:piece,tray',
            'cake_image' => 'required|string',
            'best_before' => 'required|date|after_or_equal:today',
            'cake_flavour' => 'nullable|string',
        ]);

        $cake = Cake::create($validated);

        return redirect()->route('cakes.create');
    }

    public function edit(Cake $cake)
    {
        $totalCakes = Cake::count();

        return Inertia::render('cakes/edit-cake', [
            'cake' => $cake,
            'totalCakes' => $totalCakes,
        ]);
    }

    public function update(Cake $cake)
    {
        $validated = request()->validate([
            'cake_name' => 'sometimes|string|max:255',
            'cake_price' => 'sometimes|numeric|min:0',
            'unit' => 'sometimes|string|in:piece,tray',
            'cake_image' => 'sometimes|string',
            'best_before' => 'sometimes|date|after_or_equal:today',
            'cake_flavour' => 'sometimes|string',
        ]);

        $cake->update($validated);

        return redirect()->route('cakes.index');
    }

    public function destroy(Cake $cake)
    {
        $cake->delete();

        return redirect()->route('cakes.index')->with('success', 'Cake deleted successfully.');
    }
}
