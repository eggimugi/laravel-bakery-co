import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/use-permission';
import { create, index } from '@/routes/productions';
import type { Production } from '@/types';
import { ProductionCard } from './components/production-card';
import { ProductionStatsHeader } from './components/production-stats-header';

type Productions = {
    data: Production[];
};

type Props = {
    productions: Productions;
    filters?: { search?: string };
    stats: {
        totalProductions: number;
        completed: number;
        cancelled: number;
    };
};

export default function ProductionHistory({ productions, stats }: Props) {
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
                    only: ['productions', 'filters', 'stats'],
                    reset: ['productions'],
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, filter]);

    return (
        <>
            <Head title="Production History" />
            <Container>
                <ProductionStatsHeader stats={stats} />

                <div className="space-y-6">
                    <div className="sticky top-20 space-y-6 bg-secondary pb-6">
                        <SearchInput
                            placeholder="Search..."
                            className="w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-4 space-x-4 md:space-y-0">
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
                                    Make Production
                                </Button>
                            )}
                        </div>
                    </div>

                    <InfiniteScroll data="productions" buffer={400}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {productions.data.map((production) => (
                                <div key={production.id}>
                                    <ProductionCard
                                        production={production}
                                        canEdit={can('production.update')}
                                        canRemove={can('production.cancel')}
                                    />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </Container>
        </>
    );
}

ProductionHistory.layout = {
    breadcrumbs: [
        {
            title: 'Production Histories',
            href: index(),
        },
    ],
};
