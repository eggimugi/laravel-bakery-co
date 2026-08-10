import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import InputError from '@/components/form/input-error';
import { NumberInput } from '@/components/form/number-input';
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
import AppLayout from '@/layouts/app-layout';
import { edit, index, update } from '@/routes/cakes';
import type { Cake } from '@/types';
import { CakeStatsHeader } from './components/cake-stats-header';

type Props = {
    cake: Cake;
    totalCakes: number;
    lessStockCakes: number;
};

export default function EditCake({ cake, totalCakes, lessStockCakes }: Props) {
    const [cakePrice, setCakePrice] = useState<number | ''>(cake.cake_price);

    return (
        <>
            <Head title="Edit Cake" />
            <Container>
                <CakeStatsHeader
                    totalCakes={totalCakes}
                    lowStock={lessStockCakes}
                />

                <Form
                    {...update.form(cake.id)}
                    onSuccess={() =>
                        toast.success('Cake updated successfully.')
                    }
                    className="w-full rounded-xl border p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold capitalize">
                                    Edit Cake {cake.cake_name}
                                </h1>
                                <p className="text-muted">
                                    Update the cake information.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <FormField
                                        id="cake_name"
                                        label="Cake Name"
                                        error={errors.cake_name}
                                    >
                                        <Input
                                            id="cake_name"
                                            type="text"
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="cake_name"
                                            name="cake_name"
                                            placeholder="Cake name"
                                            defaultValue={cake.cake_name}
                                            className="capitalize"
                                        />
                                    </FormField>

                                    <FormField
                                        id="cake_price"
                                        label="Cake Price"
                                        error={errors.cake_price}
                                    >
                                        <NumberInput
                                            id="cake_price"
                                            name="cake_price"
                                            required
                                            tabIndex={2}
                                            autoComplete="price"
                                            placeholder="0"
                                            min={0}
                                            clampOnBlur={false}
                                            formatThousands
                                            prefix="Rp"
                                            value={cakePrice}
                                            onValueChange={setCakePrice}
                                        />
                                    </FormField>

                                    <FormField
                                        id="unit"
                                        label="Unit"
                                        error={errors.unit}
                                    >
                                        <Select
                                            name="unit"
                                            defaultValue={cake.unit}
                                        >
                                            <SelectTrigger
                                                id="unit"
                                                tabIndex={3}
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select a unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="piece">
                                                    Piece
                                                </SelectItem>
                                                <SelectItem value="tray">
                                                    Tray
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormField>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        id="best_before"
                                        label="Best Before"
                                        error={errors.best_before}
                                    >
                                        <Input
                                            id="best_before"
                                            type="date"
                                            tabIndex={4}
                                            autoComplete="best-before"
                                            name="best_before"
                                            defaultValue={cake.best_before?.slice(
                                                0,
                                                10,
                                            )}
                                        />
                                    </FormField>

                                    <FormField
                                        id="cake_flavour"
                                        label="Cake Flavour"
                                        error={errors.cake_flavour}
                                    >
                                        <Input
                                            id="cake_flavour"
                                            type="text"
                                            tabIndex={5}
                                            autoComplete="flavour"
                                            name="cake_flavour"
                                            placeholder="Flavour name"
                                            defaultValue={cake.cake_flavour}
                                            className="capitalize"
                                        />
                                    </FormField>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cake_image">
                                        Cake Image
                                    </Label>
                                    <Input
                                        id="cake_image"
                                        type="text"
                                        tabIndex={6}
                                        autoComplete="image"
                                        name="cake_image"
                                        placeholder="Image URL"
                                        defaultValue={cake.cake_image}
                                    />
                                    <InputError message={errors.cake_image} />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    tabIndex={7}
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Update Cake
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </Container>
        </>
    );
}

EditCake.layout = function Layout({
    children,
    cake,
}: {
    children: ReactNode;
    cake: Cake;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Cakes', href: index() },
                {
                    title: 'Edit',
                    href: edit(cake.id),
                },
                {
                    title: cake.cake_name,
                    href: edit(cake.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
