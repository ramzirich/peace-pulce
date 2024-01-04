<?php

namespace App\Http\Requests\PatientDoctorRequest;
use Illuminate\Validation\ValidationException;

class PatientDoctorRequestValidation{
    public static function createPatientDoctorRequestValidation($request){
        try{
            $request->validate([
                "doctor_id" => "required|numeric",
            ],[
                "doctor_id.required" => "The Doctor id field is required",
                "doctor_id.numeric" => "The Doctor id field must be a number",
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