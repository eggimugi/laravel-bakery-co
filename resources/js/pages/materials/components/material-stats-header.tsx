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
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 lg:flex-row lg:items-center">
            <div>
                <h1 className="text-2xl font-bold">
                    Manage BakeryCo. Materials
                </h1>
                <p className="text-muted-foreground">
                    Manage your bakery materials and their details.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
                <StatsCard
                    title="Total Materials"
                    value={stats.totalMaterials}
                    unitValue="materials"
                    className="items-start lg:items-end"
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
                    className="items-start lg:items-end"
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
