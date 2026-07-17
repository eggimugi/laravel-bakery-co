import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { usePermission } from '@/hooks/use-permission';
import type { Cake } from '@/types';
import { getColumns } from './columns';

type Props = {
    cakes: Cake[];
};

export function CakeTable({ cakes }: Props) {
    const { can } = usePermission();
    const columns = getColumns(can);

    return (
        <div>
            <DataTable
                columns={columns}
                data={cakes}
                toolbar={
                    <DataTableToolbar
                        searchColumn="cake_name"
                        searchPlaceholder="Search cakes..."
                        createHref="/cakes/add-cake"
                        createLabel="Add Cake"
                    />
                }
            />
        </div>
    );
}
