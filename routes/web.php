<?php

use App\Http\Controllers\Admin\Dashboard\ADDashboardController;
use App\Http\Controllers\Agent\Dashboard\AGDashboardController;
use App\Http\Controllers\Agent\Others\Machines\AGMachinesController;
use App\Http\Controllers\Agent\Others\Maintenances\AGMaintenancesController;
use App\Http\Controllers\Agent\Payments\AGPaymentsController;
use App\Http\Controllers\Agent\Users\AGUsersController;
use App\Http\Controllers\Attendances\AGAttendancesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

ROute::redirect('/', '/login');

Route::middleware('auth')->group(function () {

    // Agent Routes
    Route::prefix('ag')->name('ag.')->middleware('role:agent')->group(function () {
        Route::get('/dashboard', [AGDashboardController::class, 'index'])->name('dashboard');

        //Users Routes
        Route::get('/users', [AGUsersController::class, 'index'])->name('users.index');
        Route::get('/users/create', [AGUsersController::class, 'create'])->name('users.create');
        Route::get('/users/{id}/edit', [AGUsersController::class, 'edit'])->name('users.edit');
        Route::post('/users/store', [AGUsersController::class, 'store'])->name('users.store');
        Route::patch('/users/{id}/update', [AGUsersController::class, 'update'])->name('users.update');
        Route::delete('/users/{id}', [AGUsersController::class, 'destroy'])->name('users.destroy');

        //Attendances Routes
        Route::get('/attendances', [AGAttendancesController::class, 'index'])->name('attendances.index');
        Route::get('/attendances/create', [AGAttendancesController::class, 'create'])->name('attendances.create');
        Route::post('/attendances/store', [AGAttendancesController::class, 'store'])->name('attendances.store');

        //Payments Routes
        Route::get('/payments', [AGPaymentsController::class, 'index'])->name('payments.index');
        Route::get('/payments/create', [AGPaymentsController::class, 'create'])->name('payments.create');
        Route::get('/payments/{id}/edit', [AGPaymentsController::class, 'edit'])->name('payments.edit');
        Route::post('/payments/store', [AGPaymentsController::class, 'store'])->name('payments.store');
        Route::patch('/payments/{id}/update', [AGPaymentsController::class, 'update'])->name('payments.update');
        Route::delete('/payments/{id}', [AGPaymentsController::class, 'destroy'])->name('payments.destroy');

        //Maintenance Routes
        Route::get('/maintenances', [AGMaintenancesController::class, 'index'])->name('maintenances.index');
        Route::get('/maintenances/create', [AGMaintenancesController::class, 'create'])->name('maintenances.create');
        Route::get('/maintenances/{id}/edit', [AGMaintenancesController::class, 'edit'])->name('maintenances.edit');
        Route::post('/maintenances/store', [AGMaintenancesController::class, 'store'])->name('maintenances.store');
        Route::patch('/maintenances/{id}/update', [AGMaintenancesController::class, 'update'])->name('maintenances.update');
        Route::delete('/maintenances/{id}', [AGMaintenancesController::class, 'destroy'])->name('maintenances.destroy');

        //Machines Routes
        Route::get('/machines', [AGMachinesController::class, 'index'])->name('machines.index');
        Route::get('/machines/create', [AGMachinesController::class, 'create'])->name('machines.create');
        Route::get('/machines/{id}/edit', [AGMachinesController::class, 'edit'])->name('machines.edit');
        Route::post('/machines/store', [AGMachinesController::class, 'store'])->name('machines.store');
        Route::patch('/machines/{id}/update', [AGMachinesController::class, 'update'])->name('machines.update');
        Route::delete('/machines/{id}', [AGMachinesController::class, 'destroy'])->name('machines.destroy');
    });

    // Admin Routes
    Route::prefix('admin')->name('ad.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [ADDashboardController::class, 'index'])->name('dashboard');
    });



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
