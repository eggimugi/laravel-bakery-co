import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalProductions: number;
        completed: number;
        cancelled: number;
    };
};

export function ProductionStatsHeader({ stats }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 xl:flex-row xl:items-center">
            <div>
                <h1 className="text-2xl font-bold">Production History</h1>
                <p className="text-muted">
                    Manage your production records and track their progress.
                </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                <StatsCard
                    title="Productions"
                    value={stats.totalProductions}
                    unitValue="productions"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    unitValue="productions"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Cancelled"
                    value={stats.cancelled}
                    unitValue="productions"
                    className='items-start xl:items-end'
                />
            </div>
        </div>
    );
}
