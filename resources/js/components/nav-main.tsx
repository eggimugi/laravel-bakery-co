import { Link } from '@inertiajs/react';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { usePermission } from '@/hooks/use-permission';
import { useRole } from '@/hooks/use-role';
import { dashboard } from '@/routes';
import { create } from '@/routes/orders';
import type { NavGroup } from '@/types';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    const { can } = usePermission();
    const { hasRole } = useRole();

    const homeHref = hasRole('owner') || hasRole('manager') ? dashboard() : create();

    const visibleGroups = groups
        .map((group) => ({
            ...group,
            items: group.items
                .map((item) => ({
                    ...item,
                    children: item.children.filter((child) =>
                        can(child.permission),
                    ),
                }))
                .filter((item) => item.children.length > 0),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <>
            <SidebarMenu className="">
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={isCurrentUrl(homeHref)}
                        tooltip={{ children: 'Dashboard' }}
                    >
                        <Link href={homeHref} prefetch>
                            <LayoutGrid />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroup className='px-0'>
                {visibleGroups.map((group) => (
                    <div key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

                        <SidebarMenu className=''>
                            {group.items.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={{
                                                    children: item.title,
                                                }}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>

                                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.children.map((child) => (
                                                    <SidebarMenuSubItem
                                                        key={child.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isCurrentUrl(
                                                                child.href,
                                                            )}
                                                        >
                                                            <Link
                                                                href={
                                                                    child.href
                                                                }
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </div>
                ))}
            </SidebarGroup>
        </>
    );
}
