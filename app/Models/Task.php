<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Task extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'is_completed',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
            'due_date' => 'date'
        ];
    }

    protected $appends = [
        'mediaFile'
    ];

    public function getMediaFileAttribute()
    {
        if ($this->relationLoaded('media')) {
            return $this->getFirstMedia();
        }

        return null;
    }

    public function taskCategories(): BelongsToMany
    {
        return $this->belongsToMany(TaskCategory::class);
    }
}
