<?php

namespace App\Http\Controllers\Agent\Payments;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agents\Payments\PaymentsCreateRequest;
use App\Http\Requests\Agents\Payments\PaymentsUpdateRequest;
use App\Repositories\All\AGPayments\PaymentsInterface;
use App\Repositories\All\AGUsers\UserInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AGPaymentsController extends Controller
{
    public function __construct(
        protected PaymentsInterface $paymentsInterface,
        protected UserInterface $userInterface
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] ??=  "id";
        $filters['sortDirection'] ??= "desc";
        $filters['rowPerPage'] ??= 10;

        return Inertia::render('Agent/Payments/All/Index', [
            "payments" => $this->paymentsInterface->filter($filters),
            "users" => $this->userInterface->all(),
            "filters" => $filters
        ]);
    }

    public function create(): Response
    {

    return Inertia::render('Agent/Payments/Create/Index', [
        "users" => $this->userInterface->all(),
    ]);

    }

    public function store(PaymentsCreateRequest $request)
    {
        $this->paymentsInterface->create($request->all());
        return redirect()->route('ag.payments.index')->with('success', 'Payment record created successfully');
    }

    public function edit($id)
    {
        return Inertia::render('Agent/Payments/Edit/Index',[
            "payments" => $this->paymentsInterface->findById($id),
            "users" => $this->userInterface->all(),
        ]);
    }

    public function update(PaymentsUpdateRequest $request, string $id)
    {
        $this->paymentsInterface->update($id, $request->all());
        return redirect()->route('ag.payments.index')->with('success', 'Payment updated successfully');
    }

    public function destroy($id)
    {
        $this->paymentsInterface->deleteById($id);
        return redirect()->route('ag.payments.index')->with('error', 'Payment deleted successfully');
    }

}
