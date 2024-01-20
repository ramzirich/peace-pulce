<?php

namespace App\Http\Requests\PatientComment;
use Illuminate\Validation\ValidationException;

class ProblemRequest{
    public static function createProblemValidation($request){
        try{
            $request->validate([
                "problem" => "required|string",
                "action" => "required|string",
                "severity" => "required|numeric",
            ],[
                "problem.required" => "The Problem field is required",
                "problem.string" => "The Problem field must be a stringaction",

                "action.required" => "The action field is required",
                "action.string" => "The action field must be a string",

                "severity.required" => "The severity field is required",
                "severity.string" => "The severity field must be a string",
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