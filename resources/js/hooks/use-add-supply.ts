import { useForm } from '@inertiajs/react';
import { useEditableRows } from '@/hooks/use-editable-rows';
import { emptyRow } from '@/lib/supply-row';
import type { SupplyRow } from '@/types';

type AddSupplyFormData = {
    supplier_id: number | null;
    supplier_name: string;
    supply_date: string;
    items: SupplyRow[];
};

export function useAddSupply() {
    const form = useForm<AddSupplyFormData>({
        supplier_id: null,
        supplier_name: '',
        supply_date: '',
        items: [emptyRow()],
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
