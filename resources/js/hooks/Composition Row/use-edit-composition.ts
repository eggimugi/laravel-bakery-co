import { useForm } from '@inertiajs/react';
import { rowsFromCake } from '@/lib/composition-row';
import type { CakeWithCompositions, CompositionRow } from '@/types';
import { useCompositionRows } from './use-composition-row';

export function useEditComposition(cake: CakeWithCompositions) {
    const form = useForm<{
        materials: CompositionRow[];
    }>({
        materials: rowsFromCake(cake),
    });

    const rows = useCompositionRows({
        rows: form.data.materials,
        setRows: (materials) => form.setData('materials', materials),
    });

    form.transform((data) => ({
        ...data,
        materials: data.materials.map((row) => ({
            ...row,
            quantity: row.quantity === '' ? 1 : row.quantity,
        })),
    }));

    return {
        ...form,
        ...rows,
    };
}
