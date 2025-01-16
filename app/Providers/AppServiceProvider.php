<?php

namespace App\Providers;

use App\Repositories\All\AGAttendances\AttendancesInterface;
use App\Repositories\All\AGAttendances\AttendancesRepository;
use App\Repositories\All\AGMachines\MachinesInterface;
use App\Repositories\All\AGMachines\MachinesRepository;
use App\Repositories\All\AGMaintenances\MaintenancesInterface;
use App\Repositories\All\AGMaintenances\MaintenancesRepository;
use App\Repositories\All\AGPayments\PaymentsInterface;
use App\Repositories\All\AGPayments\PaymentsRepository;
use App\Repositories\All\AGUsers\UserInterface;
use App\Repositories\All\AGUsers\UserRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(MachinesInterface::class, MachinesRepository::class);
        $this->app->bind(MaintenancesInterface::class, MaintenancesRepository::class);
        $this->app->bind(PaymentsInterface::class, PaymentsRepository::class);
        $this->app->bind(AttendancesInterface::class, AttendancesRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
