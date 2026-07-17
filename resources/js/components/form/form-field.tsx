import type { ReactNode } from 'react';
import { Label } from '../ui/label';
import InputError from './input-error';

type FormFieldProps = {
    id: string;
    label: string;
    error?: string;
    children: ReactNode;
    className?: string;
};

export function FormField({
    id,
    label,
    error,
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}
