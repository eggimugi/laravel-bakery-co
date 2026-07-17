import { Head, Link} from '@inertiajs/react';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useSupplierForm } from '@/hooks/use-supplier-form';
import AppLayout from '@/layouts/app-layout';
import { index as suppliersIndex, edit } from '@/routes/suppliers';
import type { Supplier } from '@/types';
import { SupplierStatsHeader } from './components/supplier-stats-header';

type Props = {
    supplier: Supplier;
    totalSuppliers: number;
};

export default function EditSupplier({ supplier, totalSuppliers }: Props) {
    const {
        data,
        setData,
        processing,
        errors,
        handlePhoneChange,
        handlePhoneBlur,
        submit,
    } = useSupplierForm(
        {
            supplier_name: supplier.supplier_name,
            supplier_address: supplier.supplier_address,
            supplier_phone: supplier.supplier_phone,
        },
        { mode: 'edit', supplierId: supplier.id },
    );

    return (
        <>
            <Head title={`Edit Supplier ${supplier.supplier_name}`} />
            <Container>
                <SupplierStatsHeader totalSuppliers={totalSuppliers} />

                <form
                    onSubmit={submit}
                    className="mt-10 w-full rounded-xl border p-4"
                >
                    <>
                        <FormHeader
                            title={`Edit Supplier ${supplier.supplier_name}`}
                            description="Update the supplier information for your bakery. Fill in the details below to modify materials and their quantities."
                        />

                        <div className="grid gap-6">
                            <FormField
                                id="name"
                                label="Name"
                                error={errors.supplier_name}
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="supplier_name"
                                    placeholder="Full name"
                                    value={data.supplier_name}
                                    onChange={(e) =>
                                        setData('supplier_name', e.target.value)
                                    }
                                />
                            </FormField>

                            <FormField
                                id="address"
                                label="Address"
                                error={errors.supplier_address}
                            >
                                <Input
                                    id="address"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="address"
                                    name="supplier_address"
                                    placeholder="123 Main St, City, State 12345"
                                    value={data.supplier_address}
                                    onChange={(e) =>
                                        setData(
                                            'supplier_address',
                                            e.target.value,
                                        )
                                    }
                                />
                            </FormField>

                            <FormField
                                id="phone"
                                label="Phone"
                                error={errors.supplier_phone}
                            >
                                <Input
                                    id="phone"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="tel"
                                    name="supplier_phone"
                                    placeholder="(123) 456-7890"
                                    value={data.supplier_phone}
                                    onChange={(e) =>
                                        handlePhoneChange(e.target.value)
                                    }
                                    onBlur={(e) =>
                                        handlePhoneBlur(e.target.value)
                                    }
                                />
                            </FormField>

                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    type="submit"
                                    tabIndex={6}
                                    data-test="edit-supplier-button"
                                >
                                    {processing && <Spinner />}
                                    Edit supplier
                                </Button>
                                <Link
                                    href={suppliersIndex()}
                                    tabIndex={7}
                                    className="text-sm text-muted-foreground hover:underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </>
                </form>
            </Container>
        </>
    );
}

EditSupplier.layout = function Layout({
    children,
    supplier,
}: {
    children: React.ReactNode;
    supplier: Supplier;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Suppliers', href: suppliersIndex() },
                { title: 'Edit Supplier', href: edit.url(supplier.id) },
                { title: supplier.supplier_name, href: edit.url(supplier.id) },
            ]}
        >
            {children}
        </AppLayout>
    );
};
