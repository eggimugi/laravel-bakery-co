import { Head, router } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status];

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    return (
        <>
            <Head title={title} />
            <Container className="flex min-h-screen flex-col items-center gap-25 bg-background p-8 text-secondary lg:justify-center">
                <div className="space-y-8 text-center">
                    <AppLogo />
                    <h1 className="text-8xl font-black">{title}</h1>
                    <p className="text-xl">{description}</p>
                    <Button variant="secondary" onClick={handleGoBack}>
                        Go back
                    </Button>
                </div>
                <img
                    src="/welcome-decoration.svg"
                    alt="Bakery"
                    className="w-full max-w-md invert dark:invert-0"
                />
            </Container>
        </>
    );
}
