import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { validatePhone } from '@/lib/validate-phone';
import { store, update } from '@/routes/suppliers';

interface SupplierFormData {
    supplier_name: string;
    supplier_address: string;
    supplier_phone: string;
}

type SupplierFormOptions =
    { mode: 'create' } | { mode: 'edit'; supplierId: number };

export function useSupplierForm(
    initialData: SupplierFormData,
    options: SupplierFormOptions,
) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        setError,
        clearErrors,
        reset
    } = useForm(initialData);

    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateAndSetError = (value: string) => {
        const phoneError = validatePhone(value);

        if (phoneError) {
            setError('supplier_phone', phoneError);
        } else {
            clearErrors('supplier_phone');
        }

        return phoneError;
    };

    const handlePhoneChange = (value: string) => {
        setData('supplier_phone', value);

        if (touched.supplier_phone) {
            validateAndSetError(value);
        }
    };

    const handlePhoneBlur = (value: string) => {
        setTouched((prev) => ({ ...prev, supplier_phone: true }));
        validateAndSetError(value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        const phoneError = validatePhone(data.supplier_phone);

        if (phoneError) {
            setError('supplier_phone', phoneError);

            return;
        }

        const submitOptions = {
            onSuccess: () => {
                toast.success('Supplier saved successfully');
                reset();
                setTouched({});
            },
        };

        if (options.mode === 'edit') {
            put(update.url(options.supplierId), submitOptions);
        } else {
            post(store.url(), submitOptions);
        }
    };

    return {
        data,
        setData,
        processing,
        errors,
        handlePhoneChange,
        handlePhoneBlur,
        submit,
    };
}
