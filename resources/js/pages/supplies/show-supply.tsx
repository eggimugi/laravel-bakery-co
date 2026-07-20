import { Head, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { destroy, edit, index, show } from '@/routes/supplies';
import type { Supply } from '@/types';
import { SupplyStatsHeader } from './components/supply-stats-header';

type Props = {
    supply: Supply;
    stats: {
        totalSupplies: number;
        completed: number;
        cancelled: number;
    };
};

export default function ShowSupply({ supply, stats }: Props) {
    return (
        <>
            <Head title={`Detail Supply - ${supply.supplier.supplier_name}`} />
            <Container>
                <SupplyStatsHeader stats={stats} />

                <Card className="grid grid-cols-1 lg:grid-cols-3">
                    <CardHeader className="justify-between">
                        <CardTitle className="text-2xl">
                            Detail Supply
                            <CardDescription>
                                <h2 className="text-lg font-medium text-primary">
                                    {supply.supplier.supplier_name}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(supply.supply_date)}
                                </p>
                            </CardDescription>
                            <div className="mt-6 space-y-6">
                                <CardDescription className="text-primary">
                                    <p className="text-base font-medium">
                                        Supplier Information
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="font-medium text-primary capitalize">
                                            Address:
                                        </span>{' '}
                                        {supply.supplier.supplier_address}
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="font-medium text-primary">
                                            Phone:
                                        </span>{' '}
                                        {supply.supplier.supplier_phone}
                                    </p>
                                </CardDescription>

                                <CardDescription>
                                    <p className="text-muted-foreground">
                                        <span className="font-medium text-primary">
                                            Total Items:
                                        </span>{' '}
                                        {supply.detail_supplies.length}
                                    </p>
                                    <p className="text-muted-foreground">
                                        <span className="font-medium text-primary">
                                            Total Cost:
                                        </span>{' '}
                                        {formatRupiah(
                                            supply.detail_supplies.reduce(
                                                (total, item) =>
                                                    total +
                                                    item.material_price *
                                                        item.quantity,
                                                0,
                                            ),
                                        )}
                                    </p>
                                </CardDescription>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="col-span-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {supply.detail_supplies.map((detail) => (
                                <Card
                                    key={detail.id}
                                    className="gap-0 px-4 text-center capitalize"
                                >
                                    <p>
                                        {detail.quantity}{' '}
                                        {detail.material?.unit} -{' '}
                                        {detail.material?.material_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatRupiah(
                                            detail.material_price *
                                                detail.quantity,
                                        )}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className='gap-6'>
                        <Button onClick={() => router.visit(edit(supply.id))}>
                            Edit Supply
                        </Button>
                        <Button
                            onClick={() =>
                                router.delete(destroy(supply.id), {
                                    onSuccess: () => {
                                        toast.success(
                                            'Supply cancelled successfully',
                                        );
                                    },
                                })
                            }
                        >
                            Cancel Supply
                        </Button>
                        <Button onClick={() => router.visit(index())}>
                            Back
                        </Button>
                    </CardFooter>
                </Card>
            </Container>
        </>
    );
}

ShowSupply.layout = function Layout({
    children,
    supply,
}: {
    children: ReactNode;
    supply: Supply;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Supplies', href: index() },
                { title: 'Detail Supply', href: show(supply.id) },
                {
                    title: supply.supplier?.supplier_name,
                    href: show(supply.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
