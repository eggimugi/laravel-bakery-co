import { Form, Head } from '@inertiajs/react';
import { Container } from '@/components/container';
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
import { update } from '@/routes/cakes';
import type { Cake } from '@/types';
import { CakeStatsHeader } from './components/cake-stats-header';
import InputError from '@/components/form/input-error';

type Props = {
    cake: Cake;
    totalCakes: number;
};

export default function EditCake({ cake, totalCakes }: Props) {
    return (
        <>
            <Head title="Edit Cake" />
            <Container>
                <CakeStatsHeader totalCakes={totalCakes} />

                <Form
                    {...update.form(cake.id)}
                    className="mt-10 w-full rounded-xl border p-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">
                                    Edit Cake
                                </h1>
                                <p className="text-muted-foreground">
                                    Update the cake information.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="cake_name">Cake Name</Label>
                                    <Input
                                        id="cake_name"
                                        type="text"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="cake_name"
                                        name="cake_name"
                                        placeholder="Cake name"
                                        defaultValue={cake.cake_name}
                                    />
                                    <InputError message={errors.cake_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cake_price">
                                        Cake Price
                                    </Label>
                                    <Input
                                        id="cake_price"
                                        type="number"
                                        tabIndex={2}
                                        autoComplete="price"
                                        name="cake_price"
                                        placeholder="0.00"
                                        defaultValue={cake.cake_price}
                                    />
                                    <InputError message={errors.cake_price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="unit">Unit</Label>
                                    <Select
                                        name="unit"
                                        defaultValue={cake.unit}
                                    >
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
                                    <InputError message={errors.unit} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cake_image">
                                        Cake Image
                                    </Label>
                                    <Input
                                        id="cake_image"
                                        type="text"
                                        tabIndex={4}
                                        autoComplete="image"
                                        name="cake_image"
                                        placeholder="Image URL"
                                        defaultValue={cake.cake_image}
                                    />
                                    <InputError message={errors.cake_image} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="best_before">
                                        Best Before
                                    </Label>
                                    <Input
                                        id="best_before"
                                        type="date"
                                        tabIndex={5}
                                        autoComplete="best-before"
                                        name="best_before"
                                        defaultValue={cake.best_before?.slice(
                                            0,
                                            10,
                                        )}
                                    />
                                    <InputError message={errors.best_before} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cake_flavour">
                                        Cake Flavour
                                    </Label>
                                    <Input
                                        id="cake_flavour"
                                        type="text"
                                        tabIndex={6}
                                        autoComplete="flavour"
                                        name="cake_flavour"
                                        placeholder="Flavour name"
                                        defaultValue={cake.cake_flavour}
                                    />
                                    <InputError message={errors.cake_flavour} />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {processing && <Spinner />}
                                    Update Cake
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
                        </>
                    )}
                </Form>
            </Container>
        </>
    );
}
