import type { CakeWithCompositions, CompositionRow } from '@/types';

export function emptyRow(): CompositionRow {
    return {
        key: crypto.randomUUID(),
        id: null,
        material_id: null,
        material_name: '',
        quantity: 0,
    };
}

export function rowsFromCake(
    cake: CakeWithCompositions,
): CompositionRow[] {
    if (cake.compositions.length === 0) {
        return [emptyRow()];
    }

    return cake.compositions.map((composition) => ({
        key: crypto.randomUUID(),
        id: composition.id,
        material_id: composition.material_id,
        material_name: composition.material.material_name,
        quantity: composition.quantity,
    }));
}