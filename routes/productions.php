<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/productions', [\App\Http\Controllers\ProductionController::class, 'index'])->name('productions.index');
    Route::get('/productions/add-production', [\App\Http\Controllers\ProductionController::class, 'create'])->name('productions.create');
    Route::get('/productions/{production}', [\App\Http\Controllers\ProductionController::class, 'show'])->name('productions.show');
    Route::post('/productions', [\App\Http\Controllers\ProductionController::class, 'store'])->name('productions.store');
    Route::get('/productions/{production}/edit', [\App\Http\Controllers\ProductionController::class, 'edit'])->name('productions.edit');
    Route::put('/productions/{production}', [\App\Http\Controllers\ProductionController::class, 'update'])->name('productions.update');
    Route::delete('/productions/{production}', [\App\Http\Controllers\ProductionController::class, 'destroy'])->name('productions.destroy');
});