import type { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 { ...props } className='font-bold text-lg'>BakeryCo.</h1>
    );
}
