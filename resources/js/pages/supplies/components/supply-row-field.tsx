import { Trash2 } from 'lucide-react';
import InputError from '@/components/form/input-error';
import { NumberInput } from '@/components/form/number-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SupplyRow } from '@/types';

type Props = {
    row: SupplyRow;
    index: number;
    materials: { id: number; material_name: string }[];
    error?: {
        materialId?: string;
        material_price?: string;
        quantity?: string;
        unit?: string;
    };
    canRemove: boolean;
    onChange: (patch: Partial<SupplyRow>) => void;
    onRemove: () => void;
};

export function SupplyRowField({
    row,
    materials,
    error,
    canRemove,
    onChange,
    onRemove,
}: Props) {
    const findMaterialByName = (name: string) =>
        materials.find(
            (m) => m.material_name.toLowerCase() === name.trim().toLowerCase(),
        );

    return (
        <div className="flex items-end gap-4">
            <div className="grid flex-1 gap-2">
                <Input
                    type="text"
                    placeholder="Material name"
                    list="material-suggestions"
                    value={row.material_name}
                    onChange={(e) => {
                        const matched = findMaterialByName(e.target.value);
                        onChange({
                            material_name: e.target.value,
                            material_id: matched?.id ?? null,
                        });
                    }}
                    className='capitalize'
                />
                {row.material_name && !row.material_id && (
                    <p className="text-sm text-destructive">
                        Material not found.
                    </p>
                )}
                <InputError message={error?.materialId} />
            </div>

            <div className="grid gap-2">
                <NumberInput
                    placeholder="Material price"
                    value={row.material_price}
                    onValueChange={(material_price) =>
                        onChange({ material_price })
                    }
                />
                <InputError message={error?.material_price} />
            </div>

            <div className="grid gap-2">
                <NumberInput
                    placeholder="Quantity"
                    value={row.quantity}
                    onValueChange={(quantity) => onChange({ quantity })}
                />
                <InputError message={error?.quantity} />
            </div>

            <div className="grid gap-2">
                <Input
                    type="text"
                    placeholder="Unit"
                    value={row.unit}
                    onChange={(e) => onChange({ unit: e.target.value })}
                />
                <InputError message={error?.unit} />
            </div>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={!canRemove}
                onClick={onRemove}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
