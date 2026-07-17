import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-column-header';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import type { User } from '@/types';
import { ActionsCell } from './actions-cell';

export const getColumns = (
    can: (permission: string) => boolean,
): ColumnDef<User>[] => [
    {
        accessorKey: 'name',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: 'email',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'roles',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            const roleName = row.original.roles?.[0]?.name ?? '-';

            return (
                <Badge variant="secondary" className="capitalize">
                    {roleName}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'created_at',
        enableSorting: true,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Joined Date" />
        ),
        cell: ({ row }) => {
            return formatDate(row.original.created_at);
        },
    },
    {
        id: 'actions',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => (
            <ActionsCell
                staff={row.original}
                canEdit={can('user.update')}
                canFire={can('user.delete')}
            />
        ),
    },
];
