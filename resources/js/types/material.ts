type Unit = 'gr' | 'kg' | 'ml' | 'l' | 'item';

type MaterialType = 'liquid' | 'powder' | 'solid';

export type Material = {
    id: number;
    material_name: string;
    material_price: number;
    stock: number;
    unit: Unit;
    material_type: MaterialType;
    created_at: string;
    updated_at: string;
};
