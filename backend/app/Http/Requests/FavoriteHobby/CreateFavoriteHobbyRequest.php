<?php

namespace App\Http\Requests\FavoriteHobby;
use Illuminate\Validation\ValidationException;

class CreateFavoriteHobbyRequest{
    public static function createFavoriteHobbyValidation($request){
        try{
            $request->validate([
                "hobbies_id" => "required|numeric"
            ],[
                "hobbies_id.required" => "The Hobby id field is required",
                "hobbies_id.numeric" => "The Hobby id field must be a number",
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
