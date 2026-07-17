import { Head, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/compositions';
import type { CakeWithCompositions } from '@/types';

type Props = {
    cake: CakeWithCompositions;
};

export default function ShowComposition({ cake }: Props) {
    const hasCompositions = cake.compositions.length > 0;

    return (
        <>
            <Head title={`Composition - ${cake.cake_name}`} />
            <Container>
                <div className="grid grid-cols-3">
                    <div className="">
                        <img
                            src="/cake-placeholder.png"
                            alt="Event cover"
                            className="aspect-video w-full object-contain"
                        />
                    </div>
                    <div className="col-span-2">
                        <h1 className="text-2xl font-bold">{cake.cake_name}</h1>
                        <div className="mt-4 min-h-50">
                            <h2 className="mb-2 text-xl font-semibold">
                                Ingredients
                            </h2>

                            {hasCompositions ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {cake.compositions.map((comp) => (
                                        <Card
                                            key={comp.id}
                                            className="px-4 capitalize"
                                        >
                                            {comp.quantity}{' '}
                                            {comp.material?.unit}{' '}-{' '}
                                            {comp.material?.material_name}
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No compositions yet
                                </p>
                            )}
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                            {hasCompositions ? (
                                <>
                                    <Button onClick={() => router.visit(edit(cake.id))}>Edit Composition</Button>
                                    <Button onClick={() => router.delete(destroy(cake.id))}>
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
                                    <Button onClick={() => router.visit(create(cake.id))}>
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
                    </div>
                </div>
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
                { title: cake.cake_name, href: `/compositions/show-composition/${cake.id}` },
            ]}
        >
            {children}
        </AppLayout>
    );
};
