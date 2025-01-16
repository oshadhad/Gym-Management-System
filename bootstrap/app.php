<?php

use App\Http\Middleware\RoleValidationMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => RoleValidationMiddleware::class
        ]);
        $middleware->redirectUsersTo(fn(Request $request) => $request->user()?->role === 'admin' ? '/admin/dashboard' : '/ag/dashboard');
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();