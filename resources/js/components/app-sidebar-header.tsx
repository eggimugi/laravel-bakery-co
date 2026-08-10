import { Link, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { SearchInput } from './search-input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-8 rounded-t-xl bg-secondary p-12 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                <SearchInput
                    className="hidden sm:flex w-36 lg:w-64 rounded-full"
                    placeholder="Search"
                />
                <Link
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-background text-secondary"
                    href={edit()}
                    prefetch
                    onClick={cleanup}
                >
                    <Settings className="size-5" />
                </Link>
                <Avatar className="h-7 w-7 overflow-hidden rounded-full">
                    <AvatarImage
                        src={auth.user?.avatar}
                        alt={auth.user?.name}
                    />
                    <AvatarFallback className="rounded-lg bg-background text-secondary">
                        {auth.user ? getInitials(auth.user.name) : 'G'}
                    </AvatarFallback>
                </Avatar>
                {auth.user && (
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium">
                            Hello, {auth.user.name}!
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
}
