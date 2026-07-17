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
import { dashboard } from '@/routes';
import { index as cakes } from '@/routes/cakes';
import { index as materials } from '@/routes/materials';
import { create as orders } from '@/routes/orders';
import { create as productions } from '@/routes/productions';
import { index as staffs } from '@/routes/staffs';
import { create as supplies } from '@/routes/supplies';
import type { Cake } from '@/types';

type Props = {
    popularCakes: Cake[];
};

export default function Dashboard({ popularCakes }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <Container className='justify-between'>
                <div className="relative flex justify-between overflow-hidden rounded-2xl border p-6 before:absolute before:inset-0 before:bg-hero before:bg-size-[25%_auto] before:bg-right before:bg-no-repeat before:invert-0 before:content-[''] before:dark:invert">
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

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Quick Actions</h2>
                    <div className="grid grid-cols-6 gap-6">
                        <QuickActionCard
                            icon={<Users />}
                            title="Manage Staffs"
                            description="Manage your bakery's staff"
                            onClick={() => router.visit(staffs())}
                        />
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

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Popular Cakes</h2>
                    <div className="grid grid-cols-5 gap-6">
                        {popularCakes.map((cake) => (
                            <CakeCard key={cake.id} cake={cake} />
                        ))}
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
