import { StatsCard } from '@/components/stats-card';

type Props = {
    stats: {
        totalMaterials: number;
        liquid: number;
        powder: number;
        solid: number;
    };
};

export function MaterialStatsHeader({ stats }: Props) {
    return (
        <div className="flex w-full items-center justify-between rounded-xl border p-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Manage BakeryCo. Materials
                </h1>
                <p className="text-muted-foreground">
                    Manage your bakery materials and their details.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total Materials"
                    value={stats.totalMaterials}
                    unitValue="materials"
                />
                <StatsCard
                    title="Liquid"
                    value={stats.liquid}
                    unitValue="materials"
                />
                <StatsCard
                    title="Powder"
                    value={stats.powder}
                    unitValue="materials"
                />
                <StatsCard
                    title="Solid"
                    value={stats.solid}
                    unitValue="materials"
                />
            </div>
        </div>
    );
}
