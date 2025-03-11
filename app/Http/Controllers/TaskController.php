<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\TaskCategory;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Tasks/Index', [
            'tasks' => Task::with('media')->paginate(20)
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create', [
            'categories' => TaskCategory::all(),
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->safe(['name', 'due_date'])
            + ['is_completed' => false]);

        if ($request->hasFile('media')) {
            $task->addMedia($request->file('media'))->toMediaCollection();
        }

        if ($request->has('categories')) {
            $task->taskCategories()->sync($request->validated('categories'));
        }

        return redirect()->route('tasks.index');
    }

    public function edit(Task $task)
    {
        $task->load(['media', 'taskCategories']);
        $task->append('mediaFile');

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'categories' => TaskCategory::all(),
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        if ($request->hasFile('media')) {
            $task->getFirstMedia()?->delete();
            $task->addMedia($request->file('media'))->toMediaCollection();
        }

        return redirect()->route('tasks.index');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index');
    }
}
