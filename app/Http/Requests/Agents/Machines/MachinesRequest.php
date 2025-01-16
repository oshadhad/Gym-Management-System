<?php

namespace App\Http\Requests\Agents\Machines;

use Illuminate\Foundation\Http\FormRequest;

class MachinesRequest extends FormRequest
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
            'machineName' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'EstDate' => 'required|date',
            'photo' => 'required|nullable|file|mimes:png,jpg,gif|max:2048',
            'status' => 'required',
        ];
    }

    /**
     * Handle the image upload and return the file path.
     *
     * @return string|null
     */
    public function handleImageUpload()
    {
        if ($this->hasFile('photo') && $this->file('photo')->isValid()) {
            // Store the image in the 'agents/machines' directory
            return $this->file('photo')->store('agents/machines', 'public');
        }

        return null;
    }
}
