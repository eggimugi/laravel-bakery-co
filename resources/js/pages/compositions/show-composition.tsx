import { Head, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/compositions';
import type { CakeWithCompositions } from '@/types';
import { CompositionsStatsHeader } from './components/composition-stats-header';

type Props = {
    cake: CakeWithCompositions;
    stats: {
        totalCakes: number;
        compositions: number;
        noCompositions: number;
    };
};

export default function ShowComposition({ cake, stats }: Props) {
    const hasCompositions = cake.compositions.length > 0;

    return (
        <>
            <Head title={`Composition - ${cake.cake_name}`} />
            <Container>
                <CompositionsStatsHeader stats={stats} />

                <Card className="grid grid-cols-5 flex-row">
                    <CardHeader className="col-span-2">
                        <CardTitle className="text-2xl font-bold">
                            {cake.cake_name}
                        </CardTitle>

                        <img
                            src="/cake-placeholder.png"
                            alt="Event cover"
                            className="mx-auto h-56 w-full object-contain"
                        />

                        <CardDescription className="text-base text-primary">
                            <p>
                                <span className="font-semibold">Flavour:</span>{' '}
                                {cake.cake_flavour}
                            </p>
                            <p>
                                <span className="font-semibold">Stock:</span>{' '}
                                {cake.stock}{' '}
                                <span className="capitalize">
                                    {cake.unit}
                                </span>{' '}
                            </p>
                        </CardDescription>

                        <div className="mt-6 flex items-center gap-4">
                            {hasCompositions ? (
                                <>
                                    <Button
                                        onClick={() =>
                                            router.visit(edit(cake.id))
                                        }
                                    >
                                        Edit Composition
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            router.delete(destroy(cake.id), {
                                                onSuccess: () => {
                                                    toast.success(
                                                        'Composition deleted successfully',
                                                    );
                                                },
                                            })
                                        }
                                    >
                                        Delete Composition
                                    </Button>
                                    <Button
                                        onClick={() => router.visit(index())}
                                    >
                                        Back
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={() =>
                                            router.visit(create(cake.id))
                                        }
                                    >
                                        Add Composition
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(index())}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="col-span-3 space-y-6">
                        <h2 className="text-xl font-semibold">Ingredients</h2>

                        {hasCompositions ? (
                            <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
                                {cake.compositions.map((comp) => (
                                    <Card
                                        key={comp.id}
                                        className="px-4 capitalize"
                                    >
                                        {comp.quantity} {comp.material?.unit} -{' '}
                                        {comp.material?.material_name}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No compositions yet
                            </p>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

ShowComposition.layout = function Layout({
    children,
    cake,
}: {
    children: ReactNode;
    cake: CakeWithCompositions;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Cakes', href: '/cakes' },
                { title: 'Compositions', href: `/compositions` },
                {
                    title: cake.cake_name,
                    href: `/compositions/show-composition/${cake.id}`,
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
