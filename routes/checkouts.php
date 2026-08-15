<?php

use App\Http\Controllers\Orders\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('orders/checkouts', [CheckoutController::class, 'index'])->name('checkouts.index');

});
