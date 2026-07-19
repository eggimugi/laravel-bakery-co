import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { PaginationPage } from '@/components/pagination-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePermission } from '@/hooks/use-permission';
import { create, index } from '@/routes/productions';
import type { PaginationLinkType, Production } from '@/types';
import { ProductionCard } from './components/production-card';
import { ProductionStatsHeader } from './components/production-stats-header';

type PaginatedProductions = {
    data: Production[];
    links: PaginationLinkType[];
};

type Props = {
    productions: PaginatedProductions;
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                index().url,
                { search: search || undefined },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <>
            <Head title="Production History" />
            <Container>
                <ProductionStatsHeader stats={stats} />

                <Input
                    placeholder="Search..."
                    className="w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex items-center justify-between">
                    <div className="space-x-4">
                        <Button variant="outline" size="default">
                            Newest
                        </Button>
                        <Button variant="default" size="default">
                            Oldest
                        </Button>
                        <Button variant="default" size="default">
                            Completed
                        </Button>
                        <Button variant="default" size="default">
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

                <PaginationPage links={productions.links} />
            </Container>
        </>
    );
}

ProductionHistory.layout = {
    breadcrumbs: [
        {
            title: 'Production History',
            href: index(),
        },
    ],
};
