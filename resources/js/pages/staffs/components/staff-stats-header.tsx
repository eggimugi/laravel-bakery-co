import { StatsCard } from "@/components/stats-card";

type Props = {
    stats: {
        totalOwners: number;
        totalManagers: number;
        totalCashiers: number;
        totalStaffs: number;
    };
};

export function StaffStatsHeader({ stats }: Props) {
    return (
        <div className="flex w-full items-center justify-between rounded-xl border p-6">
            <div>
                <h1 className="text-2xl font-bold">Manage BakeryCo. Staff</h1>
                <p className="text-muted-foreground">
                    Manage your bakery staff members and their details.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total Staffs"
                    value={stats.totalStaffs}
                    unitValue="accounts"
                />
                <StatsCard
                    title="Owners"
                    value={stats.totalOwners}
                    unitValue="accounts"
                />
                <StatsCard
                    title="Managers"
                    value={stats.totalManagers}
                    unitValue="accounts"
                />
                <StatsCard
                    title="Cashiers"
                    value={stats.totalCashiers}
                    unitValue="accounts"
                />
            </div>
        </div>
    );
}