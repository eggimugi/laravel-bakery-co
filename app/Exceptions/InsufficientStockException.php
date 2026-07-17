<?php

namespace App\Exceptions;

use Exception;

class InsufficientStockException extends Exception
{
    public function __construct(string $message = 'Insufficient stock.')
    {
        parent::__construct($message);
    }

    /**
     * Render exception ke response HTTP.
     * Karena app ini pakai Inertia, redirect balik dengan error
     * daripada return JSON — supaya konsisten dengan UX Inertia
     * yang selalu full-page/partial reload, bukan API response.
     */
    public function render($request): \Illuminate\Http\RedirectResponse
    {
        return back()->withErrors([
            'stock' => $this->getMessage(),
        ]);
    }
}
