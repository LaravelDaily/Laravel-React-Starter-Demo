import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    completedVsPendingTaskChart,
    pendingTasksToday,
    tasksCreatedByDay,
}: {
    completedVsPendingTaskChart: object;
    pendingTasksToday: number;
    tasksCreatedByDay: object;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border py-4">
                        <Doughnut data={completedVsPendingTaskChart} className={'mx-auto'} />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col items-center justify-start overflow-hidden rounded-xl border py-4">
                        <h2 className={'text-center text-3xl font-bold'}>Tasks Due Today</h2>
                        <p className={'mt-auto mb-auto text-xl'}>{pendingTasksToday} task(-s) due today.</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col items-center justify-start overflow-hidden rounded-xl border py-4">
                        <h2 className={'text-center text-3xl font-bold'}>Tasks This Week</h2>
                        <Bar data={tasksCreatedByDay} className={'mx-auto'} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
