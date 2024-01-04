<?php

namespace App\Http\Requests\Volunteer;
use Illuminate\Validation\ValidationException;

class VolunteerRequest{
    public static function createVolunteerValidation($request){
        try{
            $request->validate([
                "about" => "required|string"
            ],[
                "about.required" => "The About field is required",
                "about.string" => "The About field must be a string",
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

    public static function updateVolunteerValidation($request){
        try{
            $request->validate([
                "about" => "string"
            ],[
                "about.string" => "The About field must be a number",
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