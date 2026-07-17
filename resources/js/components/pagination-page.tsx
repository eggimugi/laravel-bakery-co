import { Link } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import type { PaginationLinkType } from '@/types';

type Props = {
    links: PaginationLinkType[];
};

export function PaginationPage({ links }: Props) {
    return (
        <Pagination className="justify-end my-2">
            <PaginationContent>
                {links.map((link, index) => {
                    const label = link.label
                        .replace('&laquo; Previous', 'Previous')
                        .replace('Next &raquo;', 'Next');

                    if (link.url === null) {
                        return (
                            <PaginationItem key={index}>
                                <span
                                    className="px-3 py-2 text-sm text-muted-foreground opacity-50"
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <Link
                                href={link.url}
                                preserveScroll
                                preserveState
                                className={`rounded-md px-3 py-2 text-sm ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                }`}
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
