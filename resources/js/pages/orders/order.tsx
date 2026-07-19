import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { ShoppingBasket, SlidersVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils.ts';
import { index, store } from '@/routes/orders';
import type { Cake } from '@/types';
import { AddOrderStats } from './components/add-order-stats.tsx';
import { OrderMenuCard } from './components/order-menu-card.tsx';
import { OrderSidebar } from './components/order-sidebar.tsx';
import { useCart } from './hooks/use-cart';

type Paginated<T> = {
    data: T[];
};

type Props = {
    cakes: Paginated<Cake>;
    stats: {
        totalCakes: number;
        available: number;
        unavailable: number;
    };
};

export default function Order({ cakes, stats }: Props) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const { cart, addToCart, increaseQty, decreaseQty, getQty, totalQty } =
        useCart();

    const toggleCart = () => {
        setIsCartOpen((currentOpen) => !currentOpen);
    };

    console.log(isCheckingOut);

    const handleCheckout = () => {
        const items = Object.values(cart).map(({ cake, qty }) => ({
            cake_id: cake.id,
            quantity: qty,
        }));

        if (items.length === 0) {
            return;
        }

        setIsCheckingOut(true);

        router.post(
            store.url(),
            { items },
            {
                onSuccess: () => {
                    setIsCheckingOut(false);
                    toast.success('Order placed successfully');
                },
                onError: () => setIsCheckingOut(false),
                onFinish: () => setIsCheckingOut(false),
            },
        );
    };

    return (
        <>
            <Head title={'Order'} />
            <Container className="pt-0">
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <AddOrderStats stats={stats} />

                        <div className="sticky top-16 space-y-4 bg-background py-4">
                            <div className="flex items-center gap-6">
                                <Input
                                    placeholder="Search..."
                                    className="w-full"
                                />

                                <div className="flex items-center gap-6">
                                    <Button variant="outline" size="icon">
                                        <SlidersVertical />
                                    </Button>

                                    {totalQty === 0 ? (
                                        <Button
                                            aria-expanded={isCartOpen}
                                            aria-controls="order-cart-panel"
                                            onClick={toggleCart}
                                            variant="default"
                                            size="default"
                                        >
                                            <ShoppingBasket />
                                        </Button>
                                    ) : (
                                        <Button
                                            aria-expanded={isCartOpen}
                                            aria-controls="order-cart-panel"
                                            className="relative"
                                            onClick={toggleCart}
                                            variant="default"
                                            size="default"
                                        >
                                            <ShoppingBasket />
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none font-semibold text-primary-foreground">
                                                {totalQty}
                                            </span>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="default">
                                    Piece
                                </Button>
                                <Button variant="outline" size="default">
                                    Tray
                                </Button>
                                <Button variant="default" size="default">
                                    Best Seller
                                </Button>
                                <Button variant="outline" size="default">
                                    Chocolate
                                </Button>
                                <Button variant="outline" size="default">
                                    Available
                                </Button>
                            </div>
                        </div>

                        <InfiniteScroll data="cakes">
                            <div
                                className={cn(
                                    'grid gap-6 transition-all duration-300 ease-in-out',
                                    isCartOpen
                                        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
                                )}
                            >
                                {cakes.data.map((cake) => (
                                    <OrderMenuCard
                                        key={cake.id}
                                        cake={cake}
                                        canMakeOrder={true}
                                        qty={getQty(cake.id)}
                                        addToCart={addToCart}
                                        increaseQty={increaseQty}
                                        decreaseQty={decreaseQty}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>

                    <OrderSidebar
                        cart={cart}
                        decreaseQty={decreaseQty}
                        increaseQty={increaseQty}
                        onCheckout={handleCheckout}
                        open={isCartOpen}
                        totalQty={totalQty}
                    />
                </div>
            </Container>
        </>
    );
}

Order.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: index(),
        },
    ],
};
