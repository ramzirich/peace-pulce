<?php

namespace App\Http\Requests\FavoritePlace;
use Illuminate\Validation\ValidationException;

class CreateFavoritePlaceRequest{
    public static function createFavoritePlaceValidation($request){
        try{
            $request->validate([
                "places_id" => "required|numeric"
            ],[
                "places_id.required" => "The Place id field is required",
                "places_id.numeric" => "The Place id field must be a number",
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
