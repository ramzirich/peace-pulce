<?php

namespace App\Http\Requests\User;

use Illuminate\Validation\ValidationException;

class LoginRequest
{
    public static function loginValidation($req){
        try{
            $validateData = $req->validate([
                'email' => 'required|email|max:100',
                'password' => ['required',
                'string',
                'min:8',
                'max:20',
                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/'
                ]
            ],[ 
                'email.required' => 'The email field is required.',
                'email.email' => 'Please enter a valid email address.',
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
