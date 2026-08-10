import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { NumberInput } from '@/components/form/number-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/date';
import { edit, index, update } from '@/routes/productions';
import type { Production } from '@/types';
import { ProductionStatsHeader } from './components/production-stats-header';

type Props = {
    production: Production;
    stats: {
        totalProductions: number;
        completed: number;
        cancelled: number;
    };
};

export default function EditProduction({ production, stats }: Props) {
    const [quantity, setQuantity] = useState<number | ''>(production.quantity);

    return (
        <>
            <Head title={`Edit Production - ${production.cake?.cake_name}`} />
            <Container>
                <ProductionStatsHeader stats={stats} />

                <Form
                    {...update.form(production.id)}
                    onSuccess={() =>
                        toast.success('Production updated successfully.')
                    }
                    className="w-full rounded-xl border p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <FormHeader
                                title={`Edit Production ${production.cake?.cake_name}`}
                                description="Update the production information."
                            />

                            <div className="grid grid-cols-3 gap-4">
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
                                        value={production.cake?.cake_name}
                                        disabled
                                        className="capitalize"
                                    />
                                </FormField>

                                <input
                                    type="hidden"
                                    name="cake_id"
                                    value={production.cake_id}
                                />

                                <FormField
                                    id="quantity"
                                    label="Quantity"
                                    error={errors.quantity}
                                >
                                    <NumberInput
                                        id="quantity"
                                        name="quantity"
                                        required
                                        tabIndex={2}
                                        placeholder="Quantity"
                                        min={0}
                                        clampOnBlur={false}
                                        value={quantity}
                                        onValueChange={setQuantity}
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
                                        defaultValue={production.production_date?.slice(
                                            0,
                                            10,
                                        )}
                                        name="production_date"
                                    />
                                </FormField>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2"
                                >
                                    {processing && (
                                        <Spinner className="h-4 w-4" />
                                    )}
                                    Update Production
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

EditProduction.layout = function Layout({
    children,
    production,
}: {
    children: ReactNode;
    production: Production;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Production History', href: index() },
                { title: 'Edit Production', href: edit(production.id) },
                {
                    title: `${production.cake?.cake_name} - ${formatDate(production.production_date)}`,
                    href: edit(production.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
