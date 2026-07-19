import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useEditSupply } from '@/hooks/use-edit-supply';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { edit, index, update } from '@/routes/supplies';
import type { Supply } from '@/types';
import { SupplyRowField } from './components/supply-row-field';
import { SupplyStatsHeader } from './components/supply-stats-header';

type Props = {
    supply: Supply;
    suppliers: { id: number; supplier_name: string }[];
    materials: { id: number; material_name: string }[];
    stats: {
        totalSupplies: number;
        completed: number;
        cancelled: number;
    };
};

export default function EditSupply({ supply, suppliers, materials, stats }: Props) {
    const {
        data,
        setData,
        processing,
        errors,
        updateRow,
        addRow,
        removeRow,
        put,
        reset
    } = useEditSupply(supply);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(supply.id), {
            onSuccess: () => {
                toast.success('Supply updated successfully');
                reset()
            }
        });
    };

    return (
        <>
            <Head
                title={`Edit Detail Supply - ${supply.supplier.supplier_name}`}
            />
            <Container>
                <SupplyStatsHeader stats={stats} />

                <div className="grid grid-cols-3 rounded-xl border p-4">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Edit Detail Supply
                            </h1>
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
                        </div>

                        <div>
                            <p>
                                <span className="font-semibold">
                                    Total Items:
                                </span>{' '}
                                {supply.detail_supplies.length}
                            </p>
                            <p>
                                <span className="font-semibold">Cost:</span>{' '}
                                {formatRupiah(
                                    supply.detail_supplies.reduce(
                                        (total, item) =>
                                            total +
                                            item.material_price * item.quantity,
                                        0,
                                    ),
                                )}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{' '}
                                <Badge
                                    variant={
                                        supply.cancelled_at
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {supply.cancelled_at
                                        ? 'Cancelled'
                                        : 'Completed'}
                                </Badge>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <form
                            onSubmit={submit}
                            className="w-full rounded-xl border p-4"
                        >
                            <FormHeader
                                title={`Edit supply data for ${supply.supplier.supplier_name} on ${formatDate(supply.supply_date)}`}
                                description="Edit the supply data for your bakery. Fill in the details below to update materials and their quantities."
                            />

                            <div className="grid gap-6">
                                <FormField
                                    id="supplier"
                                    label="Supplier"
                                    error={errors.supplier_id}
                                >
                                    <Input
                                        id="supplier"
                                        type="text"
                                        required
                                        tabIndex={1}
                                        placeholder="Supplier name"
                                        list="supplier-suggestions"
                                        value={data.supplier_name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const matched = suppliers.find(
                                                (s) =>
                                                    s.supplier_name.toLowerCase() ===
                                                    e.target.value
                                                        .trim()
                                                        .toLowerCase(),
                                            );
                                            setData((prev) => ({
                                                ...prev,
                                                supplier_name: value,
                                                supplier_id:
                                                    matched?.id ?? null,
                                            }));
                                        }}
                                    />
                                </FormField>

                                <FormField
                                    id="supply_date"
                                    label="Supply Date"
                                    error={errors.supply_date}
                                >
                                    <Input
                                        id="supply_date"
                                        type="date"
                                        required
                                        tabIndex={2}
                                        placeholder="Input a date"
                                        value={data.supply_date}
                                        onChange={(e) =>
                                            setData(
                                                'supply_date',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormField>

                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label>Materials</Label>
                                        {data.items.map((row, index) => (
                                            <SupplyRowField
                                                key={row.key}
                                                row={row}
                                                index={index}
                                                materials={materials}
                                                error={{
                                                    materialId:
                                                        errors[
                                                            `items.${index}.material_id`
                                                        ],
                                                    material_price:
                                                        errors[
                                                            `items.${index}.material_price`
                                                        ],
                                                    quantity:
                                                        errors[
                                                            `items.${index}.quantity`
                                                        ],
                                                    unit: errors[
                                                        `items.${index}.unit`
                                                    ],
                                                }}
                                                canRemove={
                                                    data.items.length > 1
                                                }
                                                onChange={(patch) =>
                                                    updateRow(row.key, patch)
                                                }
                                                onRemove={() =>
                                                    removeRow(row.key)
                                                }
                                            />
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addRow}
                                            className="w-fit"
                                        >
                                            <Plus className="mr-1 h-4 w-4" />{' '}
                                            Add Material
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            data-test="add-supply-button"
                                        >
                                            {processing && <Spinner />}
                                            Update Supply
                                        </Button>
                                        <Link
                                            href={index()}
                                            className="text-sm text-muted-foreground hover:underline"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}

EditSupply.layout = function Layout({
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
                { title: 'Edit Supply', href: edit(supply.id) },
                {
                    title: supply.supplier?.supplier_name,
                    href: edit(supply.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
