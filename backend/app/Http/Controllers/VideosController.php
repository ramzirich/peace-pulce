<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use Illuminate\Http\Request;
use App\Models\Videos;

class VideosController extends Controller
{
    //
    public function uploadVideo(Request $request){
        try{
            $request->validate([
                'title' => 'required',
                'video' => 'required|mimes:mp4,mov,ogg,qt',
                'duration' => 'required|numeric'
            ]);
    
            $video = $request->file('video');
            $filename = time() . '.' . $video->getClientOriginalExtension();
            $video->move(public_path('videos'), $filename);
    
            Videos::create([
                'title' => $request->title,
                'filename' => $filename,
                'duration' => $request['duration']
            ]);

            return response()->json([
                'status' => 'success',
                'data' => "Video successfully uploaded"
            ], 201);
        }catch(\Exception $exception){
            ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function getAllVideos(){
        try{
            $videos = new Videos();
            $list = $videos->get();
            return response()->json([
                "status" => "success",
                "data"=> $list
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
