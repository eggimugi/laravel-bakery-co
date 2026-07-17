import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { usePermission } from '@/hooks/use-permission';
import type { Material } from '@/types';
import { getColumns } from './columns';

type Props = {
    materials: Material[];
};

export function MaterialTable({ materials }: Props) {
    const { can } = usePermission();
    const columns = getColumns(can);

    return (
        <div>
            <DataTable
                columns={columns}
                data={materials}
                toolbar={
                    <DataTableToolbar
                        searchColumn="material_name"
                        searchPlaceholder="Search materials..."
                        createHref="/materials/add-material"
                        createLabel="Add Material"
                    />
                }
            />
        </div>
    );
}
