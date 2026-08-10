import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/use-permission';
import { create, index } from '@/routes/supplies';
import type { Supply } from '@/types';
import { SupplyCard } from './components/supply-card';
import { SupplyStatsHeader } from './components/supply-stats-header';

type Supplies = {
    data: Supply[];
};

type Props = {
    supplies: Supplies;
    filters?: { search?: string };
    stats: {
        totalSupplies: number;
        completed: number;
        cancelled: number;
    };
};

export default function Supplies({ supplies, stats }: Props) {
    const { can } = usePermission();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<
        'all' | 'newest' | 'latest' | 'completed' | 'cancelled'
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
                    only: ['supplies', 'filters', 'stats'],
                    reset: ['supplies'],
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, filter]);

    return (
        <>
            <Head title="Supplies" />
            <Container>
                <SupplyStatsHeader stats={stats} />

                <div className="space-y-6">
                    <div className="sticky top-20 space-y-6 bg-secondary pb-6">
                        <SearchInput
                            placeholder="Search..."
                            className="w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="flex items-center justify-between">
                            <div className="space-x-4">
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
                                        filter === 'cancelled'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="default"
                                    onClick={() =>
                                        setFilter(
                                            filter === 'cancelled'
                                                ? 'all'
                                                : 'cancelled',
                                        )
                                    }
                                >
                                    Cancelled
                                </Button>
                            </div>

                            {can('supply.create') && (
                                <Button onClick={() => router.visit(create())}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Supply
                                </Button>
                            )}
                        </div>
                    </div>

                    <InfiniteScroll data="supplies">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
                            {supplies.data.map((supply) => (
                                <SupplyCard
                                    key={supply.id}
                                    supply={supply}
                                    canEdit={can('supply.update')}
                                    canRemove={can('supply.cancel')}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </Container>
        </>
    );
}

Supplies.layout = {
    breadcrumbs: [{ title: 'Supplies', href: index() }],
};
