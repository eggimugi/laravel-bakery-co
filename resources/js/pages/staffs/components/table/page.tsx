import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { usePermission } from '@/hooks/use-permission';
import type { User } from '@/types';
import { getColumns } from './columns';

type Props = {
    staffs: User[];
};

export function StaffTable({ staffs }: Props) {
    const { can } = usePermission();
    const columns = getColumns(can);

    return (
        <div>
            <DataTable
                columns={columns}
                data={staffs}
                toolbar={
                    <DataTableToolbar
                        searchColumn="name"
                        searchPlaceholder="Search staff..."
                        createHref="/staffs/add-staff"
                        createLabel="Add Staff"
                    />
                }
            />
        </div>
    );
}
