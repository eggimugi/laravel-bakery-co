import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import { formatRupiah } from '@/lib/currency';
import type { Cake } from '@/types';

type Props = {
    cake: Cake;
    canMakeOrder: boolean;
    qty: number;
    addToCart: (cake: Cake) => void;
    increaseQty: (cakeId: number) => void;
    decreaseQty: (cakeId: number) => void;
};

export function OrderMenuCard({
    cake,
    canMakeOrder,
    qty,
    addToCart,
    increaseQty,
    decreaseQty,
}: Props) {
    if (!canMakeOrder) {
        return null;
    }

    return (
        <>
            <Card className="h-full w-full flex-row px-4">
                <img
                    src="/cake-placeholder.png"
                    alt="Event cover"
                    className="aspect-square size-36 object-contain"
                />
                <CardContent className="flex w-full flex-col justify-between gap-2 px-0">
                    <CardTitle className='capitalize'>
                        {cake.cake_name}
                        <p className="text-sm text-muted-foreground font-normal">
                            {cake.cake_flavour}
                        </p>
                    </CardTitle>

                    <CardDescription className="flex flex-col gap-2">
                        <p className="text-lg text-primary">
                            {formatRupiah(cake.cake_price)}
                        </p>
                        <p className="font-semibold">
                            <span className="font-normal capitalize">
                                Available:
                            </span>{' '}
                            {cake.stock}
                        </p>
                    </CardDescription>
                    <CardFooter className="px-0">
                        {qty === 0 ? (
                            <Button
                                className="h-auto w-full px-1 py-1.5"
                                onClick={() => {
                                    addToCart(cake);
                                }}
                                variant={
                                    cake.stock > 0 ? 'secondary' : 'secondary'
                                }
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <div className="flex w-full items-center gap-2">
                                <Button
                                    className="size-8 shrink-0"
                                    onClick={() => {
                                        decreaseQty(cake.id);
                                    }}
                                    size="icon"
                                    variant="outline"
                                >
                                    <Minus />
                                </Button>
                                <div className="flex h-8 flex-1 items-center justify-center rounded-md border border-input text-sm font-medium">
                                    {qty}
                                </div>
                                <Button
                                    className="size-8 shrink-0"
                                    onClick={() => {
                                        increaseQty(cake.id);
                                    }}
                                    size="icon"
                                    variant="outline"
                                >
                                    <Plus />
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </CardContent>
            </Card>
        </>
    );
}
