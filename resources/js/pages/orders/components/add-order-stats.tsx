import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalCakes: number;
        available: number;
        unavailable: number;
    };
};

export function AddOrderStats({ stats }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 xl:flex-row xl:items-center">
            <div>
                <h1 className="text-2xl font-bold">Make Order</h1>
                <p className="text-muted">
                    Make an order for your customers and manage their requests.
                </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                <StatsCard
                    title="Total Cakes"
                    value={stats.totalCakes}
                    unitValue="cakes"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Available"
                    value={stats.available}
                    unitValue="cakes"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="Unavailable"
                    value={stats.unavailable}
                    unitValue="cakes"
                    className='items-start xl:items-end'
                />
            </div>
        </div>
    );
}
