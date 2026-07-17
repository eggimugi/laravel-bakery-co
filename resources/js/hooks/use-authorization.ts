import { usePage } from '@inertiajs/react';

export function useAuthorization() {
    const { auth } = usePage().props;

    const hasRole = (role: string) =>
        auth.user?.roles.includes(role) ?? false;

    const hasPermission = (permission: string) =>
        auth.user?.permissions.includes(permission) ?? false;

    return {
        user: auth.user,
        hasRole,
        hasPermission,
    };
}