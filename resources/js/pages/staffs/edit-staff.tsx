import { Form, Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Container } from '@/components/container';
import InputError from '@/components/form/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { edit, index, update } from '@/routes/staffs';
import type { User } from '@/types';
import { StaffStatsHeader } from './components/staff-stats-header';

type Props = {
    staff: User;
    stats: {
        totalOwners: number;
        totalManagers: number;
        totalCashiers: number;
        totalStaffs: number;
    };
};

export default function EditStaff({ staff, stats }: Props) {
    return (
        <>
            <Head title={`Edit Staff ${staff.name}`} />
            <Container>
                <StaffStatsHeader stats={stats} />

                <Form
                    {...update.form(staff.id)}
                    onSuccess={() => {
                        toast.success('Staff updated successfully.');
                    }}
                    resetOnSuccess
                    disableWhileProcessing
                    className="mt-10 w-full rounded-xl border p-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold">
                                    Edit Staff {staff.name}
                                </h1>
                                <p className="text-muted">
                                    Update the staff account information.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Full name"
                                            defaultValue={staff.name}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="Email address"
                                            defaultValue={staff.email}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            name="role"
                                            defaultValue={
                                                staff.roles?.[0]?.name
                                            }
                                        >
                                            <SelectTrigger
                                                id="role"
                                                tabIndex={3}
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="owner">
                                                    Owner
                                                </SelectItem>
                                                <SelectItem value="manager">
                                                    Manager
                                                </SelectItem>
                                                <SelectItem value="cashier">
                                                    Cashier
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.role} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Update Staff
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </Container>
        </>
    );
}

EditStaff.layout = function Layout({
    children,
    staff,
}: {
    children: ReactNode;
    staff: User;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Staffs', href: index() },
                {
                    title: 'Edit',
                    href: edit(staff.id),
                },
                {
                    title: staff.name,
                    href: edit(staff.id),
                },
            ]}
        >
            {children}
        </AppLayout>
    );
};
