import { StatsCard } from '@/components/stats-card';

type Props = {
    totalSuppliers: number;
};

export function SupplierStatsHeader({ totalSuppliers }: Props) {
    return (
        <div className="flex w-full items-center justify-between rounded-xl border p-6">
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
                    title="Total Suppliers"
                    value={totalSuppliers}
                    unitValue="accounts"
                    className='border-none '
                />
            </div>
        </div>
    );
}
