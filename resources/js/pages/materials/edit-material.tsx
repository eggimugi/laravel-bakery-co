import { Form, Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import InputError from '@/components/form/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/materials';
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
                    className="mt-10 w-full rounded-xl border p-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">
                                    Edit Material
                                </h1>
                                <p className="text-muted-foreground">
                                    Update the material information.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="material_name">
                                        Material Name
                                    </Label>
                                    <Input
                                        id="material_name"
                                        type="text"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="material_name"
                                        placeholder="Material name"
                                        defaultValue={material.material_name}
                                    />
                                    <InputError
                                        message={errors.material_name}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="unit">Unit</Label>
                                        <Select
                                            name="unit"
                                            defaultValue={material.unit}
                                        >
                                            <SelectTrigger
                                                id="unit"
                                                tabIndex={3}
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
                                        <InputError message={errors.unit} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="material_type">
                                            Type
                                        </Label>
                                        <Select
                                            name="material_type"
                                            defaultValue={
                                                material.material_type
                                            }
                                        >
                                            <SelectTrigger
                                                id="material_type"
                                                tabIndex={3}
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
                                        <InputError
                                            message={errors.material_type}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        tabIndex={6}
                                        data-test="add-material-button"
                                    >
                                        {processing && <Spinner />}
                                        Update Material
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
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
