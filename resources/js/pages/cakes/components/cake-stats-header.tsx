import { StatsCard } from '@/components/stats-card';

type Props = {
    totalCakes: number;
};

export function CakeStatsHeader({ totalCakes }: Props) {
    return (
        <div className="flex w-full items-center justify-between rounded-xl border p-6">
            <div>
                <h1 className="text-2xl font-bold">BakeryCo. Cakes</h1>
                <p className="text-muted-foreground">
                    Manage your bakery cakes and their details.
                </p>
            </div>
            <div className="grid grid-cols-1">
                <StatsCard
                    title="Total Cakes"
                    value={totalCakes}
                    unitValue="cakes"
                />
            </div>
        </div>
    );
}
