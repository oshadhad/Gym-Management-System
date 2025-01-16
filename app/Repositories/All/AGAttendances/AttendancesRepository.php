<?php

namespace App\Repositories\All\AGAttendances;

use App\Models\Attendance;
use App\Repositories\Base\BaseRepository;

class AttendancesRepository extends BaseRepository implements AttendancesInterface

{
    /**
     * @var Attendance
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Attendance   $model
     */
    public function __construct(Attendance $model)
    {
        $this->model = $model;
    }
}

