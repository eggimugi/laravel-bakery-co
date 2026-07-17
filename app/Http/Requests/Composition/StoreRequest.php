<?php

namespace App\Http\Requests\Composition;

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
            'cake_id' => 'required|exists:cakes,id',
            'materials' => 'required|array|min:1',
            'materials.*.material_id' => 'required|exists:materials,id|distinct',
            'materials.*.quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'cake_id.required' => 'Please select a cake.',
            'materials.*.material_id.required' => 'Please select a material.',
            'materials.*.material_id.exists' => 'Please select a valid material.',
            'materials.*.material_id.distinct' => 'This material has already been selected.',

            'materials.*.quantity.required' => 'Please enter a quantity.',
            'materials.*.quantity.min' => 'Quantity must be at least 1.',
        ];
    }

    public function attributes(): array
    {
        return [
            'materials.*.material_id' => 'material',
            'materials.*.quantity' => 'quantity',
        ];
    }
}
