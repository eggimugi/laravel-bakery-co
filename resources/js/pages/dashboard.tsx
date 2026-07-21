import { Head, router } from '@inertiajs/react';
import {
    CakeSlice,
    Microwave,
    Package,
    ShoppingCartIcon,
    Users,
    Wheat,
} from 'lucide-react';
import { CakeCard } from '@/components/cake-card';
import { Container } from '@/components/container';
import { QuickActionCard } from '@/components/quick-action-card';
import StaffCard from '@/components/staff-card';
import { useRole } from '@/hooks/use-role';
import { formatStockMovementType } from '@/lib/stock-movement-type';
import { dashboard } from '@/routes';
import { index as cakes } from '@/routes/cakes';
import { index as materials } from '@/routes/materials';
import { create as orders } from '@/routes/orders';
import { create as productions } from '@/routes/productions';
import { index as staffs } from '@/routes/staffs';
import { create as supplies } from '@/routes/supplies';
import type { Cake, User } from '@/types';
import { CakeTable } from './cakes/components/table/page';

type Props = {
    popularCakes: Cake[];
    topStaff: User[];
    stockMovements: any[];
    allCakes: Cake[];
};

export default function Dashboard({
    popularCakes,
    topStaff,
    stockMovements,
    allCakes,
}: Props) {
    const { hasRole } = useRole();

    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <div className="hero-bg rounded-xl border p-6">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold">BakeryCo.</h1>
                            <h2 className="text-4xl font-bold">
                                Crafted by Hand,
                            </h2>
                            <h2 className="text-4xl font-bold">
                                Baked with Lovely Heart!
                            </h2>
                        </div>

                        <div>
                            <p className="text-lg text-muted-foreground">
                                Welcome to your bakery dashboard!
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Here, you can manage your bakery's operations,
                                track orders, and monitor inventory.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-medium">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                        {hasRole('owner') && (
                            <QuickActionCard
                                icon={<Users />}
                                title="Manage Staffs"
                                description="Manage your bakery's staff"
                                onClick={() => router.visit(staffs())}
                            />
                        )}
                        <QuickActionCard
                            icon={<CakeSlice />}
                            title="Cakes Menu"
                            description="Manage your bakery's menu"
                            onClick={() => router.visit(cakes())}
                        />
                        <QuickActionCard
                            icon={<Wheat />}
                            title="Materials Stock"
                            description="Check materials stock"
                            onClick={() => router.visit(materials())}
                        />
                        <QuickActionCard
                            icon={<Microwave />}
                            title="Baking Cakes"
                            description="Replenish the cake's stock"
                            onClick={() => router.visit(productions())}
                        />
                        <QuickActionCard
                            icon={<Package />}
                            title="Add Supplies"
                            description="Add materials stock"
                            onClick={() => router.visit(supplies())}
                        />
                        <QuickActionCard
                            icon={<ShoppingCartIcon />}
                            title="Make Orders"
                            description=" Make orders for customers"
                            onClick={() => router.visit(orders())}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-medium">Popular Cakes</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                        {popularCakes.map((cake) => (
                            <CakeCard key={cake.id} cake={cake} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                    <div className="col-span-2 space-y-6 xl:col-span-3">
                        <h2 className="text-lg font-medium">
                            Shout Out to BakeryCo. Staff
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
                            {topStaff.map((staff) => (
                                <StaffCard key={staff.id} staff={staff} />
                            ))}
                        </div>

                        <h2 className="text-lg font-medium">Manage Stock</h2>

                        <CakeTable cakes={allCakes} />
                    </div>

                    <div className="col-span-2 flex h-full flex-col gap-6 xl:col-span-1">
                        <h2 className="text-lg font-medium">Stock Movements</h2>

                        <div className="flex flex-1 flex-col justify-between rounded-xl border p-6">
                            {stockMovements.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No stock movements yet.
                                </p>
                            )}

                            {stockMovements.map((movement) => (
                                <div
                                    key={movement.id}
                                    className="flex justify-between border-b last:border-0"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {formatStockMovementType(
                                                movement.type,
                                            ) ?? '-'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Done by : {movement.user?.name}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-medium">
                                            {movement.stockable_type
                                                ?.split('\\')
                                                .pop()}
                                        </p>
                                        <span
                                            className={
                                                movement.quantity > 0
                                                    ? 'font-medium text-green-600'
                                                    : 'font-medium text-red-600'
                                            }
                                        >
                                            {movement.quantity > 0 ? '+' : ''}
                                            {movement.quantity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
