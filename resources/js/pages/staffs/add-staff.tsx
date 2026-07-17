import { Form, Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Container } from '@/components/container';
import InputError from '@/components/form/input-error';
import PasswordInput from '@/components/password-input';
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
import { index as staffsIndex } from '@/routes/staffs';
import { store } from '@/routes/staffs';
import { StaffStatsHeader } from './components/staff-stats-header';

type Props = {
    passwordRules: string;
    stats: {
        totalOwners: number;
        totalManagers: number;
        totalCashiers: number;
        totalStaffs: number;
    };
};

export default function AddStaff({ passwordRules, stats }: Props) {
    return (
        <>
            <Head title="Add Staff" />
            <Container>
                <StaffStatsHeader stats={stats} />

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="w-full rounded-xl border p-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">
                                    Add Staff
                                </h1>
                                <p className="text-muted-foreground">
                                    Create a new staff account for your bakery.
                                </p>
                            </div>

                            <div className="grid gap-6">
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
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name="role">
                                        <SelectTrigger id="role" tabIndex={3}>
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

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={5}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        tabIndex={6}
                                        data-test="add-staff-button"
                                    >
                                        {processing && <Spinner />}
                                        Create staff
                                    </Button>
                                    <Link
                                        href={staffsIndex()}
                                        tabIndex={7}
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </Container>
        </>
    );
}

AddStaff.layout = {
    breadcrumbs: [
        { title: 'Staffs', href: '/staffs' },
        { title: 'Add Staff', href: '/staffs/add-staff' },
    ],
};
