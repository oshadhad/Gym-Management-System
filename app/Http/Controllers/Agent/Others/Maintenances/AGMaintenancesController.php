<?php

namespace App\Http\Controllers\Agent\Others\Maintenances;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agents\Maintenances\MaintenancesCreateRequest;
use App\Http\Requests\Agents\Maintenances\MaintenancesUpdateRequest;
use App\Repositories\All\AGMachines\MachinesInterface;
use App\Repositories\All\AGMaintenances\MaintenancesInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AGMaintenancesController extends Controller
{
    public function __construct(
        protected MaintenancesInterface $maintenancesInterface,
        protected MachinesInterface $machinesInterface
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] ??=  "id";
        $filters['sortDirection'] ??= "desc";
        $filters['rowPerPage'] ??= 10;

        return Inertia::render('Agent/Other/Maintenances/All/Index', [
            'maintenances' => $this->maintenancesInterface->filter($filters),
            "machines" => $this->machinesInterface->all(),
            "filters" => $filters
        ]);
    }


    public function create(): Response
    {
        $machines = $this->machinesInterface->all()
            ->filter(fn($machine) => $machine->status === 'Running' || $machine->status === 'Inactive')
            ->values()
            ->toArray();

        return Inertia::render('Agent/Other/Maintenances/Create/Index', [
            'machines' => $machines,
        ]);
    }


    public function store(MaintenancesCreateRequest $request)
    {
        $this->maintenancesInterface->create($request->all());
        if ($request->input('status') === 'Active') {
            $machine = $this->machinesInterface->findById($request->input('machine_id'));
            if ($machine) {
                $machine->status = 'In Maintenance';
                $machine->save();
            }
        }
        return redirect()->route('ag.maintenances.index')->with('success', 'Maintenances record created successfully');
    }

    public function edit($id): Response
    {
        return Inertia::render('Agent/Other/Maintenances/Edit/Index', [
            "maintenances" => $this->maintenancesInterface->findById($id),
            "machines" => $this->machinesInterface->all(),
        ]);
    }

    public function update(MaintenancesUpdateRequest $request, string $id)
    {
        $this->maintenancesInterface->update($id, $request->all());
        if ($request->input('status') === 'Active') {
            $machine = $this->machinesInterface->findById($request->input('machine_id'));
            if ($machine) {
                $machine->status = 'In Maintenance';
                $machine->save();
            }
        }
        return redirect()->route('ag.maintenances.index')->with('success', 'Maintenances record updated successfully');
    }

    public function destroy($id)
    {
        $this->maintenancesInterface->deleteById($id);
        return redirect()->route('ag.maintenances.index')->with('success', 'Maintenances record updated successfully');
    }
}
