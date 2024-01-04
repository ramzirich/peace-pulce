<?php

namespace App\Http\Requests\StressCause;
use Illuminate\Validation\ValidationException;

class CreateStressCauseRequest{
    public static function createStressCauseValidation($request){
        try{
            $request->validate([
                "name" => "required|string|max:255"
            ],[
                "name.required" => "The name field is required",
                "name.string" => "The name field must be a string",
                "name.max" => "The name field length must be less tahn 255 character",
            ]);
            return response()->json([
                'status' => "success"
            ]);
        }catch (ValidationException $exception) {
            return response()->json([
                'status' => "error",
                'errors' => $exception->errors()
            ], 422);
        }
    }
}

