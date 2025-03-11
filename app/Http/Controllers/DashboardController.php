<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'completedVsPendingTaskChart' => $this->getCompletedVsPendingTaskChart(),
            'pendingTasksToday' => Task::query()
                ->where('is_completed', false)
                ->whereDate('due_date', now())
                ->count(),
            'tasksCreatedByDay' => $this->getTasksCreatedByDay(),
        ]);
    }

    private function getCompletedVsPendingTaskChart(): array
    {
        return [
            'labels' => ['Completed', 'In Progress'],
            'datasets' => [
                [
                    'label' => 'Tasks',
                    'backgroundColor' => ['#3490dc', '#f6993f'],
                    'data' => [
                        Task::query()->where('is_completed', true)->count(),
                        Task::query()->where('is_completed', false)->count(),
                    ],
                ],
            ],
        ];
    }

    private function getTasksCreatedByDay(): array
    {
        return [
            'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'datasets' => [
                [
                    'label' => 'Tasks',
                    'backgroundColor' => '#3490dc',
                    'data' => [
                        collect(range(0, 6))
                            ->map(function ($day) {
                                $date = now()->startOfWeek()->addDays($day);

                                return Task::query()->whereDate('created_at', $date)->count();
                            })
                            ->toArray(),
                    ],
                ],
            ],
        ];
    }
}
