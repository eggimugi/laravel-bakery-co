<?php

namespace App\Http\Requests\Production;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'cake_id' => 'required|exists:cakes,id',
            'quantity' => 'required|integer|min:1',
            'production_date' => 'required|date|after_or_equal:today',
        ];
    }

    public function messages(): array
    {
        return [
            'cake_id.required' => 'The cake field is required.',
            'cake_id.exists' => 'The selected cake is invalid.',
            'quantity.required' => 'The quantity field is required.',
            'quantity.integer' => 'The quantity must be an integer.',
            'quantity.min' => 'The quantity must be at least 1.',
            'production_date.required' => 'The production date field is required.',
            'production_date.date' => 'The production date must be a valid date.',
            'production_date.after_or_equal' => 'The production date cannot be in the past.',
        ];
    }
}
