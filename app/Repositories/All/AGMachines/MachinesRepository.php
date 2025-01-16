<?php

namespace App\Repositories\All\AGMachines;

use App\Models\Machine;
use App\Repositories\All\AGMachines\MachinesInterface;
use App\Repositories\Base\BaseRepository;

class MachinesRepository extends BaseRepository implements MachinesInterface

{
    /**
     * @var Machine
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Machine   $model
     */
    public function __construct(Machine $model)
    {
        $this->model = $model;
    }
}

