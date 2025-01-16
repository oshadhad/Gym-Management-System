<?php

namespace App\Http\Controllers\Agent\Others\Machines;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agents\machines\MachinesRequest;
use App\Repositories\All\AGMachines\MachinesInterface;
use App\Repositories\All\AGMaintenances\MaintenancesInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AGMachinesController extends Controller
{
    public function __construct(
        protected MachinesInterface $machinesInterface,
        protected MaintenancesInterface $maintenancesInterface
    ){}

    /**
     * Method index
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request): Response
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] ??=  "id";
        $filters['sortDirection'] ??= "desc";
        $filters['rowPerPage'] ??= 10;

        return Inertia::render('Agent/Other/Machines/All/Index', [
            'machines' => $this->machinesInterface->filter($filters),
            "filters" => $filters
        ]);
    }

    /**
     * Method create
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Agent/Other/Machines/Create/Index');
    }

    /**
     * Method store
     *
     * @param MachinesRequest $request
     * @return void
     */
    public function store(MachinesRequest $request)
    {
        $imagePath = $request->handleImageUpload();

        $this->machinesInterface->create(array_merge($request->all(), ['photo' => $imagePath]));
        return redirect()->route('ag.machines.index')->with('success', 'Machine added successfully');
    }

    /**
     * Method edit
     *
     * @param $id
     *
     * @return void
     */
    public function edit($id)
    {
        return Inertia::render('Agent/Other/Machines/Edit/Index', [
            "machines" => $this->machinesInterface->findById($id)
        ]);
    }

    /**
     * Method update
     *
     * @param MachinesRequest $request
     * @param string $id
     *
     * @return void
     */
    public function update(MachinesRequest $request, string $id)
    {
        $imagePath = $request->handleImageUpload();
        $this->machinesInterface->update($id, array_merge($request->all(), ['photo' => $imagePath]));
        return redirect()->route('ag.machines.index')->with('success', 'Machine updated successfully');
    }

    /**
     * Method destroy
     *
     * @param $id
     * @return void
     */
    public function destroy($id)
    {
        $this->machinesInterface->deleteById($id);
        return redirect()->route('ag.machines.index')->with('error', 'Machine deleted successfully');
    }
}
