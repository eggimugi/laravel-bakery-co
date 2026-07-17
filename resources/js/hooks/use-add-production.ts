import { useForm } from "@inertiajs/react";

type AddProductionFormData = {
    cake_id: number | null;
    quantity: number | '';
    production_date: string;
}

export function useAddProduction(cakes: { id: number; cake_name: string }[]) {
    const form = useForm<AddProductionFormData>({
        cake_id: null,
        quantity: '',
        production_date: '',
    });

    const findCakeByName = (name: string) => {
        return cakes.find((cake) => cake.cake_name.toLowerCase() === name.trim().toLowerCase());
    }

    return {
        ...form,
        findCakeByName,
    };
}