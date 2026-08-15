import { Head, router, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatRupiah } from '@/lib/currency';
import { create, store } from '@/routes/orders';

type Item = {
    id: number;
    cake_name: string;
    cake_price: number;
    quantity: number;
    unit: string;
    subtotal: number;
};

type Props = {
    items: Item[];
};

const PAYMENT_METHODS = [
    {
        id: 'bank_transfer',
        label: 'Bank Transfer',
        description: 'BCA, Mandiri, BNI, BRI',
    },
    {
        id: 'e_wallet',
        label: 'E-Wallet',
        description: 'GoPay, OVO, DANA, ShopeePay',
    },
    {
        id: 'credit_card',
        label: 'Credit Card',
        description: 'Visa, Mastercard',
    },
    { id: 'cash', label: 'Cash', description: 'Pay With Cash' },
] as const;

type PaymentMethodId = (typeof PAYMENT_METHODS)[number]['id'];

export default function Checkout({ items }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        items: { cake_id: number; quantity: number }[];
        payment_method: PaymentMethodId | '';
    }>({
        items: items.map((item) => ({
            cake_id: item.id,
            quantity: item.quantity,
        })),
        payment_method: '',
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (items.length === 0 || !data.payment_method) {
            return;
        }

        post(store.url(), {
            preserveScroll: true,
            onError: () => {
                const firstError = Object.values(errors)[0];

                if (firstError) {
                    toast.error(firstError);
                }
            },
            onSuccess: () => {
                router.visit(create.url(), {
                    preserveScroll: true,
                });
                toast.success('Order created successfully');
            },
        });
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="flex flex-col gap-8 px-12 py-6">
                <div>
                    <p className="font-bold text-background/80">Order</p>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-5"
                >
                    {/* Order summary — receipt style, scrolls internally */}
                    <div className="lg:col-span-3">
                        <div className="flex h-[calc(100vh-18rem)] flex-col rounded-xl border p-6 text-secondary">
                            <div className="mb-4 flex shrink-0 items-center justify-between rounded-xl bg-background p-4">
                                <h2 className="text-lg font-semibold">
                                    Order Summary
                                </h2>
                                <span className="rounded-full px-3 py-1 text-xs font-semibold">
                                    {totalItems} item
                                </span>
                            </div>

                            {/* only this part scrolls */}
                            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-4 rounded-xl border-b border-secondary/10 bg-background p-4 last:border-b-0"
                                    >
                                        <div>
                                            <h3 className="text-base font-medium capitalize">
                                                {item.cake_name}
                                                <span className="ml-3 text-sm text-secondary/70">
                                                    {item.quantity} {item.unit}
                                                </span>
                                            </h3>
                                            <p className="text-sm">
                                                {formatRupiah(item.cake_price)}{' '}
                                                / {item.unit}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-semibold">
                                                {formatRupiah(item.subtotal)}
                                            </p>
                                            <p className="text-xs">Subtotal</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4 shrink-0" />

                            <div className="flex shrink-0 items-center justify-between rounded-xl bg-background p-4">
                                <span className="text-lg font-semibold">
                                    Total
                                </span>
                                <span className="text-lg font-bold">
                                    {formatRupiah(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="lg:col-span-2">
                        <div className="flex h-[calc(100vh-18rem)] flex-col justify-between overflow-y-auto rounded-xl bg-background p-6 text-secondary">
                            <div>
                                <h2 className="mb-4 text-lg font-semibold">
                                    Metode Pembayaran
                                </h2>

                                <div className="space-y-3">
                                    {PAYMENT_METHODS.map((method) => {
                                        const isSelected =
                                            data.payment_method === method.id;

                                        return (
                                            <label
                                                key={method.id}
                                                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition ${
                                                    isSelected
                                                        ? 'bg-secondary text-background'
                                                        : 'border-secondary'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    value={method.id}
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        setData(
                                                            'payment_method',
                                                            method.id,
                                                        )
                                                    }
                                                    className={`mt-1 h-4 w-4 appearance-none rounded-full border-2 transition ${
                                                        isSelected
                                                            ? 'bg-background'
                                                            : 'border-muted bg-transparent'
                                                    }`}
                                                />
                                                <span>
                                                    <span className="block text-sm font-medium">
                                                        {method.label}
                                                    </span>
                                                    <span className="block text-xs text-muted">
                                                        {method.description}
                                                    </span>
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <Button
                                    variant="secondary"
                                    type="submit"
                                    disabled={
                                        !data.payment_method || processing
                                    }
                                    className="mt-4 w-full"
                                >
                                    {processing
                                        ? 'Processing...'
                                        : `Pay ${formatRupiah(totalPrice)}`}
                                </Button>

                                {!data.payment_method && (
                                    <p className="mt-2 text-center text-xs text-[#6B5C4D]">
                                        Please select a payment method to
                                        proceed.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

Checkout.layout = {
    breadcrumb: [
        {
            title: 'Orders',
            href: '/orders',
        },
    ],
};
