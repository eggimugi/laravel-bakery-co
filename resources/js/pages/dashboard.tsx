import { Head, router } from '@inertiajs/react';
import {
    CakeSlice,
    Microwave,
    Package,
    ReceiptText,
    ShoppingCartIcon,
    Users,
    Wheat,
} from 'lucide-react';
import { CakeCard } from '@/components/cake-card';
import { Container } from '@/components/container';
import { QuickActionCard } from '@/components/quick-action-card';
import StaffCard from '@/components/staff-card';
import { Button } from '@/components/ui/button';
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
                <div className="flex items-center justify-between gap-12">
                    <div className="flex h-full flex-col items-start justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-extrabold xs:text-5xl">
                                BakeryCo.
                            </h1>
                            <h2 className="text-4xl font-extrabold xs:text-5xl">
                                Crafted by Hand,
                            </h2>
                            <h2 className="text-4xl font-extrabold xs:text-5xl">
                                Baked with Lovely Heart!
                            </h2>

                            <p className="mt-4 xs:text-lg">
                                Welcome to your bakery dashboard!
                            </p>
                            <p className="xs:text-lg">
                                Here, you can manage your bakery's operations,
                                track orders, and monitor inventory.
                            </p>
                        </div>

                        <div className="hidden gap-8 xs:flex">
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold">40</p>
                                <p className="flex flex-col leading-none font-bold">
                                    Today's <span>Orders</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold">40</p>
                                <p className="flex flex-col leading-none font-bold">
                                    Low Bakery<span>Stock</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold">40</p>
                                <p className="flex flex-col leading-none font-bold">
                                    Low Material<span>Stock</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-4 xs:flex-row xs:gap-8">
                            <Button className="w-full xs:w-40">
                                <ShoppingCartIcon className="size-4" />
                                Make an Order
                            </Button>
                            <Button
                                className="w-full xs:w-40"
                                variant="outline"
                            >
                                <ReceiptText className="size-4" />
                                View Orders
                            </Button>
                        </div>
                    </div>
                    <img
                        src="/dashboard.png"
                        alt="Bakery Dashboard"
                        className="hidden h-72 lg:block xl:h-95"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                    {hasRole('owner') && (
                        <QuickActionCard
                            icon={<Users />}
                            title="Manage Staffs"
                            onClick={() => router.visit(staffs())}
                        />
                    )}
                    <QuickActionCard
                        icon={<CakeSlice />}
                        title="Cakes Menu"
                        onClick={() => router.visit(cakes())}
                    />
                    <QuickActionCard
                        icon={<Wheat />}
                        title="Materials Stock"
                        onClick={() => router.visit(materials())}
                    />
                    <QuickActionCard
                        icon={<Microwave />}
                        title="Baking Cakes"
                        onClick={() => router.visit(productions())}
                    />
                    <QuickActionCard
                        icon={<Package />}
                        title="Add Supplies"
                        onClick={() => router.visit(supplies())}
                    />
                    <QuickActionCard
                        icon={<ShoppingCartIcon />}
                        title="Make Orders"
                        onClick={() => router.visit(orders())}
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        BakeryCo. Popular Cakes
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                        {popularCakes.map((cake) => (
                            <CakeCard key={cake.id} cake={cake} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                    <div className="col-span-2 space-y-6 xl:col-span-3">
                        <h2 className="text-xl font-semibold">
                            Shout Out to BakeryCo. Staff
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
                            {topStaff.map((staff) => (
                                <StaffCard key={staff.id} staff={staff} />
                            ))}
                        </div>

                        <h2 className="hidden text-xl font-semibold md:block">
                            Manage Stock
                        </h2>

                        <div className="hidden md:block">
                            <CakeTable cakes={allCakes} />
                        </div>
                    </div>

                    <div className="col-span-2 flex h-full flex-col gap-6 xl:col-span-1">
                        <h2 className="text-xl font-semibold">
                            Stock Movements
                        </h2>

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
