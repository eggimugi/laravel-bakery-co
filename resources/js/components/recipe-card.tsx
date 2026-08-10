import { router } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
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
import { create, destroy, edit, show } from '@/routes/compositions';
import type { CakeWithCompositions } from '@/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

type Props = {
    cake: CakeWithCompositions;
    canAdd: boolean;
    canEdit: boolean;
    canRemove: boolean;
};

export function RecipeCard({ cake, canAdd, canEdit, canRemove }: Props) {
    const hasCompositions = cake.compositions.length > 0;
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    if (!canEdit && !canRemove) {
        return null;
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex-row justify-between">
                    <Badge variant="secondary" className="capitalize">
                        {hasCompositions ? 'Composition' : 'No Composition'}
                    </Badge>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {hasCompositions ? (
                                <>
                                    {canEdit && (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.visit(edit(cake.id))
                                            }
                                        >
                                            Edit Composition
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
                                            Remove Composition
                                        </DropdownMenuItem>
                                    )}
                                </>
                            ) : (
                                <>
                                    {canAdd && (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.visit(create(cake.id))
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Composition
                                        </DropdownMenuItem>
                                    )}
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>

                <CardContent>
                    <img
                        src="/cake-placeholder.png"
                        alt="Event cover"
                        className="h-40 mx-auto"
                    />

                    <div className='flex flex-col gap-4 w-full'>
                        <div>
                            <CardTitle className='capitalize'>{cake.cake_name}</CardTitle>
                            <CardDescription className="flex items-center justify-between">
                                <p className='capitalize'>{cake.cake_flavour}</p>

                                <p className='capitalize'>{cake.unit}</p>
                            </CardDescription>
                        </div>

                        <Button
                            className="w-full"
                            onClick={() => {
                                router.visit(show(cake.id));
                            }}
                            variant="secondary"
                        >
                            View
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to remove {cake.cake_name}{' '}
                        compositions?
                    </DialogTitle>
                    <DialogDescription>
                        Once you remove this cake compositions, all of their
                        resources and data will also be permanently deleted.
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
                                router.delete(destroy(cake.id).url, {
                                    onSuccess: () => {
                                        setShowRemoveDialog(false);
                                        toast.success(
                                            'Composition deleted successfully',
                                        );
                                    },
                                });
                            }}
                        >
                            Remove Composition
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
