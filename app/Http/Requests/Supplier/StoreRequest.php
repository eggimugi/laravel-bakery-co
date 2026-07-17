<?php

namespace App\Http\Requests\Supplier;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'supplier_name' => 'required|string|max:255',
            'supplier_address' => 'required|string|max:255',
            'supplier_phone' => 'required|string|regex:/^\+?[0-9]{7,15}$/',
        ];
    }

    public function messages(): array
    {
        return [
            'supplier_name.required' => 'Please enter the supplier name.',
            'supplier_address.required' => 'Please enter the supplier address.',
            'supplier_phone.required' => 'Please enter the supplier phone number.',
        ];
    }
}
