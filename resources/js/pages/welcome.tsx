import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Container } from '@/components/container';
import { useRole } from '@/hooks/use-role';
import { dashboard, login } from '@/routes';
import { create } from '@/routes/orders';

export default function Welcome() {
    const { auth } = usePage().props;
    const { hasRole } = useRole();

    const homeHref =
        hasRole('owner') || hasRole('manager') ? dashboard() : create();

    return (
        <>
            <Head title="Welcome" />
            <Container className="flex min-h-screen flex-col items-center lg:justify-center p-8 bg-background">
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden">
                    <nav className="flex items-center justify-end">
                        {auth.user ? (
                            <Link
                                href={homeHref}
                                className="rounded-sm bg-primary text-center font-medium px-5 py-1.5 text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-sm bg-primary text-center font-medium px-5 py-1.5 text-sm"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="flex-1 flex w-full h-full flex-col items-center justify-evenly sm:justify-center gap-25 opacity-100 transition-opacity duration-1500 starting:opacity-0">
                    <div className="space-y-8 sm:space-y-5 text-secondary">
                        <AppLogo />
                        <p className="text-center text-5xl sm:text-7xl font-extrabold lg:max-w-4xl">
                            Crafted by Hand, Baked with{' '}
                            <span className="italic">Lovely</span> Heart!
                        </p>
                        <p className="text-center text-lg">
                            Every loaf, pastry, and dessert is carefully
                            prepared using premium ingredients and baked fresh
                            daily.
                        </p>
                    </div>
                    <img
                        src="/welcome-decoration.svg"
                        alt="Bakery"
                        className="w-full max-w-md invert dark:invert-0"
                    />
                </main>
            </Container>
        </>
    );
}
