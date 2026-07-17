import { useForm } from '@inertiajs/react';

type EditProductionFormData = {
    cake_id: number;
    quantity: number;
    production_date: string;
};

export function useEditProduction(production: Production) {
    const form = useForm<EditProductionFormData>({
        cake_id: production.cake_id,
        quantity: production.quantity,
        production_date: production.production_date,
    });

    return {
        ...form,
    };
}