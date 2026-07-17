<?php

namespace App\Services;

use App\Models\Cake;
use App\Models\Production;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ProductionService
{
    public function __construct(
        private StockMovementService $stockMovementService,
    ) {}

    /**
     * @param  array{cake_id: int, quantity: int, production_date: string}  $validated
     */
    public function produce(array $validated, int $userId)
    {
        DB::transaction(function () use ($validated, $userId) {
            $cake = Cake::with('compositions.material')->findOrFail($validated['cake_id']);

            if ($cake->compositions->isEmpty()) {
                throw ValidationException::withMessages([
                    'cake_id' => "This cake doesn't have a recipe (composition) yet, it can't be produced.",
                ]);
            }

            // Pre-check: kasih pesan error yang jelas & agregat ke user,
            // sebelum benar-benar mengubah data apa pun.
            $this->assertSufficientStock($cake, (int) $validated['quantity']);

            $production = Production::create([
                'user_id' => $userId,
                'cake_id' => $validated['cake_id'],
                'quantity' => $validated['quantity'],
                'production_date' => $validated['production_date'],
            ]);

            // Kurangi stok tiap material sesuai komposisi resep
            foreach ($cake->compositions as $composition) {
                $needed = $composition->quantity * $validated['quantity'];

                $this->stockMovementService->record(
                    stockable: $composition->material,
                    quantity: -$needed,
                    type: 'usage',
                    reference: $production,
                    note: "Used for producing {$cake->name} x{$validated['quantity']}",
                    userId: $userId,
                );
            }

            // Tambah stok cake hasil produksi
            $this->stockMovementService->record(
                stockable: $cake,
                quantity: $validated['quantity'],
                type: 'production',
                reference: $production,
                note: "Produced {$validated['quantity']} unit(s)",
                userId: $userId,
            );
        });
    }

    public function edit(Production $production, array $validated, int $userId)
    {
        DB::transaction(function () use ($production, $validated, $userId) {
            // Reversal stok lama
            $cake = Cake::with('compositions.material')->findOrFail($production->cake_id);
            foreach ($cake->compositions as $composition) {
                $needed = $composition->quantity * $production->quantity;

                $this->stockMovementService->record(
                    stockable: $composition->material,
                    quantity: $needed,
                    type: 'usage_reversal',
                    reference: $production,
                    note: "Reversal of usage for production ID {$production->id}",
                    userId: $userId,
                );
            }

            // Reversal stok cake lama
            $this->stockMovementService->record(
                stockable: $cake,
                quantity: -$production->quantity,
                type: 'production_reversal',
                reference: $production,
                note: "Reversal of production ID {$production->id}",
                userId: $userId,
            );

            // Update data produksi
            $production->update([
                'cake_id' => $validated['cake_id'],
                'quantity' => $validated['quantity'],
                'production_date' => $validated['production_date'],
            ]);

            // Tambah stok baru sesuai data produksi yang diupdate
            $newCake = Cake::with('compositions.material')->findOrFail($validated['cake_id']);
            foreach ($newCake->compositions as $composition) {
                $needed = $composition->quantity * $validated['quantity'];

                $this->stockMovementService->record(
                    stockable: $composition->material,
                    quantity: -$needed,
                    type: 'usage',
                    reference: $production,
                    note: "Used for producing {$newCake->name} x{$validated['quantity']}",
                    userId: $userId,
                );
            }

            // Tambah stok cake baru hasil produksi
            $this->stockMovementService->record(
                stockable: $newCake,
                quantity: $validated['quantity'],
                type: 'production',
                reference: $production,
                note: "Produced {$validated['quantity']} unit(s)",
                userId: $userId,
            );
        });
    }

    public function cancel(Production $production, int $userId)
    {
        DB::transaction(function () use ($production, $userId) {
            $cake = Cake::with('compositions.material')->findOrFail($production->cake_id);

            // Reversal stok material
            foreach ($cake->compositions as $composition) {
                $needed = $composition->quantity * $production->quantity;

                $this->stockMovementService->record(
                    stockable: $composition->material,
                    quantity: $needed,
                    type: 'usage_reversal',
                    reference: $production,
                    note: "Reversal of usage for production ID {$production->id}",
                    userId: $userId,
                );
            }

            // Reversal stok cake
            $this->stockMovementService->record(
                stockable: $cake,
                quantity: -$production->quantity,
                type: 'production_reversal',
                reference: $production,
                note: "Reversal of production ID {$production->id}",
                userId: $userId,
            );

            $production->update(['cancelled_at' => now()]);
        });
    }

    /**
     * Validasi kecukupan stok semua material sekaligus, dengan pesan
     * agregat per material yang kurang. Ini hanya "fast-fail" untuk UX —
     * pengaman sebenarnya tetap ada di StockMovementService::record()
     * lewat lockForUpdate() + pengecekan newStock < 0, karena antara
     * pengecekan ini dan proses insert bisa saja ada race condition
     * kalau ada request produksi lain berjalan bersamaan.
     */
    private function assertSufficientStock(Cake $cake, int $quantity): void
    {
        $shortages = [];

        foreach ($cake->compositions as $composition) {
            $needed = $composition->quantity * $quantity;
            $material = $composition->material;

            if ($material->stock < $needed) {
                $shortages[] = "{$material->material_name}: need {$needed}{$material->unit}, remaining {$material->stock}{$material->unit}";
            }
        }

        if (! empty($shortages)) {
            throw ValidationException::withMessages([
                'quantity' => 'Stock is insufficient: '.implode('; ', $shortages),
            ]);
        }
    }
}
