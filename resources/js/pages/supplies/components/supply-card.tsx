import { router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatRupiah } from '@/lib/currency';
import { destroy, edit, show } from '@/routes/supplies';
import type { Supply } from '@/types';

type Props = {
    supply: Supply;
    canEdit: boolean;
    canRemove: boolean;
};

export function SupplyCard({ supply, canEdit, canRemove }: Props) {
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    if (!canEdit && !canRemove) {
        return null;
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex-row items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <CardTitle>{supply.supplier.supplier_name}</CardTitle>
                        <span className="text-sm text-muted-foreground">
                            {supply.supply_date}
                        </span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {canEdit && (
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.visit(edit(supply.id))
                                    }
                                >
                                    Edit Supply
                                </DropdownMenuItem>
                            )}

                            {canRemove && (
                                <DropdownMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setShowRemoveDialog(true);
                                    }}
                                    className="text-destructive-foreground focus:text-destructive-foreground"
                                >
                                    Cancel Supply
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>

                <CardContent>
                    <CardDescription className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <p>
                                    {supply.supplier.supplier_address}
                                </p>
                                <p>
                                    {supply.supplier.supplier_phone}
                                </p>
                            </div>

                            <Badge
                                variant={
                                    supply.cancelled_at
                                        ? 'default'
                                        : 'secondary'
                                }
                            >
                                {supply.cancelled_at
                                    ? 'Cancelled'
                                    : 'Completed'}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>
                                <span className="font-semibold">
                                    Total Items:
                                </span>{' '}
                                {supply.detail_supplies.length}
                            </p>
                            <p>
                                <span className="font-semibold">Cost:</span>{' '}
                                {formatRupiah(
                                    supply.detail_supplies.reduce(
                                        (total, item) =>
                                            total +
                                            item.material_price * item.quantity,
                                        0,
                                    ),
                                )}
                            </p>
                        </div>
                    </CardDescription>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={() => {
                            router.visit(show(supply.id));
                        }}
                    >
                        View Details
                    </Button>
                </CardFooter>
            </Card>

            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to cancel{' '}
                        {supply.supplier.supplier_name} supply?
                    </DialogTitle>
                    <DialogDescription>
                        Once you cancel this supply, all of their resources and
                        data will also be permanently deleted.
                    </DialogDescription>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowRemoveDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                router.delete(destroy(supply.id).url, {
                                    onSuccess: () => {
                                        toast.success(
                                            'Supply cancelled successfully',
                                        );
                                        setShowRemoveDialog(false);
                                    },
                                });
                            }}
                        >
                            Cancel Supply
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
