import { StatsCard } from '@/components/stats-card';

type Props = {
    totalCakes: number;
    lowStock: number;
};

export function CakeStatsHeader({ totalCakes, lowStock }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-bold">BakeryCo. Cakes</h1>
                <p className="text-muted">
                    Manage your bakery cakes and their details.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <StatsCard
                    title="Total Cakes"
                    value={totalCakes}
                    unitValue="cakes"
                    className="items-start sm:items-end"
                />
                <StatsCard
                    title="Low Stock"
                    value={lowStock}
                    unitValue="cakes"
                    className="items-start sm:items-end"
                />
            </div>
        </div>
    );
}
