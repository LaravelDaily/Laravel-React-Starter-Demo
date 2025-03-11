import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem, type PaginatedResponse, type TaskCategory } from '@/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { TablePagination } from '@/components/table-pagination';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Task Categories', href: '/task-categories' },
];

export default function Index({ taskCategories }: { taskCategories: PaginatedResponse<TaskCategory> }) {
    const deleteTaskCategory = (taskCategory: TaskCategory) => {
        if (taskCategory.tasks_count === 0) {
            if (confirm('Are you sure you want to delete this task category?')) {
                router.delete(route('task-categories.destroy', taskCategory.id));
                toast.success('Task Category deleted successfully');
            }
        } else {
            if (
                confirm(
                    'This category has tasks assigned to it. Are you sure you want to delete it? This will also delete all the tasks assigned to this category.',
                )
            ) {
                router.delete(route('task-categories.destroy', taskCategory.id));
                toast.success('Task Category deleted successfully');
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className={'mt-8'}>
                <div className={'flex flex-row gap-x-4'}>
                    <Link className={buttonVariants({ variant: 'default' })} href="/task-categories/create">
                        Create Category
                    </Link>
                </div>
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[100px]">Assigned Tasks</TableHead>
                            <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taskCategories.data.map((taskCategory: TaskCategory) => (
                            <TableRow key={taskCategory.id}>
                                <TableCell>{taskCategory.name}</TableCell>
                                <TableCell>{taskCategory.tasks_count}</TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                    <Link className={buttonVariants({ variant: 'default' })} href={`/task-categories/${taskCategory.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTaskCategory(taskCategory)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination resource={taskCategories} />
            </div>
        </AppLayout>
    );
}
