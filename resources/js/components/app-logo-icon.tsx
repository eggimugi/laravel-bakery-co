import { Croissant } from 'lucide-react';
import type { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <>
            <div className="flex items-center gap-4">
            <Croissant className="size-6 shrink-0 fill-secondary" />
            <h1
                {...props}
                className="text-xl text-secondary font-extrabold truncate group-data-[collapsible=icon]:hidden"
            >
                BakeryCo.
            </h1>
        </div>
        </>
    );
}
