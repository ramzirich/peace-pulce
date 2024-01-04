<?php

namespace App\Http\Requests\Rating;
use Illuminate\Validation\ValidationException;

class RatingRequest{
    public static function createRatingValidation($request){
        try{
            $request->validate([
                "doctor_id" => "required|numeric",
                "rating" => "required|numeric|between:0,5",
            ],[
                "doctor_id.required" => "The Doctor id rate field is required",
                "doctor_id.numeric" => "The Doctor id rate field must be a number",
                "rating.required" => "The Rating field is required",
                "rating.numeric" => "The Rating field must be a number",
                "rating.between" => "The Rating field must be from 0 to 5",
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