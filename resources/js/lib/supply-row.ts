import type { Supply, SupplyRow } from '@/types';

export function emptyRow(): SupplyRow {
    return {
        key: crypto.randomUUID(),
        id: null,
        material_id: null,
        material_name: '',
        material_price: '',
        quantity: '',
        unit: '',
    };
}

export function rowsFromSupply(
    supply: Supply,
): SupplyRow[] {
    if (supply.detail_supplies.length === 0) {
        return [emptyRow()];
    }

    return supply.detail_supplies.map((detailSupply) => ({
        key: crypto.randomUUID(),
        id: detailSupply.id,
        material_id: detailSupply.material_id,
        material_name: detailSupply.material.material_name,
        material_price: detailSupply.material_price,
        quantity: detailSupply.quantity,
        unit: detailSupply.unit,
    }));
}