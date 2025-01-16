<?php

namespace App\Http\Requests\Attendances;

use Illuminate\Foundation\Http\FormRequest;

class AttendancesCreateRequest extends FormRequest
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
            'user_id' => 'required | exists:users,id',
            'day' => 'required | date',
            'opt_in' => 'nullable|date_format:Y-m-d H:i:s',
            'opt_out' => 'nullable|date_format:Y-m-d H:i:s',
        ];
    }
}
