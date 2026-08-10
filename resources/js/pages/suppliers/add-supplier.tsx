import { Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { FormField } from '@/components/form/form-field';
import { FormHeader } from '@/components/form/form-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useSupplierForm } from '@/hooks/use-supplier-form';
import { index as suppliersIndex } from '@/routes/suppliers';
import { SupplierStatsHeader } from './components/supplier-stats-header';

type Props = {
    totalSuppliers: number;
};

export default function AddSupplier({ totalSuppliers }: Props) {
    const {
        data,
        setData,
        processing,
        errors,
        handlePhoneChange,
        handlePhoneBlur,
        submit,
    } = useSupplierForm(
        { supplier_name: '', supplier_address: '', supplier_phone: '' },
        { mode: 'create' },
    );

    return (
        <>
            <Head title="Add Supplier" />
            <Container>
                <SupplierStatsHeader totalSuppliers={totalSuppliers} />

                <form
                    onSubmit={submit}
                    className="w-full rounded-xl border p-6"
                >
                    <>
                        <FormHeader
                            title={`Add Supplier`}
                            description="Create a new supplier account for your bakery. Fill in the details below to add materials and their quantities."
                        />

                        <div className="grid grid-cols-3 gap-4">
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
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Create supplier
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </>
                </form>
            </Container>
        </>
    );
}

AddSupplier.layout = {
    breadcrumbs: [
        { title: 'Suppliers', href: suppliersIndex() },
        { title: 'Add Supplier' },
    ],
};
