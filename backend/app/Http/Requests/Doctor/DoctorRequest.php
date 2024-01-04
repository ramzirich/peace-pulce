<?php

namespace App\Http\Requests\Doctor;
use Illuminate\Validation\ValidationException;

class DoctorRequest{
    public static function createDoctorValidation($request){
        try{
            $request->validate([
                "hourly_rate" => "required|numeric",
                "rating" => "required|numeric",
                "about" => "required|string",
                "degree" => "required|string|max:255"
            ],[
                "hourly_rate.required" => "The Hourly rate field is required",
                "hourly_rate.numeric" => "The Hourly rate field must be a number",
                "rating.required" => "The Rating field is required",
                "rating.numeric" => "The Rating field must be a number",
                "about.required" => "The About field is required",
                "about.string" => "The About field must be a string",
                "degree.required" => "The Degree field is required",
                "degree.string" => "The Degree field must be a string",
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

    public static function updateDoctorValidation($request){
        try{
            $request->validate([
                "hourly_rate" => "numeric",
                "rating" => "numeric",
                "about" => "string",
                "degree" => "string|max:255"
            ],[
                "hourly_rate.numeric" => "The Hourly rate field must be a number",
                "rating.required" => "The Rating field is required",
                "rating.numeric" => "The Rating field must be a number",
                "about.string" => "The About field must be a string",
                "degree.string" => "The Degree field must be a string",
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