<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Machine extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'machineName',
        'description',
        'EstDate',
        'photo',
        'status'
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
                    ->orWhere('machineName', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%")
                    ->orWhere('EstDate', 'like', "%$search%")
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
     * Relationship with the AGMaintenance model.
     */
    public function maintenances()
    {
        return $this->hasMany(Maintenance::class, 'machine_id');
    }
}
