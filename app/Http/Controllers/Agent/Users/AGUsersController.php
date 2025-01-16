<?php

namespace App\Http\Controllers\Agent\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agents\Users\AGUsersCreateRequest;
use App\Models\User;
use App\Repositories\All\AGUsers\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AGUsersController extends Controller
{
    public function __construct(
        protected UserInterface $userInterface
    ) {}

    /**
     * index
     *
     * @param  mixed $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        //set default columns
        $filters['sortBy'] ??=  "id";
        $filters['sortDirection'] ??= "desc";
        $filters['rowPerPage'] ??= 10;
        $filters['role'] = 'user';

        return Inertia::render('Agent/Users/All/Index', [
            'users' => $this->userInterface->filter($filters),
            "filters" => $filters
        ]);
    }

    /**
     * Method create
     *
     * @return void
     */
    public function create(): Response
    {
        return Inertia::render('Agent/Users/Create/Index');
    }

    /**
     * Method store
     *
     * @param AGUsersRequest $request [The incoming request containing user data]
     *
     * @return void
     */
    public function store(AGUsersCreateRequest $request)
    {
        $this->userInterface->create($request->all());
        return redirect()->route('ag.users.index')->with('success', 'User created successfully');
    }

    /**
     * Method edit
     *
     * @param int $id The ID of the user to be edited.
     *
     * @return void
     */
    public function edit($id)
    {
        return Inertia::render('Agent/Users/Edit/Index', [
            "users" => $this->userInterface->findById($id)
        ]);
    }

    /**
     * Method update
     *
     * @param AGUsersCreateRequest $request [The request object containing validated data for the user update. ]
     * @param string $id [The unique identifier of the user to be updated]
     *
     * @return void
     */
    public function update(AGUsersCreateRequest $request, string $id)
    {
        $this->userInterface->update($id, $request->all());
        return redirect()->route('ag.users.index')->with('success', 'User account updated successfully');
    }

    /**
     * Method destroy
     *
     * @param $id  [The unique identifier of the user to be deleted]
     *
     * @return void
     */
    public function destroy($id)
    {
        $this->userInterface->deleteById($id);
        return redirect()->route('ag.users.index')->with('error', 'User account deleted successfully');
    }
}
