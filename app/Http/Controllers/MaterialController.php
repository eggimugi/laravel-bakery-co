<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::all();

        $stats = [
            'totalMaterials' => $materials->count(),
            'liquid' => $materials->where('material_type', 'liquid')->count(),
            'powder' => $materials->where('material_type', 'powder')->count(),
            'solid' => $materials->where('material_type', 'solid')->count(),
        ];

        return Inertia::render('materials/index', [
            'materials' => $materials,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $materials = Material::all();

        $stats = [
            'totalMaterials' => $materials->count(),
            'liquid' => $materials->where('material_type', 'liquid')->count(),
            'powder' => $materials->where('material_type', 'powder')->count(),
            'solid' => $materials->where('material_type', 'solid')->count(),
        ];

        return Inertia::render('materials/add-material', [
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_name' => 'required|string|max:255',
            'unit' => 'required|string|in:item,gr,kg,ml,l',
            'material_type' => 'required|string|in:liquid,powder,solid',
        ]);

        Material::create($validated);

        return redirect()->route('materials.index')->with('success', 'Material created successfully.');
    }

    public function edit(Material $material)
    {
        $materials = Material::all();

        $stats = [
            'totalMaterials' => $materials->count(),
            'liquid' => $materials->where('material_type', 'liquid')->count(),
            'powder' => $materials->where('material_type', 'powder')->count(),
            'solid' => $materials->where('material_type', 'solid')->count(),
        ];

        return Inertia::render('materials/edit-material', [
            'material' => $material,
            'stats' => $stats,
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $validated = $request->validate([
            'material_name' => 'sometimes|string|max:255',
            'unit' => 'sometimes|string|in:item,gr,kg,ml,l',
            'material_type' => 'sometimes|string|in:liquid,powder,solid',
        ]);

        $material->update($validated);

        return redirect()->route('materials.index')->with('success', 'Material updated successfully.');
    }

    public function destroy(Material $material)
    {
        $material->delete();

        return redirect()->route('materials.index')->with('success', 'Material deleted successfully.');
    }
}
