import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { create } from '@/routes/supplies';
import type { Material } from '@/types';

type Props = {
    material: Material;
};

export default function MaterialStockCard({ material }: Props) {
    return (
        <Card>
            <CardHeader className="flex-row justify-between">
                <Badge variant="secondary" className="text-sm">
                    Available: {material.stock}
                </Badge>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
                <div>
                    <p className="font-semibold">{material.material_name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                        {material.material_type}
                    </p>
                </div>

                <Button
                    onClick={() =>
                        router.visit(create())
                    }
                >
                    Add Stock
                </Button>
            </CardContent>
        </Card>
    );
}
