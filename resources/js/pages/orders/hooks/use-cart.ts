import { useMemo, useState } from "react";
import type { Cake } from "@/types";

type CartItem = {
    qty: number;
    cake: Cake;
};

type CartState = Record<number, CartItem>;

export function useCart() {
    const [cart, setCart] = useState<CartState>({});
    
        const addToCart = (cake: Cake) => {
            setCart((currentCart) => ({
                ...currentCart,
                [cake.id]: {
                    cake,
                    qty: 1,
                },
            }));
        };
    
        const increaseQty = (cakeId: number) => {
            setCart((currentCart) => {
                const cartItem = currentCart[cakeId];
    
                if (!cartItem) {
                    return currentCart;
                }
    
                return {
                    ...currentCart,
                    [cakeId]: {
                        ...cartItem,
                        qty: cartItem.qty + 1,
                    },
                };
            });
        };
    
        const decreaseQty = (cakeId: number) => {
            setCart((currentCart) => {
                const cartItem = currentCart[cakeId];
    
                if (!cartItem) {
                    return currentCart;
                }
    
                if (cartItem.qty <= 1) {
                    const restCart = { ...currentCart };
    
                    delete restCart[cakeId];
    
                    return restCart;
                }
    
                return {
                    ...currentCart,
                    [cakeId]: {
                        ...cartItem,
                        qty: cartItem.qty - 1,
                    },
                };
            });
        };
    
        const getQty = (cakeId: number) => cart[cakeId]?.qty ?? 0;
    
        const totalQty = useMemo(
            () => Object.values(cart).reduce((total, item) => total + item.qty, 0),
            [cart],
        );

        return {
            cart,
            addToCart,
            increaseQty,
            decreaseQty,
            getQty,
            totalQty,
        };
}