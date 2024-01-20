<?php

namespace App\Http\Requests\Problem;
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
                "problem.string" => "The Problem field must be a string",

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

    public static function updateProblemValidation($request){
        try{
            $request->validate([
                "problem" => "required|string",
                "action" => "required|string",
                "severity" => "required|numeric|between:0,10",
                "solution" => "string",
                "ai_solution" =>"string"
            ],[
                "problem.required" => "The Problem field is required",
                "problem.string" => "The Problem field must be a string",

                "action.required" => "The action field is required",
                "action.string" => "The action field must be a string",

                "severity.required" => "The severity field is required",
                "severity.numeric" => "The severity field must be numeric",
                "severity.between" => "The severity field must be from 0 to 10",

                "solution.string" => "The solution field must be a string",

                "solution_ai.string" => "The solution_ai field must be a string",
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