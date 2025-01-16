<?php

namespace App\Http\Requests\Agents\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;



class AGUsersCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
         
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'role' => 'user'
        ]);
    }
}
