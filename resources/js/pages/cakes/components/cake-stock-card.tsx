import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { create } from '@/routes/productions';
import type { Cake } from '@/types';

type Props = {
    cake: Cake;
};

export default function CakeStockCard({ cake }: Props) {
    return (
        <Card>
            <CardHeader className="flex-row justify-between">
                <Badge variant="secondary" className="text-sm">
                    Available: {cake.stock}
                </Badge>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
                <div>
                    <p className="font-semibold">{cake.cake_name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                        {cake.cake_flavour}
                    </p>
                </div>

                <Button
                    onClick={() =>
                        router.visit(create({ query: { cake_id: cake.id } }))
                    }
                >
                    Add Stock
                </Button>
            </CardContent>
        </Card>
    );
}
