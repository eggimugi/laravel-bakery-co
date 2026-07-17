import { useForm } from '@inertiajs/react';
import { emptyRow } from '@/lib/composition-row';
import type { CompositionRow } from '@/types';
import { useCompositionRows } from './use-composition-row';

type Cake = {
    id: number;
    cake_name: string;
};

export function useCreateComposition(cake: Cake) {
    const form = useForm<{
        cake_name: string;
        cake_id: number | null;
        materials: CompositionRow[];
    }>({
        cake_name: cake.cake_name,
        cake_id: cake.id,
        materials: [emptyRow()],
    });

    const rows = useCompositionRows({
        rows: form.data.materials,
        setRows: (materials) => form.setData('materials', materials),
    });

    form.transform((data) => ({
        ...data,
        materials: data.materials.map((row) => ({
            ...row,
            quantity: row.quantity === '' ? 0 : row.quantity,
        })),
    }));

    return {
        ...form,
        ...rows,
    };
}
