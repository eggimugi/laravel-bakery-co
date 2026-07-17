import { Head } from "@inertiajs/react";
import { Container } from "@/components/container";
import type { Supplier } from "@/types";
import { SupplierStatsHeader } from "./components/supplier-stats-header";
import { SupplierTable } from "./components/table/page";

type Props = {
  suppliers: Supplier[];
};

export default function Index({ suppliers }: Props) {
    return (
        <>
        <Head title="Suppliers" />
        <Container>
            <SupplierStatsHeader totalSuppliers={suppliers.length} />

            <SupplierTable suppliers={suppliers} />
        </Container>
        </>
    )
}

Index.layout = {
    breadcrumbs: [
        { title: 'Suppliers' },
    ],
};