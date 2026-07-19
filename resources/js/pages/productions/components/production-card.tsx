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
import { destroy, edit, show } from '@/routes/productions';
import type { Production } from '@/types';

type Props = {
    production: Production;
    canEdit: boolean;
    canRemove: boolean;
};

export function ProductionCard({ production, canEdit, canRemove }: Props) {
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    if (!canEdit && !canRemove) {
        return null;
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex-row justify-between">
                    <div className="flex gap-2">
                        <Badge variant="default" className="text-sm capitalize">
                            <span className="font-semibold">Baked: </span>
                            {production.quantity}
                        </Badge>

                        <Badge
                            variant={
                                production.cancelled_at
                                    ? 'default'
                                    : 'secondary'
                            }
                            className="text-sm capitalize"
                        >
                            {production.cancelled_at
                                ? 'Cancelled'
                                : 'Completed'}
                        </Badge>
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
                                        router.visit(edit(production.id))
                                    }
                                >
                                    Edit Production
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
                                    Cancel Production
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <img
                        src="/cake-placeholder.png"
                        alt="Event cover"
                        className="aspect-video h-32 w-32 rounded-lg object-contain"
                    />

                    <div className='flex flex-col justify-between w-full'>
                        <div>
                            <CardTitle>{production.cake.cake_name}</CardTitle>
                            <CardDescription className="flex items-center justify-between">
                                <p>{production.cake.cake_flavour}</p>
                            </CardDescription>
                        </div>

                        <Button
                            className="w-full"
                            onClick={() => {
                                router.visit(show(production.cake.id));
                            }}
                        >
                            View
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to cancel{' '}
                        {production.cake.cake_name} production on{' '}
                        {production.production_date}?
                    </DialogTitle>
                    <DialogDescription>
                        Once you cancel this production, all of their resources
                        and data will also be permanently deleted.
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
                                router.delete(destroy(production.id).url, {
                                    onSuccess: () => {
                                        setShowRemoveDialog(false);
                                        toast.success(
                                            'Production cancelled successfully',
                                        );
                                    },
                                });
                            }}
                        >
                            Yes, Cancel Production
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
