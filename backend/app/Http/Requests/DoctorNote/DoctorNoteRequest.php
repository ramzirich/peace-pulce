<?php

namespace App\Http\Requests\DoctorNote;
use Illuminate\Validation\ValidationException;

class DoctorNoteRequest{
    public static function createDoctorNoteValidation($request){
        try{
            $request->validate([
                "patient_id" => "required|numeric",
                "note" => "required|string"
            ],[
                "patient_id.required" => "The Patient id field is required",
                "patient_id.numeric" => "The Patient id field must be a number",
                "note.required" => "The Note field is required",
                "note.numeric" => "The Note field must be a number",
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

    public static function updateDoctorNoteValidation($request){
        try{
            $request->validate([
                "note" => "required|string"
            ],[
                "note.required" => "The Note field is required",
                "note.numeric" => "The Note field must be a number",
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