import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { RecipeCard } from '@/components/recipe-card';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/use-permission';
import { index } from '@/routes/compositions';
import type { CakeWithCompositions } from '@/types';
import { CompositionsStatsHeader } from './components/composition-stats-header';

type PaginatedCakes = {
    data: CakeWithCompositions[];
    prev_page_url: string | null;
    next_page_url: string | null;
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
    const [filter, setFilter] = useState<
        'all' | 'composition' | 'no_composition' | 'tray' | 'piece'
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
                    only: ['cakes', 'filters', 'stats'],
                    reset: ['cakes'],
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, filter]);

    return (
        <>
            <Head title="Compositions" />
            <Container>
                <CompositionsStatsHeader stats={stats} />

                <div className="space-y-6">
                    <div className="sticky top-20 space-y-6 bg-secondary pb-6">
                        <SearchInput
                            placeholder="Search Cake"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="flex items-center gap-4">
                            <Button
                                variant={
                                    filter === 'composition'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="default"
                                onClick={() =>
                                    setFilter(
                                        filter === 'composition'
                                            ? 'all'
                                            : 'composition',
                                    )
                                }
                            >
                                Composition
                            </Button>
                            <Button
                                variant={
                                    filter === 'no_composition'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="default"
                                onClick={() =>
                                    setFilter(
                                        filter === 'no_composition'
                                            ? 'all'
                                            : 'no_composition',
                                    )
                                }
                            >
                                No Composition
                            </Button>
                            <Button
                                variant={
                                    filter === 'tray' ? 'default' : 'outline'
                                }
                                size="default"
                                onClick={() =>
                                    setFilter(
                                        filter === 'tray' ? 'all' : 'tray',
                                    )
                                }
                            >
                                Tray
                            </Button>
                            <Button
                                variant={
                                    filter === 'piece' ? 'default' : 'outline'
                                }
                                size="default"
                                onClick={() =>
                                    setFilter(
                                        filter === 'piece' ? 'all' : 'piece',
                                    )
                                }
                            >
                                Piece
                            </Button>
                        </div>
                    </div>

                    <InfiniteScroll data="cakes" buffer={400}>
                        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
                    </InfiniteScroll>
                </div>
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
