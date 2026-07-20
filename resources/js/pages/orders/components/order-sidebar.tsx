import { ShoppingBasket, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/currency';
import { cn } from '@/lib/utils';
import type { Cake } from '@/types';

type CartItem = {
    qty: number;
    cake: Cake;
};

type CartState = Record<number, CartItem>;

type Props = {
    cart: CartState;
    decreaseQty: (cakeId: number) => void;
    increaseQty: (cakeId: number) => void;
    onCheckout: () => void;
    open: boolean;
    totalQty: number;
};

export function OrderSidebar({
    cart,
    decreaseQty,
    increaseQty,
    onCheckout,
    open,
    totalQty,
}: Props) {
    const cartItems = Object.values(cart);
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.cake.cake_price * item.qty,
        0,
    );

    return (
        <div
            aria-hidden={!open}
            className={cn(
                'shrink-0 pt-4 transition-[width,opacity] duration-300 ease-in-out',
                open
                    ? 'pointer-events-auto ml-4 w-full opacity-100 lg:w-80'
                    : 'pointer-events-none w-0 opacity-0',
            )}
        >
            <aside
                id="order-cart-panel"
                className={cn(
                    'sticky top-4 ml-auto flex w-full flex-col rounded-2xl border bg-card p-4 shadow-sm transition-all duration-300 ease-in-out',
                    open ? 'translate-x-0' : 'translate-x-4',
                )}
            >
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Cart
                        </p>
                        <h2 className="text-lg font-semibold">Order Summary</h2>
                    </div>

                    <div className="rounded-full border px-3 py-1 text-sm text-muted-foreground">
                        {totalQty} items
                    </div>
                </div>

                <Separator className="my-4" />

                {totalQty === 0 ? (
                    <div className="flex min-h-60 flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                        <ShoppingBasket className="size-10" />
                        <div>
                            <p className="text-base font-medium text-foreground">
                                No order item
                            </p>
                            <p className="text-sm">
                                Add a cake to start building the order.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                            {cartItems.map(({ cake, qty }) => (
                                <Card key={cake.id} className="border-muted">
                                    <CardContent className="space-y-3 p-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 capitalize">
                                                <p className="truncate font-medium">
                                                    {cake.cake_name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatRupiah(
                                                        cake.cake_price,
                                                    )}{' '}
                                                    / {cake.unit}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm font-semibold">
                                                    {formatRupiah(
                                                        cake.cake_price * qty,
                                                    )}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Subtotal
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                Qty: {qty}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    aria-label={`Decrease ${cake.cake_name}`}
                                                    className="size-8"
                                                    onClick={() => {
                                                        decreaseQty(cake.id);
                                                    }}
                                                    size="icon"
                                                    variant="outline"
                                                >
                                                    <Minus className="size-4" />
                                                </Button>

                                                <div className="min-w-10 rounded-md border px-3 py-1.5 text-center text-sm font-medium">
                                                    {qty}
                                                </div>

                                                <Button
                                                    aria-label={`Increase ${cake.cake_name}`}
                                                    className="size-8"
                                                    onClick={() => {
                                                        increaseQty(cake.id);
                                                    }}
                                                    size="icon"
                                                    variant="outline"
                                                >
                                                    <Plus className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-muted-foreground">
                                    Total
                                </span>
                                <span className="text-lg font-semibold">
                                    {formatRupiah(totalPrice)}
                                </span>
                            </div>

                            <Button className="w-full" onClick={onCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
