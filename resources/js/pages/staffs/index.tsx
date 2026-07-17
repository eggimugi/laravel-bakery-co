import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import type { User } from '@/types';
import { StaffStatsHeader } from './components/staff-stats-header';
import { StaffTable } from './components/table/page';

type Props = {
    staffs: User[];
    stats: {
        totalOwners: number;
        totalManagers: number;
        totalCashiers: number;
        totalStaffs: number;
    };
};

export default function Staffs({ staffs, stats }: Props) {
    return (
        <>
            <Head title="Staffs" />
            <Container>
                <StaffStatsHeader stats={stats} />

                <StaffTable staffs={staffs} />
            </Container>
        </>
    );
}

Staffs.layout = {
    breadcrumbs: [
        {
            title: 'Staffs',
            href: '/staffs',
        },
    ],
};
