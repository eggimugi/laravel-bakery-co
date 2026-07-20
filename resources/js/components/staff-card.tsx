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
            <Card className="gap-4">
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{staff.name}</p>

                        <Badge className="capitalize">
                            {staff.orders_count} Orders
                        </Badge>
                    </div>

                    <CardDescription className="space-y-1">
                        <p className="capitalize">
                            {staff.roles?.[0]?.name || 'No Role'}
                        </p>

                        <p>{staff.email}</p>

                        <p>
                            <span className="font-medium">Joined Date: </span>
                            {formatDate(staff.created_at)}
                        </p>
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
