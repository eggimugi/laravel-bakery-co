import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { index } from '@/routes/cakes';
import type { Cake } from '@/types';
import { CakeStatsHeader } from './components/cake-stats-header';
import CakeStockCard from './components/cake-stock-card';
import { CakeTable } from './components/table/page';

type Props = {
    cakes: Cake[];
    lessStockCakes: Cake[];
};

export default function Cakes({ cakes, lessStockCakes }: Props) {
    return (
        <>
            <Head title="Cakes" />
            <Container>
                <CakeStatsHeader
                    totalCakes={cakes.length}
                    lowStock={lessStockCakes.length}
                />

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">
                        Stock is Running Low
                    </h2>

                    {lessStockCakes.length === 0 ? (
                        <p className="rounded-xl border p-6 text-center text-sm text-muted">
                            No cakes are running low on stock.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {lessStockCakes.map((cake) => (
                                <CakeStockCard key={cake.id} cake={cake} />
                            ))}
                        </div>
                    )}
                </div>

                <CakeTable cakes={cakes} />
            </Container>
        </>
    );
}

Cakes.layout = {
    breadcrumbs: [
        {
            title: 'Cakes',
            href: index(),
        },
    ],
};
