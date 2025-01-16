<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable =[
        'user_id',
        'type',
        'subs',
        'amount',
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
                    ->orWhere('user_id', 'like', "%$search%")
                    ->orWhere('type', 'like', "%$search%")
                    ->orWhere('subs', 'like', "%$search%")
                    ->orWhere('amount', 'like', "%$search%");
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });

    }


    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
