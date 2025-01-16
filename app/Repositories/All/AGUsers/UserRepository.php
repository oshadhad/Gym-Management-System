<?php

namespace App\Repositories\All\AGUsers;

use App\Models\User;
use App\Repositories\All\AGUsers\UserInterface;
use App\Repositories\Base\BaseRepository;

class UserRepository extends BaseRepository implements UserInterface
{
    /**
     * @var User
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  User  $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }
}

