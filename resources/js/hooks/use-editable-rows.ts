import { useCallback } from 'react';

type BaseRow = {
    key: string;
};

type Props<T extends BaseRow> = {
    rows: T[];
    setRows: (rows: T[]) => void;
    createRow: () => T;
};

export function useEditableRows<T extends BaseRow>({
    rows,
    setRows,
    createRow,
}: Props<T>) {
    const updateRow = useCallback(
        (key: string, patch: Partial<T>) => {
            setRows(
                rows.map((row) => (row.key === key ? { ...row, ...patch } : row)),
            );
        },
        [rows, setRows],
    );

    const addRow = useCallback(() => {
        setRows([...rows, createRow()]);
    }, [rows, setRows, createRow]);

    const removeRow = useCallback(
        (key: string) => {
            setRows(rows.filter((row) => row.key !== key));
        },
        [rows, setRows],
    );

    return {
        updateRow,
        addRow,
        removeRow,
    };
}