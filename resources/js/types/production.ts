import type { CakeWithCompositions, User } from "@/types";

export type Production = {
    id: number;
    user_id: number;
    cake_id: number;
    quantity: number;
    production_date: string;
    created_at: string;
    updated_at: string;
    cancelled_at: string | null;

    user: User;
    cake: CakeWithCompositions;
};