import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { RouteDefinition } from '@/wayfinder';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

type NavItemChildren = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    permission: string;
};

type NavItemBase = {
    title: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type NavItemLink = NavItemBase & {
    href: RouteDefinition<'get'> | NonNullable<InertiaLinkProps['href']>;
    children?: never;
};

export type NavItemGroup = NavItemBase & {
    href?: never;
    children: NavItemChildren[];
};

export type NavItem = NavItemLink | NavItemGroup;

export type NavGroup = {
    title: string;
    items: NavItemGroup[];
};
