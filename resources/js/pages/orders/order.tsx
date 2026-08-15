import { Head, InfiniteScroll, router, usePage } from '@inertiajs/react';
import { ShoppingBasket, SlidersVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/container';
import { SearchInput } from '@/components/search-input.tsx';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';
import { index as checkout } from '@/routes/checkouts/index.ts';
import { index } from '@/routes/orders';
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
    const isOpen = usePage().props.cartOpen;
    const [isCartOpen, setIsCartOpen] = useState(isOpen);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const { cart, addToCart, increaseQty, decreaseQty, getQty, totalQty } =
        useCart();
    const prevTotalQty = useRef(totalQty);

    useEffect(() => {
        if (prevTotalQty.current === 0 && totalQty > 0) {
            setIsCartOpen(true);
        }

        prevTotalQty.current = totalQty;
    }, [totalQty]);

    const toggleCart = () => {
        setIsCartOpen((currentOpen) => {
            const next = !currentOpen;
            document.cookie = `cart_state=${next}; path=/; max-age=${60 * 60 * 24 * 7}`;

            return next;
        });
    };

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
            checkout.url(),
            { items },
            {
                onSuccess: () => {
                    setIsCheckingOut(false);
                },
                onError: () => setIsCheckingOut(false),
                onFinish: () => setIsCheckingOut(false),
            },
        );
    };

    return (
        <>
            <Head title={'Order'} />
            <Container className="">
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <AddOrderStats stats={stats} />

                        <div className="sticky top-16 space-y-6 bg-secondary py-8">
                            <div className="flex items-center gap-6">
                                <SearchInput
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
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none font-semibold text-background">
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
                        isCheckingOut={isCheckingOut}
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
