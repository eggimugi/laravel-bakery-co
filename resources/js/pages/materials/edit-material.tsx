import { Form, Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { edit, index, update } from '@/routes/materials';
import type { Material } from '@/types';
import { MaterialStatsHeader } from './components/material-stats-header';

type Props = {
    material: Material;
    stats: {
        totalMaterials: number;
        liquid: number;
        powder: number;
        solid: number;
    };
};

export default function EditMaterial({ material, stats }: Props) {
    return (
        <>
            <Head title="Edit Material" />
            <Container>
                <MaterialStatsHeader stats={stats} />

                <Form
                    {...update.form(material.id)}
                    onSuccess={() =>
                        toast.success('Material updated successfully!')
                    }
                    className="w-full rounded-xl border p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold">
                                    Edit Material
                                </h1>
                                <p className="text-muted">
                                    Update the material information.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    id="material_name"
                                    label="Material Name"
                                    error={errors.material_name}
                                >
                                    <Input
                                        id="material_name"
                                        type="text"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="material_name"
                                        placeholder="Material name"
                                        defaultValue={material.material_name}
                                        className='capitalize'
                                    />
                                </FormField>

                                <FormField
                                    id="unit"
                                    label="Unit"
                                    error={errors.unit}
                                >
                                    <Select
                                        name="unit"
                                        defaultValue={material.unit}
                                    >
                                        <SelectTrigger
                                            id="unit"
                                            tabIndex={2}
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="item">
                                                Item
                                            </SelectItem>
                                            <SelectItem value="gr">
                                                Gram
                                            </SelectItem>
                                            <SelectItem value="kg">
                                                Kilogram
                                            </SelectItem>
                                            <SelectItem value="ml">
                                                Milliliter
                                            </SelectItem>
                                            <SelectItem value="l">
                                                Liter
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormField>

                                <FormField
                                    id="material_type"
                                    label="Type"
                                    error={errors.material_type}
                                >
                                    <Select
                                        name="material_type"
                                        defaultValue={material.material_type}
                                    >
                                        <SelectTrigger
                                            id="material_type"
                                            tabIndex={3}
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="liquid">
                                                Liquid
                                            </SelectItem>
                                            <SelectItem value="powder">
                                                Powder
                                            </SelectItem>
                                            <SelectItem value="solid">
                                                Solid
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormField>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="submit"
                                        tabIndex={4}
                                        data-test="add-material-button"
                                    >
                                        {processing && <Spinner />}
                                        Update Material
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
                        </>
                    )}
                </Form>
            </Container>
        </>
    );
}

EditMaterial.layout = function Layout({
    children,
    material,
}: {
    children: ReactNode;
    material: Material;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Materials', href: index() },
                {
                    title: 'Edit',
                    href: edit(material.id),
                },
                {
                    title: material.material_name,
                    href: edit(material.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
