import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { usePermission } from '@/hooks/use-permission';
import type { Supplier } from '@/types';
import { getColumns } from './columns';

type Props = {
    suppliers: Supplier[];
};

export function SupplierTable({ suppliers }: Props) {
    const { can } = usePermission();
    const columns = getColumns(can);

    return (
        <div>
            <DataTable
                columns={columns}
                data={suppliers}
                toolbar={
                    <DataTableToolbar
                        searchColumn="name"
                        searchPlaceholder="Search suppliers..."
                        createHref="/suppliers/add-supplier"
                        createLabel="Add Supplier"
                    />
                }
            />
        </div>
    );
}
