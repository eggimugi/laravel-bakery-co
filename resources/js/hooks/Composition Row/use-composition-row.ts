import type { CompositionRow } from '@/types';

type Props = {
    rows: CompositionRow[];
    setRows: (rows: CompositionRow[]) => void;
};

export function useCompositionRows({ rows, setRows }: Props) {
    const updateRow = (key: string, patch: Partial<CompositionRow>) => {
        setRows(
            rows.map((row) => (row.key === key ? { ...row, ...patch } : row)),
        );
    };

    const addRow = () =>
        setRows([
            ...rows,
            {
                key: crypto.randomUUID(),
                id: null,
                material_id: null,
                material_name: '',
                quantity: 0,
            },
        ]);

    const removeRow = (key: string) =>
        setRows(rows.filter((row) => row.key !== key));

    return {
        updateRow,
        addRow,
        removeRow,
    };
}
