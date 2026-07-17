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

type PaginatedProductions = {
    data: Production[];
    links: PaginationLinkType[];
};

type Props = {
    productions: PaginatedProductions;
    filters?: { search?: string };
};

export default function ProductionHistory({ productions }: Props) {
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
                <div className="flex w-full items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Production History
                        </h1>
                        <p className="text-muted-foreground">
                            Make production for your cakes and manage your
                            production history.
                        </p>
                    </div>
                    {can('supply.create') && (
                        <Button onClick={() => router.visit(create())}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Make Production
                        </Button>
                    )}
                </div>

                <div className="flex">
                    <Input
                        placeholder="Search..."
                        className="w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <PaginationPage links={productions.links} />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
