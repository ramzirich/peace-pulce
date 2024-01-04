<?php 

namespace App\Exceptions;
class  ExceptionMessages{

    public static function Error($message, $code = 500){
        return response()->json([
            "status" => 'error',
            'message'=> $message,
        ], $code);
    }

    public static function NotFound($model){
        return response()->json([
            "status" => 'error',
            'message'=> "$model Not Found",
        ], 404);
    }
}