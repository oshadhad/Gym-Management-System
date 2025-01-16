<?php

namespace App\Http\Controllers\Attendances;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendances\AttendancesCreateRequest;
use App\Models\Attendance;
use App\Repositories\All\AGAttendances\AttendancesInterface;
use App\Repositories\All\AGUsers\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AGAttendancesController extends Controller
{
    public function __construct(
        protected AttendancesInterface $attendancesInterface,
        protected UserInterface $userInterface
    ) {}

    public  function index()
    {
        return Inertia::render('Agent/Attendances/All/Index', [
            "users" => $this->userInterface->getByColumn([], ['*']),
            "attendances" => $this->attendancesInterface->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Agent/Attendances/Create/Index', [
            "users" => $this->userInterface->getByColumn([], ['*']),
        ]);
    }

    public function store(AttendancesCreateRequest $request)
    {
        $this->attendancesInterface->create($request->all());
        return redirect()->route('ag.attendances.index')->with('success', 'Maintenances record created successfully');
    }
}
