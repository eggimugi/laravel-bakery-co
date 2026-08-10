import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/form/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="off"
                                    placeholder="email@example.com"
                                    className='border-secondary placeholder:text-muted'
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="off"
                                    placeholder="Password"
                                    className='border-secondary placeholder:text-muted'
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className='border-secondary'
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                variant="secondary"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>

                            <Link
                                href={'/'}
                                className="text-center text-sm text-muted underline-offset-4 hover:underline"
                            >
                                Back to home
                            </Link>
                        </div>
                    </>
                )}
            </Form>

            <div className="space-y-4">
                <div>
                    <p className="text-sm font-semibold"> Owner: </p>
                    <p className="space-x-4 text-sm">
                        <span>owner@mail.com</span>
                        Password: <span>password123</span>
                    </p>
                </div>

                <div>
                    <p className="text-sm font-semibold"> Manager: </p>
                    <p className="space-x-4 text-sm">
                        <span>melba.jones@example.net</span>
                        Password: <span>password</span>
                    </p>
                </div>

                <div>
                    <p className="text-sm font-semibold"> Cashier: </p>
                    <p className="space-x-4 text-sm">
                        <span>adan.padberg@example.com</span>
                        Password: <span>password</span>
                    </p>
                </div>
            </div>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
