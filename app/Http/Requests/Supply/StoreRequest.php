<?php

namespace App\Http\Requests\Supply;

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
            'supplier_id' => 'required|exists:suppliers,id',
            'supply_date' => 'required|date|after_or_equal:today',
            'items' => 'required|array|min:1',
            'items.*.material_id' => 'required|distinct|exists:materials,id',
            'items.*.material_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit' => 'required|string|in:item,gr,kg,ml,l'
        ];
    }

    public function messages(): array
    {
        return [
            'supplier_id.required' => 'Supplier is required.',
            'supplier_id.exists' => 'Selected supplier does not exist.',
            'supply_date.required' => 'Supply date is required.',
            'supply_date.date' => 'Supply date must be a valid date.',
            'supply_date.after_or_equal' => 'Supply date cannot be in the past.',
            'items.required' => 'At least one item is required.',
            'items.array' => 'Items must be an array.',
            'items.min' => 'At least one item is required.',
            'items.*.material_id.required' => 'Material is required for each item.',
            'items.*.material_id.distinct' => 'Duplicate materials are not allowed.',
            'items.*.material_id.exists' => 'Selected material does not exist.',
            'items.*.material_price.required' => 'Material price is required for each item.',
            'items.*.material_price.numeric' => 'Material price must be a number.',
            'items.*.material_price.min' => 'Material price must be at least 0.',
            'items.*.quantity.required' => 'Quantity is required for each item.',
            'items.*.quantity.integer' => 'Quantity must be an integer.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',
            'items.*.unit.required' => 'Unit is required for each item.',
            'items.*.unit.in' => 'Unit must be one of the following: item, gr, kg, ml, l.'
        ];
    }
}
