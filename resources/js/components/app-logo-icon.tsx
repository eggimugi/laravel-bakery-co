import { Croissant } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type AppLogoIconProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

export default function AppLogoIcon({ className, ...props }: AppLogoIconProps) {
    return (
        <div
            className={cn('flex items-center justify-center gap-4', className)}
        >
            <Croissant className="size-6 shrink-0 fill-secondary" />
            <h1
                {...props}
                className="truncate text-xl font-extrabold text-secondary group-data-[collapsible=icon]:hidden"
            >
                BakeryCo.
            </h1>
        </div>
    );
}
