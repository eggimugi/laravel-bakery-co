<?php

namespace App\Services;

use App\Models\DetailSupply;
use App\Models\Material;
use App\Models\Supply;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SupplyService
{
    public function __construct(
        private StockMovementService $stockMovementService,
    ) {}

    public function createWithDetails(array $validated, int $userId): Supply
    {
        return DB::transaction(function () use ($validated, $userId) {
            $supply = Supply::create([
                'user_id' => $userId,
                'supplier_id' => $validated['supplier_id'],
                'supply_date' => $validated['supply_date'],
            ]);

            $now = now();

            $rows = array_map(fn (array $item) => [
                'supply_id' => $supply->id,
                'material_id' => $item['material_id'],
                'material_price' => $item['material_price'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'created_at' => $now,
                'updated_at' => $now,
            ], $validated['items']);

            DetailSupply::insert($rows);

            $this->applyStockMovements(
                details: $supply->detailSupplies()->get(),
                userId: $userId,
                type: 'supply',
                direction: 1,
                note: 'Created new supply with details.',
            );

            return $supply;
        });
    }

    public function updateWithDetails(Supply $supply, array $validated, int $userId): Supply
    {
        return DB::transaction(function () use ($supply, $validated, $userId) {
            $oldDetails = $supply->detailSupplies()->get();

            $this->applyStockMovements(
                details: $oldDetails,
                userId: $userId,
                type: 'supply_update_reversal',
                direction: -1,
                note: 'Reversal due to supply update.',
                reference: $supply,
            );

            $supply->update([
                'user_id' => $userId,
                'supplier_id' => $validated['supplier_id'],
                'supply_date' => $validated['supply_date'],
            ]);

            $supply->detailSupplies()->delete();

            $now = now();

            $rows = array_map(fn (array $item) => [
                'supply_id' => $supply->id,
                'material_id' => $item['material_id'],
                'material_price' => $item['material_price'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'created_at' => $now,
                'updated_at' => $now,
            ], $validated['items']);

            DetailSupply::insert($rows);

            $this->applyStockMovements(
                details: $supply->detailSupplies()->get(),
                userId: $userId,
                type: 'supply',
                direction: 1,
                note: 'Updated supply details.',
            );

            return $supply;
        });
    }

    public function cancelSupply(Supply $supply, int $userId): Supply
    {
        return DB::transaction(function () use ($supply, $userId) {
            if ($supply->status === 'canceled') {
                throw new \RuntimeException('Supply is already canceled.');
            }

            $supply->update(['cancelled_at' => now()]);

            $this->applyStockMovements(
                details: $supply->detailSupplies()->get(),
                userId: $userId,
                type: 'supply_cancel',
                direction: -1,
                note: 'Canceled supply.',
            );

            return $supply;
        });
    }

    private function applyStockMovements(
        iterable $details,
        int $userId,
        string $type,
        int $direction = 1,
        ?string $note = null,
        ?Model $reference = null,
    ): void {
        $details = collect($details);

        if ($details->isEmpty()) {
            return;
        }

        $materials = Material::whereIn('id', $details->pluck('material_id'))
            ->get()
            ->keyBy('id');

        foreach ($details as $detail) {
            $material = $materials->get($detail->material_id);

            if (! $material) {
                throw new \RuntimeException(
                    "Material with id {$detail->material_id} not found."
                );
            }

            $this->stockMovementService->record(
                stockable: $material,
                quantity: $detail->quantity * $direction,
                type: $type,
                reference: $reference ?? $detail,
                note: $note,
                userId: $userId,
            );
        }
    }
}
