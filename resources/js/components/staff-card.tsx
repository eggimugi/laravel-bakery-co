import { formatDate } from '@/lib/date';
import type { User } from '@/types';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription } from './ui/card';

type Props = {
    staff: User;
};

export default function StaffCard({ staff }: Props) {
    return (
        <>
            <Card className="gap-4 bg-background/30 text-background">
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col leading-tight">
                            <p className="font-semibold">{staff.name}</p>
                            <p className="capitalize">
                                {staff.roles?.[0]?.name || 'No Role'}
                            </p>
                        </div>

                        <Badge className="capitalize">
                            {staff.orders_count} Orders
                        </Badge>
                    </div>

                    <CardDescription className="leading-tight text-background/80">
                        <p>{staff.email}</p>

                        <p>
                            {formatDate(staff.created_at)}
                        </p>
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
