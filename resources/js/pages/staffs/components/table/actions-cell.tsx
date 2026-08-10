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
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { destroy, edit } from '@/routes/staffs';
import type { User } from '@/types';

type ActionsCellProps = {
    staff: User;
    canEdit: boolean;
    canFire: boolean;
};

export function ActionsCell({ staff, canEdit, canFire }: ActionsCellProps) {
    const [showFireDialog, setShowFireDialog] = useState(false);

    if (!canEdit && !canFire) {
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
                    {canEdit && (
                        <DropdownMenuItem
                            onClick={() => router.visit(edit(staff.id))}
                        >
                            Edit Staff
                        </DropdownMenuItem>
                    )}
                    {canFire && (
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                setShowFireDialog(true);
                            }}
                            className="text-destructive-foreground focus:text-destructive-foreground"
                        >
                            Fire Staff
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showFireDialog} onOpenChange={setShowFireDialog}>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to fire {staff.name}?
                    </DialogTitle>
                    <DialogDescription>
                        Once you fire this staff, all of their resources and
                        data will also be permanently deleted.
                    </DialogDescription>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowFireDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                router.delete(destroy(staff.id).url, {
                                    onSuccess: () => {
                                        setShowFireDialog(false);
                                        toast.success(
                                            'Staff fired successfully.',
                                        );
                                    },

                                    onError: () => {
                                        toast.error('Failed to fire staff.');
                                    },
                                });
                            }}
                        >
                            Fire Staff
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
