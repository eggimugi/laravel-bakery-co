import { router } from '@inertiajs/react';
import {
    Users,
    CakeSlice,
    Wheat,
    ChefHat,
    Microwave,
    Truck,
    Package,
    ShoppingCart,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useRole } from '@/hooks/use-role';
import { dashboard } from '@/routes';
import { create } from '@/routes/orders';
import type { NavGroup } from '@/types';
import AppLogo from './app-logo';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Staff',
        items: [
            {
                title: 'Staffs',
                icon: Users,
                children: [
                    {
                        title: 'View Staffs',
                        href: '/staffs',
                        permission: 'user.view',
                    },
                    {
                        title: 'Add Staff',
                        href: '/staffs/add-staff',
                        permission: 'user.create',
                    },
                ],
            },
        ],
    },
    {
        title: 'Cake',
        items: [
            {
                title: 'Cakes',
                icon: CakeSlice,
                children: [
                    {
                        title: 'View Cakes',
                        href: '/cakes',
                        permission: 'cake.view',
                    },
                    {
                        title: 'Add Cake',
                        href: '/cakes/add-cake',
                        permission: 'cake.create',
                    },
                ],
            },
            {
                title: 'Materials',
                icon: Wheat,
                children: [
                    {
                        title: 'View Materials',
                        href: '/materials',
                        permission: 'material.view',
                    },
                    {
                        title: 'Add Material',
                        href: '/materials/add-material',
                        permission: 'material.create',
                    },
                ],
            },
            {
                title: 'Compositions',
                icon: ChefHat,
                children: [
                    {
                        title: 'View Compositions',
                        href: '/compositions',
                        permission: 'composition.view',
                    },
                ],
            },
            {
                title: 'Productions',
                icon: Microwave,
                children: [
                    {
                        title: 'Production Histories',
                        href: '/productions',
                        permission: 'production.view',
                    },
                    {
                        title: 'Add Production',
                        href: '/productions/add-production',
                        permission: 'production.create',
                    },
                ],
            },
        ],
    },
    {
        title: 'Supply',
        items: [
            {
                title: 'Suppliers',
                icon: Truck,
                children: [
                    {
                        title: 'View Suppliers',
                        href: '/suppliers',
                        permission: 'supplier.view',
                    },
                    {
                        title: 'Add Supplier',
                        href: '/suppliers/add-supplier',
                        permission: 'supplier.create',
                    },
                ],
            },
            {
                title: 'Supplies',
                icon: Package,
                children: [
                    {
                        title: 'Supply Histories',
                        href: '/supplies',
                        permission: 'supply.view',
                    },
                    {
                        title: 'Add Supply',
                        href: '/supplies/add-supply',
                        permission: 'supply.create',
                    },
                ],
            },
        ],
    },
    {
        title: 'Order',
        items: [
            {
                title: 'Orders',
                icon: ShoppingCart,
                children: [
                    {
                        title: 'Add Order',
                        href: '/orders/add-order',
                        permission: 'order.create',
                    },
                    {
                        title: 'View Order',
                        href: '/orders',
                        permission: 'order.view',
                    },
                ],
            },
        ],
    },
];

export function AppSidebar() {
    const { hasRole } = useRole();    

    const homeHref = hasRole('owner') || hasRole('manager') ? dashboard() : create();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            onClick={() => router.visit(homeHref)}
                        >
                            <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="scrollbar-hide overflow-y-auto pt-4">
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
