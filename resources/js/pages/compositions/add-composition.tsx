import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCreateComposition } from '@/hooks/Composition Row/use-create-composition';
import { index, store } from '@/routes/compositions';
import type { Material } from '@/types';
import { CompositionsStatsHeader } from './components/composition-stats-header';
import { CompositionRowField } from './components/row-field';

type Props = {
    cake: { id: number; cake_name: string };
    materials: Material[];
    stats: {
        totalCakes: number;
        compositions: number;
        noCompositions: number;
    };
};

export default function AddComposition({ cake, materials, stats }: Props) {
    const {
        data,
        processing,
        errors,
        updateRow,
        addRow,
        removeRow,
        post,
        reset,
    } = useCreateComposition(cake);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => {
                toast.success('Composition created successfully');
                reset();
            },
        });
    };

    return (
        <>
            <Head title={`Add Composition - ${cake.cake_name}`} />
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
                        title={`Add Composition for ${cake.cake_name}`}
                        description="Create a new composition for your bakery. Fill in the details below to add materials and their quantities."
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
                                data-test="add-composition-button"
                            >
                                {processing && <Spinner />}
                                Create Composition
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

AddComposition.layout = {
    breadcrumbs: [
        { title: 'Compositions', href: index() },
        { title: 'Add Composition', href: '/compositions/add-composition' },
    ],
};
