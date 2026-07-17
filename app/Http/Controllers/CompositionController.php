<?php

namespace App\Http\Controllers;

use App\Http\Requests\Composition\StoreRequest;
use App\Http\Requests\Composition\UpdateRequest;
use App\Models\Cake;
use App\Models\Composition;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompositionController extends Controller
{
    public function index(Request $request)
    {
        $cakes = Cake::with('compositions.material')
            ->when($request->search, function ($query, $search) {
                $query->where('cake_name', 'like', "%{$search}%")
                    ->orWhere('cake_flavour', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('compositions/index', [
            'cakes' => $cakes,
        ]);
    }

    public function show(Cake $cake)
    {
        return Inertia::render('compositions/show-composition', [
            'cake' => $cake->load([
                'compositions.material',
            ]),
        ]);
    }

    public function create(Cake $cake)
    {
        $materials = Material::select('id', 'material_name')->get();

        return Inertia::render('compositions/add-composition', [
            'cake' => $cake,
            'materials' => $materials,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            foreach ($validated['materials'] as $item) {
                Composition::create([
                    'cake_id' => $validated['cake_id'],
                    'material_id' => $item['material_id'],
                    'quantity' => $item['quantity'],
                ]);
            }
        });

        return redirect()->route('compositions.index')->with('success', 'Composition created successfully.');
    }

    public function edit(Cake $cake)
    {
        $cake = $cake->load(['compositions.material']);
        $materials = Material::select('id', 'material_name')->get();

        return Inertia::render('compositions/edit-composition', [
            'cake' => $cake,
            'materials' => $materials,
        ]);
    }

    public function update(UpdateRequest $request, Cake $cake)
    {
        $validated = $request->validate();

        DB::transaction(function () use ($validated, $cake) {
            $submittedIds = collect($validated['materials'])->pluck('id')->filter()->toArray();

            $cake->compositions()
                ->whereNotIn('id', $submittedIds)
                ->delete();

            foreach ($validated['materials'] as $item) {
                if (! empty($item['id'])) {
                    $cake->compositions()
                        ->whereKey($item['id'])
                        ->update([
                            'material_id' => $item['material_id'],
                            'quantity' => $item['quantity'],
                        ]);

                    continue;
                }

                $cake->compositions()->create([
                    'material_id' => $item['material_id'],
                    'quantity' => $item['quantity'],
                ]);
            }
        });

        return redirect()->route('compositions.index')->with('success', 'Composition updated successfully.');
    }

    public function destroy(Cake $cake)
    {
        $cake->compositions()->delete();

        return redirect()
            ->route('compositions.index')
            ->with('success', 'All compositions deleted successfully.');
    }
}
