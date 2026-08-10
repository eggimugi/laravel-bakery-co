import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

type NumberInputProps = Omit<
    React.ComponentProps<typeof Input>,
    'value' | 'onChange' | 'type'
> & {
    value: number | '';
    onValueChange: (value: number | '') => void;
    fallback?: number;
    min?: number;
    clampOnBlur?: boolean;
    formatThousands?: boolean;
    prefix?: string;
    name?: string;
};

function formatNumber(num: number | '') {
    if (num === '') {
        return '';
    }

    return num.toLocaleString('id-ID');
}

function parseFormatted(raw: string): number | '' {
    const digitsOnly = raw.replace(/[^0-9]/g, '');

    return digitsOnly === '' ? '' : Number(digitsOnly);
}

export function NumberInput({
    value,
    onValueChange,
    fallback = 0,
    min = 1,
    clampOnBlur = true,
    formatThousands = false,
    prefix,
    name,
    className,
    ...props
}: NumberInputProps) {
    const elRef = React.useRef<HTMLInputElement | null>(null);
    const nextCursorRef = React.useRef<number | null>(null);

    const displayValue = formatThousands ? formatNumber(value) : value;

    React.useLayoutEffect(() => {
        if (nextCursorRef.current !== null && elRef.current) {
            elRef.current.setSelectionRange(
                nextCursorRef.current,
                nextCursorRef.current,
            );
            nextCursorRef.current = null;
        }
    }, [displayValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End',
        ];

        if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
            return;
        }

        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        elRef.current = e.target;

        if (formatThousands) {
            const cursorPos = e.target.selectionStart ?? raw.length;
            const digitsBeforeCursor = raw
                .slice(0, cursorPos)
                .replace(/[^0-9]/g, '').length;

            const numericValue = parseFormatted(raw);
            const newFormatted = formatNumber(numericValue);

            let count = 0;
            let newCursorPos = newFormatted.length;

            for (let i = 0; i < newFormatted.length; i++) {
                if (/[0-9]/.test(newFormatted[i])) {
                    count++;

                    if (count === digitsBeforeCursor) {
                        newCursorPos = i + 1;
                        break;
                    }
                }
            }

            if (digitsBeforeCursor === 0) {
                newCursorPos = 0;
            }

            nextCursorRef.current = newCursorPos;
            onValueChange(numericValue);
        } else {
            onValueChange(raw === '' ? '' : Number(raw));
        }
    };

    const input = (
        <Input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
                elRef.current = e.target;

                if (!clampOnBlur) {
                    return;
                }

                if (value === '' || (typeof min === 'number' && value < min)) {
                    onValueChange(fallback);
                }
            }}
            className={cn(prefix && 'pl-8', className)}
            {...props}
        />
    );

    return (
        <div className="relative">
            {prefix && (
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted select-none">
                    {prefix}
                </span>
            )}
            {input}
            {formatThousands && name && (
                <input type="hidden" name={name} value={value} />
            )}
        </div>
    );
}
