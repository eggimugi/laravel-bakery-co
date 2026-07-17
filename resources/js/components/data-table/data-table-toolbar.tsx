import { Link } from '@inertiajs/react';
import { PlusCircle, X } from 'lucide-react';

import { useDataTable } from '@/components/data-table/data-table-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DataTableToolbarProps {
    searchColumn?: string;
    searchPlaceholder?: string;
    createHref?: string;
    createLabel?: string;
    children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
    searchColumn,
    searchPlaceholder = 'Search...',
    createHref,
    createLabel = 'Add New',
    children,
}: DataTableToolbarProps) {
    const table = useDataTable<TData>();
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                {searchColumn && (
                    <Input
                        placeholder={searchPlaceholder}
                        value={
                            (table
                                .getColumn(searchColumn)
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchColumn)
                                ?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                )}

                {children}

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {createHref && (
                <Button asChild className="ml-2">
                    <Link href={createHref}>
                        <PlusCircle className="mr-1 h-4 w-4" />
                        {createLabel}
                    </Link>
                </Button>
            )}
        </div>
    );
}
