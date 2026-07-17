import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Container } from '@/components/container';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useCreateComposition } from '@/hooks/Composition Row/use-create-composition';
import { index as compositionsIndex, store } from '@/routes/compositions';
import type { Material } from '@/types';
import { CompositionRowField } from './components/row-field';

type Props = {
    cake: { id: number; cake_name: string };
    materials: Material[];
};

export default function AddComposition({ cake, materials }: Props) {
    const {
        data,
        processing,
        errors,
        updateRow,
        addRow,
        removeRow,
        post,
    } = useCreateComposition(cake);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
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

                <form
                    onSubmit={submit}
                    className="w-full rounded-xl border p-4"
                >
                    <FormHeader
                        title={`Add Composition for ${cake.cake_name}`}
                        description="Create a new composition for your bakery. Fill in the details below to add materials and their quantities."
                    />

                    <div className="grid gap-6">
                        <div className="grid gap-3">
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
                            <Link
                                href={compositionsIndex()}
                                className="text-sm text-muted-foreground hover:underline"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
}

AddComposition.layout = {
    breadcrumbs: [
        { title: 'Compositions', href: '/compositions' },
        { title: 'Add Composition', href: '/compositions/add-composition' },
    ],
};
