import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

type Props = {
    prevPageUrl: string | null;
    nextPageUrl: string | null;
};

export function PaginationPage({ prevPageUrl, nextPageUrl }: Props) {
    return (
        <div className="flex items-center justify-end space-x-2 pt-4">
            <Button variant="outline" size="sm" disabled={!prevPageUrl} asChild={!!prevPageUrl}>
                {prevPageUrl ? (
                    <Link href={prevPageUrl} preserveScroll preserveState>
                        Previous
                    </Link>
                ) : (
                    'Previous'
                )}
            </Button>
            <Button variant="outline" size="sm" disabled={!nextPageUrl} asChild={!!nextPageUrl}>
                {nextPageUrl ? (
                    <Link href={nextPageUrl} preserveScroll preserveState>
                        Next
                    </Link>
                ) : (
                    'Next'
                )}
            </Button>
        </div>
    );
}