import { useForm } from '@inertiajs/react';
import { useEditableRows } from '@/hooks/use-editable-rows';
import { emptyRow, rowsFromSupply } from '@/lib/supply-row';
import type { Supply, SupplyRow } from '@/types';

type EditSupplyFormData = {
    supplier_id: number | null;
    supplier_name: string;
    supply_date: string;
    items: SupplyRow[];
};

export function useEditSupply(supply: Supply) {
    const form = useForm<EditSupplyFormData>({
        supplier_id: supply.supplier_id,
        supplier_name: supply.supplier.supplier_name,
        supply_date: supply.supply_date,
        items: rowsFromSupply(supply),
    });

    const rows = useEditableRows({
        rows: form.data.items,
        setRows: (items) => form.setData('items', items),
        createRow: emptyRow,
    });

    form.transform((data) => ({
        ...data,
        items: data.items.map((row) => ({
            ...row,
            quantity: row.quantity === '' ? 0 : row.quantity,
        })),
    }));

    return {
        ...form,
        ...rows,
    };
}
