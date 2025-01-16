<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'machine_id',
        'title',
        'description',
        'startDate',
        'status',
    ];

    protected $appends = ['created_at_human'];

    public function getCreatedAtHumanAttribute(){
        return Carbon::parse($this->created_at)->format('M d, Y - h:i a');
    }


    public function scopeOrderByColumn($query, $column, $direction = 'asc')
    {
        $query->orderBy($column, $direction);
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['searchParam'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('id', 'like', "%$search%")
                    ->orWhere('machine_id', 'like', "%$search%")
                    ->orWhere('title', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%")
                    ->orWhere('startDate', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%");
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });

    }


    /**
     * Relationship with the AGMachine model.
     */
    public function machine()
    {
        return $this->belongsTo(Machine::class, 'machine_id');
    }
}
