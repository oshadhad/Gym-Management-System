<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'day',
        'opt_in',
        'opt_out',
    ];

    public function getCreatedAtHumanAttribute(): string
    {
        return Carbon::parse($this->created_at)->format("M d, Y - h:i a");
    }

    public function getOptInHumanAttribute(): string
    {
        return Carbon::parse($this->opt_in)->format("M d, Y - h:i: a");
    }

    public function getOptOutHumanAttribute(): string
    {
        return Carbon::parse($this->opt_out)->format("M d, Y - h:i a");
    }

    public function user(){
        return $this->belongsTo((User::class));
    }
}
