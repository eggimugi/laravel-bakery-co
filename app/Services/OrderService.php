<?php

namespace App\Services;

use App\Models\Cake;
use App\Models\DetailOrder;
use App\Models\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function __construct(
        private StockMovementService $stockMovementService,
    ) {}

    public function createWithDetails(array $validated, int $userId)
    {
        DB::transaction(function () use ($validated, $userId) {
            $now = now();

            $order = Order::create([
                'user_id' => $userId,
                'order_date' => $now,
                'status' => 'processing',
            ]);

            $rows = array_map(fn (array $item) => [
                'order_id' => $order->id,
                'cake_id' => $item['cake_id'],
                'quantity' => $item['quantity'],
                'created_at' => $now,
                'updated_at' => $now,
            ], $validated['items']);

            DetailOrder::insert($rows);

            $this->applyStockMovements(
                details: $order->detailOrders()->get(),
                userId: $userId,
                type: 'order',
                direction: -1,
                note: 'Created new order with details.',
            );
        });
    }

    public function updateWithDetails(Order $order, int $userId)
    {
        $order->update([
            'user_id' => $userId,
            'status' => 'completed',
        ]);
    }

    public function cancelOrder(Order $order, int $userId)
    {
        DB::transaction(function () use ($order, $userId) {
            if ($order->status === 'canceled') {
                throw new \RuntimeException('Order is already canceled.');
            }

            $order->update(['status' => 'canceled']);

            $this->applyStockMovements(
                details: $order->detailOrders()->get(),
                userId: $userId,
                type: 'order_cancel',
                direction: -1,
                note: 'Canceled order.',
            );
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

        $cakes = Cake::whereIn('id', $details->pluck('cake_id'))
            ->get()
            ->keyBy('id');

        foreach ($details as $detail) {
            $cake = $cakes->get($detail->cake_id);

            if (! $cake) {
                throw new \RuntimeException(
                    "Cake with id {$detail->cake_id} not found."
                );
            }

            $this->stockMovementService->record(
                stockable: $cake,
                quantity: $detail->quantity * $direction,
                type: $type,
                reference: $reference ?? $detail,
                note: $note,
                userId: $userId,
            );
        }
    }
}
