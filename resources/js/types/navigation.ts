import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

type NavItemChildren = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    permission: string;
};

export type NavItem = {
    title: string;
    icon?: LucideIcon | null;
    children: NavItemChildren[];
    isActive?: boolean;
};

export type NavGroup = {
    title: string;
    items: NavItem[];
};
