<?php

namespace App\Http\Requests\Song;
use Illuminate\Validation\ValidationException;

class SongRequest{
    public static function createSongValidation($request){
        try{
            $request->validate([
                "title" => "required",
                "filename" => "required|mimes:mp3,wav",
                "artist" => "required",
            ],[
                "title.required" => "The title field is required",
                "filename.required" => "The filename field is required",
                "filename.mimes" => "The filename field must contain mp3 or wav",
                "artist.required" => "The arttist field is required",
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