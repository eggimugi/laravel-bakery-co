<?php

use App\Http\Controllers\CakeController;
use App\Http\Controllers\CompositionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Staff Management Routes
    Route::get('/staffs', [StaffController::class, 'index'])->name('staffs.index');
    Route::get('/staffs/add-staff', [StaffController::class, 'create'])->name('staffs.create');
    Route::post('/staffs', [StaffController::class, 'store'])->name('staffs.store');
    Route::get('/staffs/{user}/edit', [StaffController::class, 'edit'])->name('staffs.edit');
    Route::put('/staffs/{user}', [StaffController::class, 'update'])->name('staffs.update');
    Route::delete('/staffs/{user}', [StaffController::class, 'destroy'])->name('staffs.destroy');

    // Cake Management Routes
    Route::get('/cakes', [CakeController::class, 'index'])->name('cakes.index');
    Route::get('/cakes/add-cake', [CakeController::class, 'create'])->name('cakes.create');
    Route::post('/cakes', [CakeController::class, 'store'])->name('cakes.store');
    Route::get('/cakes/{cake}/edit', [CakeController::class, 'edit'])->name('cakes.edit');
    Route::put('/cakes/{cake}', [CakeController::class, 'update'])->name('cakes.update');
    Route::delete('/cakes/{cake}', [CakeController::class, 'destroy'])->name('cakes.destroy');

    // Material Management Routes
    Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/add-material', [MaterialController::class, 'create'])->name('materials.create');
    Route::post('/materials', [MaterialController::class, 'store'])->name('materials.store');
    Route::get('/materials/{material}/edit', [MaterialController::class, 'edit'])->name('materials.edit');
    Route::put('/materials/{material}', [MaterialController::class, 'update'])->name('materials.update');
    Route::delete('/materials/{material}', [MaterialController::class, 'destroy'])->name('materials.destroy');

    // Composition Management Routes
    Route::get('/compositions', [CompositionController::class, 'index'])
        ->name('compositions.index');

    Route::get('/cakes/{cake}/compositions/add-composition', [CompositionController::class, 'create'])
        ->name('compositions.create');

    Route::post('/compositions', [CompositionController::class, 'store'])
        ->name('compositions.store');

    Route::get('/cakes/{cake}/compositions/edit', [CompositionController::class, 'edit'])
        ->name('compositions.edit');

    Route::put('/cakes/{cake}/compositions', [CompositionController::class, 'update'])
        ->name('compositions.update');

    Route::delete('/cakes/{cake}/compositions', [CompositionController::class, 'destroy'])
        ->name('compositions.destroy');

    Route::get('/cakes/{cake}/compositions', [CompositionController::class, 'show'])
        ->name('compositions.show');

});

require __DIR__.'/settings.php';
require __DIR__.'/suppliers.php';
require __DIR__.'/supplies.php';
require __DIR__.'/productions.php';
require __DIR__.'/orders.php';
