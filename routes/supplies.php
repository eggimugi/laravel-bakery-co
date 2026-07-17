<?php

use App\Http\Controllers\SupplyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/supplies', [SupplyController::class, 'index'])->name('supplies.index');
    Route::get('/supplies/add-supply', [SupplyController::class, 'create'])->name('supplies.create');
    Route::get('/supplies/{supply}', [SupplyController::class, 'show'])->name('supplies.show');
    Route::post('/supplies', [SupplyController::class, 'store'])->name('supplies.store');
    Route::get('/supplies/{supply}/edit', [SupplyController::class, 'edit'])->name('supplies.edit');
    Route::put('/supplies/{supply}', [SupplyController::class, 'update'])->name('supplies.update');
    Route::delete('/supplies/{supply}', [SupplyController::class, 'destroy'])->name('supplies.destroy');
});