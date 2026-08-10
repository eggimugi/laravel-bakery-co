import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { NumberInput } from '@/components/form/number-input';
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
import { create, index, store } from '@/routes/cakes';
import type { Cake } from '@/types/cake';
import { CakeStatsHeader } from './components/cake-stats-header';

type Props = {
    cakes: Cake[];
    lessStockCakes: number;
};

export default function AddCake({ cakes, lessStockCakes }: Props) {
    const [cakePrice, setCakePrice] = useState<number | ''>('');

    return (
        <>
            <Head title="Add Cake" />
            <Container>
                <CakeStatsHeader
                    totalCakes={cakes.length}
                    lowStock={lessStockCakes}
                />

                <Form
                    {...store.form()}
                    onSuccess={() =>
                        toast.success('Cake created successfully.')
                    }
                    resetOnSuccess
                    disableWhileProcessing
                    className="w-full rounded-xl border p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold">Add Cake</h1>
                                <p className="text-muted">
                                    Create a new cake menu for your bakery.
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
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="cake_name"
                                            placeholder="Cake name"
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
                                        <Select name="unit">
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
                                            required
                                            tabIndex={5}
                                            autoComplete="best-before"
                                            name="best_before"
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
                                            tabIndex={6}
                                            autoComplete="flavour"
                                            name="cake_flavour"
                                            placeholder="Flavour name"
                                        />
                                    </FormField>
                                </div>
                                <FormField
                                    id="cake_image"
                                    label="Cake Image"
                                    error={errors.cake_image}
                                >
                                    <Input
                                        id="cake_image"
                                        type="text"
                                        tabIndex={4}
                                        autoComplete="image"
                                        name="cake_image"
                                        placeholder="Image URL"
                                    />
                                </FormField>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        tabIndex={6}
                                        data-test="add-cake-button"
                                    >
                                        {processing && <Spinner />}
                                        Create Cake
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

AddCake.layout = {
    breadcrumbs: [
        { title: 'Cakes', href: index() },
        { title: 'Add Cake', href: create() },
    ],
};
