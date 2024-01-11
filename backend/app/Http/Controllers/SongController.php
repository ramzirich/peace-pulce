<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Song\SongRequest;
use Illuminate\Http\Request;
use App\Models\Song;

class SongController extends Controller
{
    //
    public function uploadSong(Request $request)
    {
        try {
            $validationResponse = SongRequest::createSongValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true); 
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $audio = $request->file('filename');
            $filename = time() . '.' . $audio->getClientOriginalExtension();
            $audio->move(public_path('audio'), $filename);

            Song::create([
                'title' => $request->title,
                'filename' => $filename,
                'artist' => $request->artist
            ]);

            return response()->json([
                'status' => 'success',
                'data' => 'Song successfully uploaded'
            ], 201);
        } catch (\Exception $exception) {
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function getAllSongs(){
        try{
            $songs = new Song();
            $list = $songs->get();
            return response()->json([
                "status" => "success",
                "data"=> $list
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
