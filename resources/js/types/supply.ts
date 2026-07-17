import type { Material, Supplier, User } from "@/types";

type detailSupply = {
    id: number;
    supply_id: number;
    material_id: number;
    material_price: number;
    quantity: number;
    unit: string;
    created_at: string;
    updated_at: string;

    material: Material;
};

export type Supply = {
    id: number;
    user_id: number;
    supplier_id: number;
    supply_date: string;
    created_at: string;
    updated_at: string;
    cancelled_at: string | null;

    user: User;
    supplier: Supplier;
    detail_supplies: detailSupply[];
};

export type SupplyRow = {
    key: string;
    id: number | null;
    material_id: number | null;
    material_name: string;
    material_price: number | '';
    quantity: number | '';
    unit: string;
};