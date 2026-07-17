<?php

namespace App\Services;

use App\Exceptions\InsufficientStockException;
use App\Models\StockMovement;
use Illuminate\Database\Eloquent\Model;

class StockMovementService
{
    public function record(
        Model $stockable,
        int $quantity,
        string $type,
        ?Model $reference = null,
        ?string $note = null,
        ?int $userId = null,
    ): StockMovement {
        if ($quantity === 0) {
            throw new \InvalidArgumentException("Quantity movement can't be 0.");
        }

        $locked = $stockable::where('id', $stockable->id)->lockForUpdate()->first();

        $newStock = $locked->stock + $quantity;

        if ($newStock < 0) {
            throw new InsufficientStockException(
                "Stock {$locked->name} is insufficient. Remaining: {$locked->stock}, requested: {$quantity}"
            );
        }

        $movement = StockMovement::create([
            'stockable_type' => get_class($locked),
            'stockable_id' => $locked->id,
            'quantity' => $quantity,
            'type' => $type,
            'reference_type' => $reference ? get_class($reference) : null,
            'reference_id' => $reference?->id,
            'note' => $note,
            'user_id' => $userId,
        ]);

        $locked->update(['stock' => $newStock]);

        return $movement;
    }

    public function recalculate(Model $stockable): int
    {
        $real = StockMovement::where('stockable_type', get_class($stockable))
            ->where('stockable_id', $stockable->id)
            ->sum('quantity');

        if ($stockable->stock !== $real) {
            $stockable->update(['stock' => $real]);
        }

        return $real;
    }
}