import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-column-header';
import { formatRupiah } from '@/lib/currency';
import { formatDate } from '@/lib/date';
import type { Cake } from '@/types';
import { ActionsCell } from './actions-cell';

export const getColumns = (
    can: (permission: string) => boolean,
): ColumnDef<Cake>[] => [
    {
        accessorKey: 'cake_name',
        header: 'Cake Name',
    },
    {
        accessorKey: 'cake_price',
        header: 'Price',
        cell: ({ row }) => {
            return formatRupiah(row.original.cake_price);
        },
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
    },
    {
        accessorKey: 'cake_flavour',
        header: 'Flavour',
    },
    {
        accessorKey: 'best_before',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Best Before" />
        ),
        cell: ({ row }) => {
            return formatDate(row.original.best_before);
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
                cake={row.original}
                canEdit={can('cake.update')}
                canRemove={can('cake.delete')}
            />
        ),
    },
];
