import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

type EditTaskForm = {
    name: string;
    is_completed: boolean;
};

export default function Edit({ task }: { task: Task }) {
    const taskName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditTaskForm>>({
        name: task.name,
        is_completed: task.is_completed,
    });

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('tasks.update', task.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskName.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout>
            <Head title="Edit Task" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={editTask} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name</Label>

                        <Input
                            id="name"
                            ref={taskName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_completed">Completed?</Label>

                        <Checkbox checked={data.is_completed} onCheckedChange={() => setData('is_completed', !data.is_completed)} />

                        <InputError message={errors.is_completed} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Update Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
