import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-column-header';
import type { Material } from '@/types';
import { ActionsCell } from './actions-cell';

export const getColumns = (
    can: (permission: string) => boolean,
): ColumnDef<Material>[] => [
    {
        accessorKey: 'material_name',
        header: 'Material Name',
        cell: ({ row }) => {
            const materialName = row.original.material_name;

            return (
                <span className="capitalize">{materialName}</span>
            )
        }
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ row }) => {
            const unit = row.original.unit;

            return (
                <span className="capitalize">{unit}</span>
            )
        }
    },
    {
        accessorKey: 'material_type',
        header: 'Type',
        cell: ({ row }) => {
            const materialType = row.original.material_type;

            return (
                <span className="capitalize">{materialType}</span>
            )
        }
    },
    {
        id: 'actions',
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => (
            <ActionsCell
                material={row.original}
                canEdit={can('material.update')}
                canRemove={can('material.delete')}
            />
        ),
    },
];
