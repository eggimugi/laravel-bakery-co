import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-column-header';
import type { Supplier } from '@/types';
import { ActionsCell } from './actions-cell';

export const getColumns = (
    can: (permission: string) => boolean,
): ColumnDef<Supplier>[] => [
    {
        accessorKey: 'supplier_name',
        header: 'Name',
    },
    {
        accessorKey: 'supplier_address',
        header: 'Address',
    },
    {
        accessorKey: 'supplier_phone',
        header: 'Phone',
    },
    {
        id: 'actions',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => (
            <ActionsCell
                supplier={row.original}
                canEdit={can('supplier.update')}
                canRemove={can('supplier.delete')}
            />
        ),
    },
];
