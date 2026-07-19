import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useAddProduction } from '@/hooks/use-add-production';
import { create, index, store } from '@/routes/productions';
import { ProductionStatsHeader } from './components/production-stats-header';

type Props = {
    cakes: { id: number; cake_name: string }[];
    selectedCakeId?: number | null;
    stats: {
        totalProductions: number;
        completed: number;
        cancelled: number;
    };
};

export default function AddProduction({ cakes, selectedCakeId, stats }: Props) {
    const { data, setData, post, processing, errors, findCakeByName, reset } =
        useAddProduction(cakes);

    const preselectedCake = selectedCakeId
        ? cakes.find((cake) => cake.id === selectedCakeId)
        : undefined;

    const [cakeNameInput, setCakeNameInput] = useState(
        preselectedCake?.cake_name ?? '',
    );

    const [date, setDate] = useState(() => {
        const today = new Date();

        return today.toISOString().split('T')[0];
    });

    // sync ke form data begitu komponen mount
    useEffect(() => {
        if (preselectedCake) {
            setData('cake_id', preselectedCake.id);
            setData('production_date', date);
        }
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onSuccess: () => {
                toast.success('Production created successfully.');
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Add Production" />
            <Container>
                <datalist id="cake-suggestions">
                    {cakes.map((cake) => (
                        <option key={cake.id} value={cake.cake_name} />
                    ))}
                </datalist>

                <ProductionStatsHeader stats={stats} />

                <form
                    onSubmit={submit}
                    className="w-full rounded-xl border p-4"
                >
                    <FormHeader
                        title="Add Production"
                        description="Create a new production entry for your bakery. Fill in the details below to add the production information."
                    />

                    <div className="grid gap-6">
                        <FormField
                            id="cake_name"
                            label="Cake Name"
                            error={errors.cake_id}
                        >
                            <Input
                                id="cake_name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                placeholder="Cake name"
                                list="cake-suggestions"
                                value={cakeNameInput}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCakeNameInput(inputValue);

                                    const matchedCake =
                                        findCakeByName(inputValue);
                                    setData('cake_id', matchedCake?.id ?? null);
                                }}
                            />
                            {data.cake_id === null && data.cake_id !== '' && (
                                <p className="text-sm text-destructive">
                                    Cake not found.
                                </p>
                            )}
                        </FormField>

                        <FormField
                            id="quantity"
                            label="Quantity"
                            error={errors.quantity}
                        >
                            <Input
                                id="quantity"
                                type="number"
                                required
                                tabIndex={2}
                                placeholder="Quantity produced"
                                value={data.quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setData(
                                        'quantity',
                                        value === '' ? '' : Number(value),
                                    );
                                }}
                            />
                        </FormField>

                        <FormField
                            id="production_date"
                            label="Production Date"
                            error={errors.production_date}
                        >
                            <Input
                                id="production_date"
                                type="date"
                                required
                                tabIndex={3}
                                placeholder="Production date"
                                value={data.production_date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setData('production_date', e.target.value);
                                }}
                            />
                        </FormField>

                        <div className="flex items-center gap-3 pt-2">
                            <Button type="submit" tabIndex={6}>
                                {processing && <Spinner />}
                                Create Production
                            </Button>
                            <Link
                                href={index()}
                                tabIndex={7}
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

AddProduction.layout = {
    breadcrumbs: [
        { title: 'Productions', href: index() },
        { title: 'Add Production', href: create() },
    ],
};
