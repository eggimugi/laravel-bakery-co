import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useAddSupply } from '@/hooks/use-add-supply';
import { index as suppliesIndex, store } from '@/routes/supplies';
import { SupplyRowField } from './components/supply-row-field';
import { SupplyStatsHeader } from './components/supply-stats-header';

type Props = {
    suppliers: { id: number; supplier_name: string }[];
    materials: { id: number; material_name: string }[];
    stats: {
        totalSupplies: number;
        completed: number;
        cancelled: number;
    };
};

export default function AddSupply({ suppliers, materials, stats }: Props) {
    const {
        data,
        setData,
        processing,
        errors,
        updateRow,
        addRow,
        removeRow,
        post,
        reset,
    } = useAddSupply();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => {
                toast.success('Supply added successfully');
                reset();
            },
        });
    };

    return (
        <>
            <Head title={`Add Supply`} />
            <Container>
                <datalist id="supplier-suggestions">
                    {suppliers.map((supplier) => (
                        <option
                            key={supplier.id}
                            value={supplier.supplier_name}
                        />
                    ))}
                </datalist>

                <datalist id="material-suggestions">
                    {materials.map((material) => (
                        <option
                            key={material.id}
                            value={material.material_name}
                        />
                    ))}
                </datalist>

                <SupplyStatsHeader stats={stats} />

                <form
                    onSubmit={submit}
                    className="w-full rounded-xl border p-6"
                >
                    <FormHeader
                        title={`Add supply for BakeryCo.`}
                        description="Add a new supply for your bakery. Fill in the details below to add materials and their quantities."
                    />

                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
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
                                            supplier_id: matched?.id ?? null,
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
                                        setData('supply_date', e.target.value)
                                    }
                                />
                            </FormField>
                        </div>

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
                                            unit: errors[`items.${index}.unit`],
                                        }}
                                        canRemove={data.items.length > 1}
                                        onChange={(patch) =>
                                            updateRow(row.key, patch)
                                        }
                                        onRemove={() => removeRow(row.key)}
                                    />
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addRow}
                                    className="w-fit"
                                >
                                    <Plus className="mr-1 h-4 w-4" /> Add
                                    Material
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="add-supply-button"
                                >
                                    {processing && <Spinner />}
                                    Add Supply
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
}

AddSupply.layout = {
    breadcrumbs: [
        {
            title: 'Supplies',
            href: suppliesIndex(),
        },
        {
            title: 'Add Supply',
        },
    ],
};
