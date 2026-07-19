import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { PaginationPage } from '@/components/pagination-page';
import { RecipeCard } from '@/components/recipe-card';
import { Input } from '@/components/ui/input';
import { usePermission } from '@/hooks/use-permission';
import { index } from '@/routes/compositions';
import type { CakeWithCompositions, PaginationLinkType } from '@/types';
import { CompositionsStatsHeader } from './components/composition-stats-header';

type PaginatedCakes = {
    data: CakeWithCompositions[];
    links: PaginationLinkType[];
};

type Props = {
    cakes: PaginatedCakes;
    filters?: { search?: string };
    stats: {
        totalCakes: number;
        compositions: number;
        noCompositions: number;
    };
};

export default function Compositions({ cakes, stats }: Props) {
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
            <Head title="Compositions" />
            <Container>
                <CompositionsStatsHeader stats={stats} />

                <Input
                    placeholder="Search..."
                    className="w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-3 2xl:grid-cols-4">
                    {cakes.data.map((cake) => (
                        <div key={cake.id}>
                            <RecipeCard
                                cake={cake}
                                canAdd={can('composition.create')}
                                canEdit={can('composition.update')}
                                canRemove={can('composition.delete')}
                            />
                        </div>
                    ))}
                </div>

                <PaginationPage links={cakes.links} />
            </Container>
        </>
    );
}

Compositions.layout = {
    breadcrumbs: [
        {
            title: 'Compositions',
            href: index(),
        },
    ],
};
