import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { PaginationPage } from '@/components/pagination-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePermission } from '@/hooks/use-permission';
import { create, index } from '@/routes/supplies';
import type { PaginationLinkType, Supply } from '@/types';
import { SupplyCard } from './components/supply-card';
import { SupplyStatsHeader } from './components/supply-stats-header';

type PaginatedSupplies = {
    data: Supply[];
    links: PaginationLinkType[];
};

type Props = {
    supplies: PaginatedSupplies;
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
            <Head title="Supplies" />
            <Container>
                <SupplyStatsHeader stats={stats} />

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
                    </div>

                    {can('supply.create') && (
                        <Button onClick={() => router.visit(create())}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Supply
                        </Button>
                    )}
                </div>

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

                <PaginationPage links={supplies.links} />
            </Container>
        </>
    );
}

Supplies.layout = {
    breadcrumbs: [{ title: 'Supplies', href: index() }],
};
