<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->hasAnyRole(['owner', 'manager'])) {
            return redirect()->intended('/dashboard');
        }

        return redirect()->intended('/orders/add-order');
    }
}
