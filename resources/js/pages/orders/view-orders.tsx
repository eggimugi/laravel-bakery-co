import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { SlidersVertical } from 'lucide-react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, index } from '@/routes/orders';
import type { Order } from '@/types';
import { OrderCard } from './components/order-card';

type Paginated<T> = {
    data: T[];
};

type Props = {
    orders: Paginated<Order>;
};

export default function ViewOrders({ orders }: Props) {
    return (
        <>
            <Head title={'Orders'} />
            <Container>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <div className="sticky top-0 space-y-4 bg-background py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">
                                    View Order
                                </h1>

                                <div className="flex items-center gap-4">
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

                            <Input placeholder="Search..." className="w-full" />

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
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
