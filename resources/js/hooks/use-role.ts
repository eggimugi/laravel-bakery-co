import { usePage } from '@inertiajs/react';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
    [key: string]: unknown;
};

export function useRole() {
    const { auth } = usePage<PageProps>().props;

    const roles: string[] = auth.user?.roles ?? [];

    function hasRole(role: string) {
        return roles.includes(role);
    }

    function hasAnyRole(rolesToCheck: string[]) {
        return rolesToCheck.some(role => roles.includes(role));
    }

    function hasAllRoles(rolesToCheck: string[]) {
        return rolesToCheck.every(role => roles.includes(role));
    }

    return {
        roles,
        hasRole,
        hasAnyRole,
        hasAllRoles,
    };
}