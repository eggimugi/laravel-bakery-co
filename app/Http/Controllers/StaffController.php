<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staffs = User::with('roles')
            ->role(['owner', 'manager', 'cashier'])
            ->get();

        $stats = [
            'totalStaffs' => $staffs->count(),
            'totalOwners' => User::role('owner')->count(),
            'totalManagers' => User::role('manager')->count(),
            'totalCashiers' => User::role('cashier')->count(),
        ];

        return Inertia::render('staffs/index', [
            'staffs' => $staffs,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $staffs = User::with('roles')
            ->role(['owner', 'manager', 'cashier'])
            ->get();

        $stats = [
            'totalStaffs' => $staffs->count(),
            'totalOwners' => User::role('owner')->count(),
            'totalManagers' => User::role('manager')->count(),
            'totalCashiers' => User::role('cashier')->count(),
        ];

        return Inertia::render('staffs/add-staff', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
            'stats' => $stats,
        ]);
    }

    public function store()
    {
        $validated = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => 'required|string|in:owner,manager,cashier',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('staffs.create')->with('success', 'Staff member created successfully.');
    }

    public function edit(User $user)
    {
        $user->load('roles');

        $staffs = User::with('roles')
            ->role(['owner', 'manager', 'cashier'])
            ->get();

        $stats = [
            'totalStaffs' => $staffs->count(),
            'totalOwners' => User::role('owner')->count(),
            'totalManagers' => User::role('manager')->count(),
            'totalCashiers' => User::role('cashier')->count(),
        ];

        return Inertia::render('staffs/edit-staff', [
            'staff' => $user,
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
            'stats' => $stats,
        ]);
    }

    public function update(User $user)
    {
        $validated = request()->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,'.$user->id,
            'role' => 'sometimes|string|in:owner,manager,cashier',
        ]);

        $user->update(collect($validated)->except('role')->toArray());

        if (isset($validated['role'])) {
            $user->syncRoles([$validated['role']]);
        }

        return redirect()->route('staffs.index')->with('success', 'Staff member updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('staffs.index')->with('success', 'Staff member removed successfully.');
    }
}
