<?php

namespace App\Manager;
use OpenAI\Laravel\Facades\OpenAI;

class OpenAiHelper{
    public function send_to_open_ai_api($system_config, $user_prompt){
        
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5',
            'messages' => [
                ["role"=> "system", "content" => $system_config], 
                ["role"=> "user", "content" => $user_prompt],
            ],
            'max_tokens' => 3000, 
        ]);
        return $result;
    }
}

    