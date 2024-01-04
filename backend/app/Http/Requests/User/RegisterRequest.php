<?php

namespace App\Http\Requests\User;

use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class RegisterRequest{
    public static function registrationValidation($req){
        try{
            $validateData = $req->validate([
                'first_name' => 'required|string|max:20',
                'last_name' => 'required|string|max:20',
                'email' => 'required|email|unique:users,email|max:100',
                'password' => ['required',
                'string',
                'min:8',
                'max:20',
                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/'
                ]
            ],[
                'first_name.required' => 'The first name field is required.',
                'first_name.string' => 'The first name must be a string with a maximum of 20 characters.',
                'first_name.max' => 'The first name must not exceed 20 characters.',

                'last_name.required' => 'The last name field is required.',
                'last_name.string' => 'The last name must be a string with a maximum of 20 characters.',
                'last_name.max' => 'The first name must not exceed 20 characters.',
                
                'email.required' => 'The email field is required.',
                'email.email' => 'Please enter a valid email address.',
                'email.unique' => 'This email address is already in use.',
                'email.max' => 'The email must not exceed 100 characters.',

                'password.required' => 'The password field is required.',
                'password.string' => 'The password must be a string.',
                'password.min' => 'The password must be at least 8 characters.',
                'password.max' => 'The password must not exceed 20 characters.',
                'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one numeric digit, one special character, and be between 8 and 20 characters.',
                
    
            ]);
            return response()->json([
                'status' => "success"
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'status' => "error",
                'errors' => $exception->errors()
            ], 422);
        }
    }
}

// namespace App\Http\Requests;

// use Illuminate\Foundation\Http\FormRequest;
// use Illuminate\Validation\Rule;
// use Illuminate\Validation\ValidationException;


// class RegisterRequest extends FormRequest
// {
//     /**
//      * Determine if the user is authorized to make this request.
//      */
//     public function authorize(): bool
//     {
//         return false;
//     }

//     /**
//      * Get the validation rules that apply to the request.
//      *
//      * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
//      */
//     public function rules(): array
//     {
//         return [
//             'first_name' => 'required|string|max:20',
//             'last_name' => 'required|string|max:20',
//             'email' => 'required|email|unique:users,email|max:100',
//             'password' => 'required',
//             'string',
//             'min:8',
//             'max:20',
//             Rule::regex('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/'),
//         ];
//     }

//     protected function failedValidation(ValidationException $exception)
//     {
//         return response()->json([
//             'status' => 'error',
//             'errors' => $exception->errors(),
//         ], 422);
//     }
// }
