import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import StaffCard from '@/components/staff-card';
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
    topStaff: User[];
};

export default function Staffs({ staffs, stats, topStaff }: Props) {
    return (
        <>
            <Head title="Staffs" />
            <Container>
                <StaffStatsHeader stats={stats} />

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Top Staffs</h2>

                    {topStaff.length === 0 ? (
                        <p className="border rounded-2xl p-6 text-center text-sm text-muted">
                            No top staffs available.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {topStaff.map((staff) => (
                                <StaffCard key={staff.id} staff={staff} />
                            ))}
                        </div>
                    )}
                </div>

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
