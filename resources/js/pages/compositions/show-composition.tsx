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
import { create, destroy, edit, index, show } from '@/routes/compositions';
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
                        <CardTitle className="text-2xl font-bold capitalize">
                            {cake.cake_name}
                            <CardDescription className="font-normal capitalize">
                                {cake.cake_flavour}
                            </CardDescription>
                        </CardTitle>

                        <img
                            src="/cake-placeholder.png"
                            alt="Event cover"
                            className="h-56 object-contain"
                        />

                        <div className="mt-6 flex items-center gap-4">
                            {hasCompositions ? (
                                <>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            router.visit(edit(cake.id))
                                        }
                                    >
                                        Edit Composition
                                    </Button>
                                    <Button
                                        variant="secondary"
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
                                        variant="secondary"
                                        onClick={() => window.history.back()}
                                    >
                                        Back
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant='secondary'
                                        onClick={() =>
                                            router.visit(create(cake.id))
                                        }
                                    >
                                        Add Composition
                                    </Button>
                                    <Button
                                        variant='secondary'
                                        onClick={() => window.history.back()}
                                    >
                                        Back
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="col-span-3 space-y-6 pl-0">
                        <h2 className="text-xl font-semibold">Ingredients</h2>

                        {hasCompositions ? (
                            <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
                                {cake.compositions.map((comp) => (
                                    <Card
                                        key={comp.id}
                                        className="gap-0 bg-secondary px-4 py-4 leading-tight text-background capitalize"
                                    >
                                        <p>
                                            {comp.quantity}{' '}
                                            {comp.material?.unit}
                                        </p>
                                        <p className="text-muted">
                                            {comp.material?.material_name}
                                        </p>
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
                { title: 'Compositions', href: index() },
                {
                    title: cake.cake_name,
                    href: show(cake.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
