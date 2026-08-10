import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalSupplies: number;
        completed: number;
        cancelled: number;
    };
};

export function SupplyStatsHeader({ stats }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 xl:flex-row xl:items-center">
            <div>
                <h1 className="text-2xl font-bold">Supply History</h1>
                <p className="text-muted">
                    Manage your supply records and track their progress.
                </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                <StatsCard
                    title="Supplies"
                    value={stats.totalSupplies}
                    unitValue="supplies"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    unitValue="supplies"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Cancelled"
                    value={stats.cancelled}
                    unitValue="supplies"
                    className='items-start xl:items-end'
                />
            </div>
        </div>
    );
}
