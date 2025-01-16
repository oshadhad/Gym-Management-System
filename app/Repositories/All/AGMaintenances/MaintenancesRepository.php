<?php

namespace App\Repositories\All\AGMaintenances;

use App\Models\Maintenance;
use App\Repositories\Base\BaseRepository;

class MaintenancesRepository extends BaseRepository implements MaintenancesInterface

{
    /**
     * @var Maintenance
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Maintenance   $model
     */
    public function __construct(Maintenance $model)
    {
        $this->model = $model;
    }
}

