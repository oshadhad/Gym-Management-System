<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ADDashboardController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard/Index');
    }
}
