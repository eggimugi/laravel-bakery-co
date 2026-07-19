import { formatRupiah } from '@/lib/currency';
import type { Cake } from '@/types';
import { Badge } from './ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

type Props = {
    cake: Cake;
};

export function CakeCard({ cake }: Props) {
    return (
        <Card className="gap-4">
            <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-sm">
                        Available: {cake.stock}
                    </Badge>

                    <Badge className="capitalize">
                        {cake.orders_count} Orders
                    </Badge>
                </div>
                <img
                    src={'/croissant.jpg'}
                    alt={cake.cake_name}
                    className="aspect-video h-44 w-full rounded-lg object-cover"
                />
            </CardHeader>

            <CardContent>
                <CardTitle>{cake.cake_name}</CardTitle>
                <CardDescription>
                    <div className="flex items-center justify-between">
                        <p>{cake.cake_flavour}</p>

                        <p className="font-semibold">
                            {formatRupiah(cake.cake_price)}
                        </p>
                    </div>
                </CardDescription>
            </CardContent>
        </Card>
    );
}
