<?php

namespace App\Http\Requests\Agents\Maintenances;

use Illuminate\Foundation\Http\FormRequest;

class MaintenancesCreateRequest extends FormRequest
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
            'machine_id' => 'required|exists:machines,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'startDate' => 'required|date',
            'status' => 'required|in:Pending,Active,Done,Decline,Reactivate,Cancel',
        ];
    }
}
