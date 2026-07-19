import { router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { destroy, edit } from '@/routes/materials';
import type { Material } from '@/types';

type ActionsCellProps = {
    material: Material;
    canEdit: boolean;
    canRemove: boolean;
};

export function ActionsCell({ material, canEdit, canRemove }: ActionsCellProps) {
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    if (!canEdit && !canRemove) {
        return null;
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {canEdit && (
                        <DropdownMenuItem
                            onClick={() => router.visit(edit(material.id))}
                        >
                            Edit Material
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
                            Remove Material
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to remove {material.material_name}?
                    </DialogTitle>
                    <DialogDescription>
                        Once you remove this material, all of their resources and
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
                                router.delete(destroy(material.id).url, {
                                    onSuccess: () => {
                                        setShowRemoveDialog(false)
                                        toast.success('Material removed successfully.');
                                    },

                                    onError: () => {
                                        toast.error('Failed to remove material.');
                                    }
                                });
                            }}
                        >
                            Remove Material
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
