import type { Cake, User } from "@/types";

type DetailOrder = {
    id: number;
    order_id: number;
    cake_id: number;
    quantity: number;

    cake: Cake;
}

export type Order = {
    id: number;
    user_id: number;
    order_date: string;
    status: string;

    user: User;
    detail_orders: DetailOrder[];
}