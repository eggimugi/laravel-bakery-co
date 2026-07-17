import { usePage } from '@inertiajs/react';

export function usePermission() {
    const { auth } = usePage().props as any;

    const permissions: string[] = auth.user?.permissions ?? [];

    function can(permission: string) {
        return permissions.includes(permission);
    }

    function canAny(permissionsToCheck: string[]) {
        return permissionsToCheck.some(permission =>
            permissions.includes(permission)
        );
    }

    return {
        permissions,
        can,
        canAny,
    };
}