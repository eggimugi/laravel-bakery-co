import type { Cake, Material } from "@/types";

type Composition = {
    id: number;
    cake_id: number;
    material_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;

    material: Material;
};

export interface CakeWithCompositions extends Cake {
    compositions: Composition[];
}

export type CompositionRow = {
    key: string;
    id: number | null;
    material_id: number | null;
    material_name: string;
    quantity: number | '';
};

