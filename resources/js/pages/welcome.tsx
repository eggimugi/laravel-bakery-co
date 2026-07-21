import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { useRole } from '@/hooks/use-role';
import { dashboard, login } from '@/routes';
import { create } from '@/routes/orders';

export default function Welcome() {
    const { auth } = usePage().props;
    const { hasRole } = useRole();
    
        const homeHref = hasRole('owner') || hasRole('manager') ? dashboard() : create();

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center lg:justify-center lg:p-8">
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={homeHref}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                {hasRole('owner') || hasRole('manager') ? 'Dashboard' : 'Orders'}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="flex w-full flex-col items-center justify-center gap-16 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="space-y-8">
                        <h1 className="flex items-center justify-center gap-2">
                            <AppLogo />
                        </h1>
                        <p className="text-center text-6xl lg:max-w-3xl">
                            Crafted by Hand, Baked with{' '}
                            <span className="italic">Lovely</span> Heart!
                        </p>
                        <p className="text-center text-lg text-muted-foreground">
                            Every loaf, pastry, and dessert is carefully
                            prepared using premium ingredients and baked fresh
                            daily.
                        </p>
                    </div>
                    <img
                        src="/bakery.svg"
                        alt="Bakery"
                        className="w-full max-w-md invert dark:invert-0"
                    />
                </main>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
