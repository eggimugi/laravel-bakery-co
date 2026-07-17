import type { Table } from '@tanstack/react-table';
import * as React from 'react';

const DataTableContext = React.createContext<Table<unknown> | null>(null);

export function useDataTable<TData>() {
    const context = React.useContext(DataTableContext);

    if (!context) {
        throw new Error('useDataTable must be used within a <DataTable> component');
    }
    
    return context as Table<TData>;
}

export const DataTableProvider = DataTableContext.Provider;