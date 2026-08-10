import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import { formatTime } from '@/lib/time';
import { destroy, update } from '@/routes/orders';
import type { Order } from '@/types';

type Props = {
    order: Order;
    canManageOrder: boolean;
};

export function OrderCard({ order, canManageOrder }: Props) {
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    const totalPrice = order.detail_orders.reduce(
        (total, detailOrder) =>
            total + detailOrder.cake.cake_price * detailOrder.quantity,
        0,
    );

    if (!canManageOrder) {
        return null;
    }

    return (
        <>
            <Card className="flex h-full w-full flex-col">
                <CardHeader className="">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <h2 className="text-xl font-bold">
                                {order.user.name}
                            </h2>
                            <p className="text-muted-foreground">
                                Order #{order.id}
                            </p>
                        </div>

                        <Badge className="capitalize">{order.status}</Badge>
                    </div>

                    <div className="flex items-start justify-between">
                        <p>{formatDate(order.order_date)}</p>
                        <p>{formatTime(order.order_date)}</p>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1">
                    <div className="grid grid-cols-3 text-muted-foreground">
                        <p className="font-semibold">Cake</p>
                        <p className="text-center font-semibold">Qty</p>
                        <p className="text-right font-semibold">Subtotal</p>
                    </div>

                    {order.detail_orders.map((detailOrder) => (
                        <div
                            key={detailOrder.id}
                            className="grid grid-cols-3 items-center capitalize"
                        >
                            <p>{detailOrder.cake.cake_name}</p>
                            <p className="text-center">{detailOrder.quantity}</p>
                            <p className="text-right">
                                {formatRupiah(
                                    detailOrder.cake.cake_price *
                                        detailOrder.quantity,
                                )}
                            </p>
                        </div>
                    ))}

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="font-semibold">
                            {formatRupiah(totalPrice)}
                        </p>
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className='flex-col sm:flex-row w-full justify-between gap-4'>
                        <Button
                            disabled={
                                order.status === 'completed' ||
                                order.status === 'canceled'
                            }
                            onClick={() => {
                                router.put(
                                    update(order.id).url,
                                    {
                                        status: 'completed',
                                    },
                                    {
                                        onSuccess: () => {
                                            toast.success(
                                                `Order ${order.id} has been completed successfully.`,
                                            );
                                        },
                                    },
                                );
                            }}
                            variant={
                                order.status === 'completed'
                                    ? 'secondary'
                                    : 'secondary'
                            }
                            className='w-full sm:w-auto'
                        >
                            Finish Order
                        </Button>
                        <Button
                            disabled={
                                order.status === 'completed' ||
                                order.status === 'canceled'
                            }
                            variant="secondary"
                            onClick={() => setShowRemoveDialog(true)}
                            className='w-full sm:w-auto'
                        >
                            Cancel Order
                        </Button>
                </CardFooter>
            </Card>

            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to cancel order {order.id}?
                    </DialogTitle>
                    <DialogDescription>
                        Once you cancel this order, all of their resources and
                        data will also be permanently deleted.
                    </DialogDescription>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowRemoveDialog(false)}
                        >
                            Back
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                router.delete(destroy(order.id).url, {
                                    onSuccess: () => {
                                        setShowRemoveDialog(false);
                                        toast.success(
                                            `Order ${order.id} has been cancelled successfully.`,
                                        );
                                    },
                                });
                            }}
                        >
                            Cancel Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
