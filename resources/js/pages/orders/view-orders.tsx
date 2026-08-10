import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { SlidersVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/use-permission';
import { create, index } from '@/routes/orders';
import type { Order } from '@/types';
import { OrderCard } from './components/order-card';
import { ViewOrderStats } from './components/view-order-stats';

type Paginated<T> = {
    data: T[];
};

type Props = {
    orders: Paginated<Order>;
    filters?: { search?: string };
    stats: {
        totalOrder: number;
        completed: number;
        processing: number;
    };
};

export default function ViewOrders({ orders, stats }: Props) {
    const { can } = usePermission();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<
        'all' | 'processing' | 'completed' | 'highest' | 'newest' | 'latest'
    >('all');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                index().url,
                {
                    search: search || undefined,
                    filter: filter !== 'all' ? filter : undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: false,
                    replace: true,
                    only: ['orders', 'filters', 'stats'],
                    reset: ['orders'],
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, filter]);

    return (
        <>
            <Head title={'Orders'} />
            <Container>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <ViewOrderStats stats={stats} />

                        <div className="sticky top-16 z-20 space-y-8 bg-secondary py-8">
                            <div className="flex items-center gap-6">
                                <SearchInput
                                    placeholder="Search..."
                                    className="w-full"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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

                            <div className="flex flex-wrap items-center gap-4">
                                <Button
                                    variant={
                                        filter === 'processing'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'processing'
                                                ? 'all'
                                                : 'processing',
                                        )
                                    }
                                >
                                    Processing
                                </Button>
                                <Button
                                    variant={
                                        filter === 'completed'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'completed'
                                                ? 'all'
                                                : 'completed',
                                        )
                                    }
                                >
                                    Completed
                                </Button>
                                <Button
                                    variant={
                                        filter === 'highest'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'highest'
                                                ? 'all'
                                                : 'highest',
                                        )
                                    }
                                >
                                    Highest Total
                                </Button>
                                <Button
                                    variant={
                                        filter === 'newest'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'newest'
                                                ? 'all'
                                                : 'newest',
                                        )
                                    }
                                >
                                    Newest
                                </Button>
                                <Button
                                    variant={
                                        filter === 'latest'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'latest'
                                                ? 'all'
                                                : 'latest',
                                        )
                                    }
                                >
                                    Latest
                                </Button>
                            </div>
                        </div>

                        <InfiniteScroll data="orders">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                                {orders.data.map((order) => (
                                    <div key={order.id} className="h-full">
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            canManageOrder={can('order.update')}
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
