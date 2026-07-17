import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { ShoppingBasket, SlidersVertical } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils.ts';
import { index, store } from '@/routes/orders';
import type { Cake } from '@/types';
import { OrderMenuCard } from './components/order-menu-card.tsx';
import { OrderSidebar } from './components/order-sidebar.tsx';
import { useCart } from './hooks/use-cart';

type Paginated<T> = {
    data: T[];
};

type Props = {
    cakes: Paginated<Cake>;
};

export default function Order({ cakes }: Props) {
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
            { onFinish: () => setIsCheckingOut(false) },
        );
    };

    return (
        <>
            <Head title={'Order'} />
            <Container className="pt-0">
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <div className="sticky top-0 space-y-4 bg-background py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">
                                    Make Order
                                </h1>

                                <div className="flex items-center gap-4">
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

                            <Input placeholder="Search..." className="w-full" />

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
                                    'flex flex-wrap gap-6 transition-[gap] duration-300 ease-in-out',
                                )}
                            >
                                {cakes.data.map((cake) => (
                                    <div
                                        key={cake.id}
                                        className="transition-[width] duration-300 ease-in-out"
                                        style={{
                                            width: isCartOpen
                                                ? 'calc(33.333% - 1rem)'
                                                : 'calc(25% - 1.125rem)',
                                        }}
                                    >
                                        <OrderMenuCard
                                            cake={cake}
                                            canMakeOrder={true}
                                            qty={getQty(cake.id)}
                                            addToCart={addToCart}
                                            increaseQty={increaseQty}
                                            decreaseQty={decreaseQty}
                                        />
                                    </div>
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
