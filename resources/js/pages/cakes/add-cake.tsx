import { Form, Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
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
import { index as cakesIndex, store } from '@/routes/cakes';
import type { Cake } from '@/types/cake';
import { CakeStatsHeader } from './components/cake-stats-header';

type Props = {
    cakes: Cake[];
};

export default function AddCake({ cakes }: Props) {
    return (
        <>
            <Head title="Add Cake" />
            <Container>
                <CakeStatsHeader totalCakes={cakes.length} />

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="w-full rounded-xl border p-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">Add Cake</h1>
                                <p className="text-muted-foreground">
                                    Create a new cake menu for your bakery.
                                </p>
                            </div>

                            <div className="grid gap-6">
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
                                    <Input
                                        id="cake_price"
                                        type="number"
                                        required
                                        tabIndex={2}
                                        autoComplete="price"
                                        name="cake_price"
                                        placeholder="0.00"
                                    />
                                </FormField>

                                <FormField
                                    id="unit"
                                    label="Unit"
                                    error={errors.unit}
                                >
                                    <Select name="unit">
                                        <SelectTrigger id="unit" tabIndex={3}>
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

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        tabIndex={6}
                                        data-test="add-cake-button"
                                    >
                                        {processing && <Spinner />}
                                        Create Cake
                                    </Button>
                                    <Link
                                        href={cakesIndex()}
                                        tabIndex={7}
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Cancel
                                    </Link>
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
        { title: 'Cakes', href: '/cakes' },
        { title: 'Add Cake', href: '/cakes/add-cake' },
    ],
};
