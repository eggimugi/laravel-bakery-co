import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { index } from '@/routes/materials';
import type { Material } from '@/types';
import { MaterialStatsHeader } from './components/material-stats-header';
import MaterialStockCard from './components/material-stock-card';
import { MaterialTable } from './components/table/page';

type Props = {
    materials: Material[];
    stats: {
        totalMaterials: number;
        liquid: number;
        powder: number;
        solid: number;
    };
    lessStockMaterials: Material[];
};

export default function Materials({
    materials,
    stats,
    lessStockMaterials,
}: Props) {
    return (
        <>
            <Head title="Materials" />
            <Container>
                <MaterialStatsHeader stats={stats} />

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">
                        Stock is Running Low
                    </h2>

                    {lessStockMaterials.length === 0 ? (
                        <p className="rounded-xl border p-6 text-center text-sm text-muted">
                            No materials are running low on stock.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {lessStockMaterials.map((material) => (
                                <MaterialStockCard
                                    key={material.id}
                                    material={material}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <MaterialTable materials={materials} />
            </Container>
        </>
    );
}

Materials.layout = {
    breadcrumbs: [
        {
            title: 'Materials',
            href: index(),
        },
    ],
};
