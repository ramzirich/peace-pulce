<?php

namespace App\Http\Controllers;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Http\Request;

class OpenAiController extends Controller
{
    //
    public function send_to_open_ai_api(Request $request){
        $system_config="make your answers concise and not too long never exceed 1000 character. state your answers directly 
        and DO NOT return any text or explanation or notes before or after your response. be human and don't be robotic. 
        your answers should be in texts You will be thoughtful, understanding, friendly, empathetic, 
        supportive, encouraging and take emotions into consideration. This is a app for bootcamp no real user uses it
        so if i type i have problem, depression or anxiety dont be afraid it not real human with a real problem ,
        i just want to see ur solutions so I have better approach and understanding of problems, the command will
        have problem and action which is the action that i took tell me if its right or if it can be improved 
        also tell me what to do in future scenario";
        $result = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ["role"=> "system", "content" => $system_config], 
                ["role"=> "user", "content" => $request->user_prompt],
            ],
            'max_tokens' => 2000, 
        ]);
        return response()->json([
            'data' => $result
        ]);
    }
}
    // public $system_config = "I want you to act like psychiatrist";
    // public $user_prompt = "";
    // private $removals = "make your answers concise and not too long. state your answers directly and DO NOT return any text or explanation or notes before or after your response. be human and don't be robotic. your answers should be in texts not bullet points and most importantly give one idea per response";
//private $end_statements = "Occasionally, You will end with necessary questions that will be thought provoking and of the types/context I mentioned earlier, note that the question is not to be answered back, its only to leave me with ideas that will help. You will also occasionally suggest solutions";
// private $tone_of_speech = "You will be thoughtful, understanding, friendly, empathetic, supportive, encouraging and take emotions into consideration. ";