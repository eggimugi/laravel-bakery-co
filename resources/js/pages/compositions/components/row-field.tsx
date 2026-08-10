import { Trash2 } from "lucide-react";
import InputError from "@/components/form/input-error";
import { NumberInput } from "@/components/form/number-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Material, CompositionRow } from "@/types";

type Props = {
    row: CompositionRow;
    index: number;
    materials: Material[];
    error?: { materialId?: string; quantity?: string };
    canRemove: boolean;
    onChange: (patch: Partial<CompositionRow>) => void;
    onRemove: () => void;
};

export function CompositionRowField({ row, materials, error, canRemove, onChange, onRemove }: Props) {
    const findMaterialByName = (name: string) =>
        materials.find((m) => m.material_name.toLowerCase() === name.trim().toLowerCase());

    return (
        <div className="flex items-end gap-3">
            <div className="grid flex-1 gap-2">
                <Input
                    type="text"
                    placeholder="Material name"
                    list="material-suggestions"
                    value={row.material_name}
                    onChange={(e) => {
                        const matched = findMaterialByName(e.target.value);
                        onChange({ material_name: e.target.value, material_id: matched?.id ?? null });
                    }}
                    autoComplete="off"
                    className="capitalize"
                />
                {row.material_name && !row.material_id && (
                    <p className="text-sm text-destructive">Material not found.</p>
                )}
                <InputError message={error?.materialId} />
            </div>

            <div className="grid w-32 gap-2">
                <NumberInput value={row.quantity} onValueChange={(quantity) => onChange({ quantity })} />
                <InputError message={error?.quantity} />
            </div>

            <Button type="button" variant="ghost" size="icon" disabled={!canRemove} onClick={onRemove}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}