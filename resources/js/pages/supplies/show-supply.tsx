import { Head, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { destroy, edit, index, show } from '@/routes/supplies';
import type { Supply } from '@/types';

type Props = {
    supply: Supply;
};

export default function ShowSupply({ supply }: Props) {
    return (
        <>
            <Head title={`Detail Supply - ${supply.supplier.supplier_name}`} />
            <Container>
                <div className="grid grid-cols-3 rounded-xl border p-4">
                    <div className="">
                        <h1 className="text-2xl font-bold">Detail Supply</h1>
                        <h2 className="text-lg font-medium">
                            {supply.supplier.supplier_name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(supply.supply_date)}
                        </p>

                        <p className="mt-12 mb-3 font-medium">
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

                        <div className="mt-6 flex items-center gap-4">
                            <Button
                                onClick={() => router.visit(edit(supply.id))}
                            >
                                Edit Supply
                            </Button>
                            <Button
                                onClick={() =>
                                    router.delete(destroy(supply.id))
                                }
                            >
                                Cancel Supply
                            </Button>
                            <Button onClick={() => router.visit(index())}>
                                Back
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {supply.detail_supplies.map((detail) => (
                                <Card
                                    key={detail.id}
                                    className="px-4 text-center capitalize gap-0"
                                >
                                    <p>
                                        {detail.quantity}{' '}
                                        {detail.material?.unit} -{' '}
                                        {detail.material?.material_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatRupiah(detail.material_price * detail.quantity)}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
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
