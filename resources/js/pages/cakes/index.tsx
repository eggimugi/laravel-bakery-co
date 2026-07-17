import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { index } from '@/routes/cakes';
import type { Cake } from '@/types';
import { CakeStatsHeader } from './components/cake-stats-header';
import { CakeTable } from './components/table/page';

type Props = {
    cakes: Cake[];
};

export default function Cakes({ cakes }: Props) {

    return (
        <>
            <Head title="Cakes" />
            <Container>
                <CakeStatsHeader totalCakes={cakes.length} />

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
