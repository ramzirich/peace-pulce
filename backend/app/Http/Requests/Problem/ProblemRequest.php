<?php

namespace App\Http\Requests\PatientComment;
use Illuminate\Validation\ValidationException;

class ProblemRequest{
    public static function createProblemValidation($request){
        try{
            $request->validate([
                "problem" => "required|string",
                "action" => "required|string",
                "severity" => "required|numeric|between:0,10",
            ],[
                "problem.required" => "The Problem field is required",
                "problem.string" => "The Problem field must be a stringaction",

                "action.required" => "The action field is required",
                "action.string" => "The action field must be a string",

                "severity.required" => "The severity field is required",
                "severity.numeric" => "The severity field must be numeric",
                "severity.between" => "The severity field must be from 0 to 10"
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