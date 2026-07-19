import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalCakes: number;
        compositions: number;
        noCompositions: number;
    };
};

export function CompositionsStatsHeader({ stats }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 xl:flex-row xl:items-center">
            <div>
                <h1 className="text-2xl font-bold">Cake Recipes</h1>
                <p className="text-muted-foreground">
                    Manage your cake recipes and their compositions.
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
                    title="Compositions"
                    value={stats.compositions}
                    unitValue="compositions"
                    className='items-start xl:items-end'
                />
                <StatsCard
                    title="No Compositions"
                    value={stats.noCompositions}
                    unitValue="cakes"
                    className='items-start xl:items-end'
                />
            </div>
        </div>
    );
}
