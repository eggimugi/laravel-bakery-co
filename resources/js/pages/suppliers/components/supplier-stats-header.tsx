import { StatsCard } from '@/components/stats-card';

type Props = {
    totalSuppliers: number;
};

export function SupplierStatsHeader({ totalSuppliers }: Props) {
    return (
        <div className="flex w-full flex-col justify-between gap-6 rounded-xl border p-6 md:flex-row md:items-center">
            <div>
                <h1 className="text-2xl font-bold">
                    Manage BakeryCo. Suppliers
                </h1>
                <p className="text-muted-foreground">
                    Manage your bakery suppliers and their details.
                </p>
            </div>
            <div className="grid grid-cols-1">
                <StatsCard
                    title="Suppliers"
                    value={totalSuppliers}
                    unitValue="accounts"
                    className="items-start sm:items-end"
                />
            </div>
        </div>
    );
}
