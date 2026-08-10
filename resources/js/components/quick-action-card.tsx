import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from './ui/card';

type Props = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export function QuickActionCard({ icon, title, onClick }: Props) {
    return (
        <Link
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="block h-full"
        >
            <Card className="flex h-full flex-col items-center justify-center text-center gap-3 bg-background/30 text-background">
                <CardHeader>
                    <div className="flex h-7 w-7 items-center justify-center [&>svg]:h-20 [&>svg]:w-20">
                        {icon}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-center text-center">
                    <div className="space-y-1">
                        <h3 className="leading-none font-medium">
                            {title}
                        </h3>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
