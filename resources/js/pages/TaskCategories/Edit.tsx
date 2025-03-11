import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type TaskCategory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Task Categories', href: '/task-categories' },
    { title: 'Edit', href: '' },
];

type EditTaskCategoryForm = {
    name: string;
};

export default function Edit({ taskCategory }: { taskCategory: TaskCategory }) {
    const taskCategoryName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditTaskCategoryForm>>({
        name: taskCategory.name,
    });

    const createTaskCategory: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('task-categories.update', taskCategory.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskCategoryName.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={createTaskCategory} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name *</Label>

                        <Input
                            id="name"
                            ref={taskCategoryName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Update</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
