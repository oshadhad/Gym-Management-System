<?php

namespace App\Http\Requests\Agents\Payments;

use Illuminate\Foundation\Http\FormRequest;

class PaymentsUpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'in:Subscription Fee,Registration Fee'],
            'subs' => ['nullable', 'in:Annual,Monthly'],
            'amount' => ['required', 'numeric', 'min:0'],
        ];
    }
    
    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'User selection is mandatory.',
            'type.required' => 'Payment type is required.',
            'type.in' => 'Payment type must be either Subscription Fee or Registration Fee.',
            'subs.in' => 'Subscription type must be Annual or Monthly.',
            'amount.required' => 'Amount is required.',
            'amount.numeric' => 'Amount must be a valid number.',
            'amount.min' => 'Amount must be at least 0.',
        ];
    }
}
