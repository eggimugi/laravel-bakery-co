import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useEditComposition } from '@/hooks/Composition Row/use-edit-composition';
import AppLayout from '@/layouts/app-layout';
import { update, index, edit } from '@/routes/compositions';
import type { CakeWithCompositions, Material } from '@/types';
import { CompositionsStatsHeader } from './components/composition-stats-header';
import { CompositionRowField } from './components/row-field';

type Props = {
    cake: CakeWithCompositions;
    materials: Material[];
    stats: {
        totalCakes: number;
        compositions: number;
        noCompositions: number;
    };
};

export default function EditComposition({ cake, materials, stats }: Props) {
    const { data, processing, errors, updateRow, addRow, removeRow, put } =
        useEditComposition(cake);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(update.url(cake.id), {
            onSuccess: () => {
                toast.success('Composition updated successfully');
            },
        });
    };

    return (
        <>
            <Head title={`Edit Composition - ${cake.cake_name}`} />
            <Container>
                <datalist id="material-suggestions">
                    {materials.map((material) => (
                        <option
                            key={material.id}
                            value={material.material_name}
                        />
                    ))}
                </datalist>

                <CompositionsStatsHeader stats={stats} />

                <form
                    onSubmit={submit}
                    className="w-full rounded-xl border p-6"
                >
                    <FormHeader
                        title={`Edit Composition for ${cake.cake_name}`}
                        description="Update the composition details for this cake. You can modify the materials and their quantities as needed."
                    />

                    <div className="grid gap-4">
                        <div className="grid gap-4">
                            <Label>Materials</Label>
                            {data.materials.map((row, index) => (
                                <CompositionRowField
                                    key={row.key}
                                    row={row}
                                    index={index}
                                    materials={materials}
                                    error={{
                                        materialId:
                                            errors[
                                                `materials.${index}.material_id`
                                            ],
                                        quantity:
                                            errors[
                                                `materials.${index}.quantity`
                                            ],
                                    }}
                                    canRemove={data.materials.length > 1}
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
                                <Plus className="mr-1 h-4 w-4" /> Add Material
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                data-test="update-composition-button"
                            >
                                {processing && <Spinner />}
                                Update Composition
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
                </form>
            </Container>
        </>
    );
}

EditComposition.layout = function Layout({
    children,
    cake,
}: {
    children: ReactNode;
    cake: CakeWithCompositions;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Compositions', href: index() },
                {
                    title: 'Edit',
                    href: edit(cake.id),
                },
                {
                    title: `${cake.cake_name}`,
                    href: edit(cake.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
