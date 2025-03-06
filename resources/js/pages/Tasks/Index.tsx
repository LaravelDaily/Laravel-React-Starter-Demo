import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Tasks List" />
            <div>
                The list will be here.
            </div>
        </AppLayout>
    );
}
