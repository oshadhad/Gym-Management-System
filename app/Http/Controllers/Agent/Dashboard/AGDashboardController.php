<?php

namespace App\Http\Controllers\Agent\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AGDashboardController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index(): Response
    {
        return Inertia::render('Agent/Dashboard/Index');
    }
}
