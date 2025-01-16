<?php

namespace App\Repositories\All\AGPayments;

use App\Models\Payment;
use App\Repositories\Base\BaseRepository;

class PaymentsRepository extends BaseRepository implements PaymentsInterface

{
    /**
     * @var Payment
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Payment   $model
     */
    public function __construct(Payment $model)
    {
        $this->model = $model;
    }
}

