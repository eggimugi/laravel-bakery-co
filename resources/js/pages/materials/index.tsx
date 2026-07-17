import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { index } from '@/routes/materials';
import type { Material } from '@/types';
import { MaterialStatsHeader } from './components/material-stats-header';
import { MaterialTable } from './components/table/page';

type Props = {
    materials: Material[];
    stats: {
        totalMaterials: number;
        liquid: number;
        powder: number;
        solid: number;
    };
};

export default function Materials({ materials, stats }: Props) {
    return (
        <>
            <Head title="Materials" />
            <Container>
                <MaterialStatsHeader stats={stats} />

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
