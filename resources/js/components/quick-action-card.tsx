import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from './ui/card';

type Props = {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
};

export function QuickActionCard({ icon, title, description, onClick }: Props) {
    return (
        <>
            <Link
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <Card className="items-center">
                    <CardHeader>
                        <div className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            {icon}
                        </div>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="space-y-1">
                            <h3 className="text-sm leading-none font-medium">
                                {title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    );
}
