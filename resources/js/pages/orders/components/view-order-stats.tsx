import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalOrder: number;
        completed: number;
        processing: number;
    };
};

export function ViewOrderStats({ stats }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 xl:flex-row xl:items-center">
            <div>
                <h1 className="text-2xl font-bold">View Orders</h1>
                <p className="text-muted-foreground">
                    View and manage customer orders and track their status.
                </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrder}
                    unitValue="orders"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    unitValue="orders"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Processing"
                    value={stats.processing}
                    unitValue="orders"
                    className='items-start xl:items-end'
                />
            </div>
        </div>
    );
}
