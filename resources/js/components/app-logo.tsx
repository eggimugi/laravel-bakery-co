import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
};

export default function AppLogo({ className }: Props) {
    return (
        <>
            <div className={cn("text-center font-extrabold", className)}>
                <AppLogoIcon />
            </div>
        </>
    );
}
