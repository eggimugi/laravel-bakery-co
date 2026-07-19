import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { SlidersVertical } from 'lucide-react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, index } from '@/routes/orders';
import type { Order } from '@/types';
import { OrderCard } from './components/order-card';
import { ViewOrderStats } from './components/view-order-stats';

type Paginated<T> = {
    data: T[];
};

type Props = {
    orders: Paginated<Order>;
    stats: {
        totalOrder: number;
        completed: number;
        processing: number;
    };
};

export default function ViewOrders({ orders, stats }: Props) {
    return (
        <>
            <Head title={'Orders'} />
            <Container>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <ViewOrderStats stats={stats} />

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

                                    <Button
                                        onClick={() => router.visit(create())}
                                    >
                                        Add Order
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="default">
                                    Processing
                                </Button>
                                <Button variant="outline" size="default">
                                    Completed
                                </Button>
                                <Button variant="default" size="default">
                                    Highest Total
                                </Button>
                                <Button variant="outline" size="default">
                                    Latest
                                </Button>
                                <Button variant="outline" size="default">
                                    Newest
                                </Button>
                            </div>
                        </div>

                        <InfiniteScroll data="orders">
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
                                {orders.data.map((order) => (
                                    <div key={order.id}>
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            canManageOrder={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </Container>
        </>
    );
}

ViewOrders.layout = {
    breadcrumbs: [
        {
            title: 'View Orders',
            href: index(),
        },
    ],
};
