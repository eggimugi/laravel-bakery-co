import { Input } from "../ui/input";

type NumberInputProps = Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange' | 'type'> & {
    value: number | '';
    onValueChange: (value: number | '') => void;
    fallback?: number;
};

export function NumberInput({ value, onValueChange, fallback = 0, min = 1, ...props }: NumberInputProps) {
    return (
        <Input
            type="number"
            min={min}
            value={value}
            onChange={(e) => {
                const val = e.target.value;
                onValueChange(val === '' ? '' : Number(val));
            }}
            onBlur={() => {
                if (value === '' || (typeof min === 'number' && value < min)) {
                    onValueChange(fallback);
                }
            }}
            {...props}
        />
    );
}