<?php

namespace App\Http\Requests\User;

use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class UpdateUserRequest{
    public static function updateUserValidation($req){
        try{
            $validateData = $req->validate([
                'first_name' => 'string|max:20',
                'last_name' => 'string|max:20',
                'email' => 'email|unique:users,email|max:100',
                'password' => ['string',
                                'min:8',
                                'max:20',
                                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,20}$/'
                                ]
            ],[
                'first_name.string' => 'The first name must be a string with a maximum of 20 characters.',
                'first_name.max' => 'The first name must not exceed 20 characters.',

                'last_name.string' => 'The last name must be a string with a maximum of 20 characters.',
                'last_name.max' => 'The first name must not exceed 20 characters.',
                
                'email.email' => 'Please enter a valid email address.',
                'email.unique' => 'This email address is already in use.',
                'email.max' => 'The email must not exceed 100 characters.',

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

