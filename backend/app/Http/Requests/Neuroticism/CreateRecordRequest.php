<?php

namespace App\Http\Requests\Neuroticism;

use Illuminate\Validation\ValidationException;

class CreateRecordRequest
{
    public static function createRecordValidation($req){
        try{
            // $allowedWords = ['anger', 'depression', 'anxiety', 'self_consciousness', 'immoderation', 'vulnerability'];

            $validateData = $req->validate([
                'anxiety' => 'required|numeric|between:0,100',
                'anger' => 'required|numeric|between:0,100',
                'depression' => 'required|numeric|between:0,100',
                'self_consciousness' => 'required|numeric|between:0,100',
                'immoderation' => 'required|numeric|between:0,100',
                'vulnerability' => 'required|numeric|between:0,100',      
            ],[ 
                'anxiety.required' => 'The anxiety field is required.',
                'anxiety.numeric' => 'The anxiety field must be a number.',
                'anxiety.between' => 'The anxiety field must be from 0 to 100.',

                'anger.required' => 'The anger field is required.',
                'anger.numeric' => 'The anger field must be a number.',
                'anger.between' => 'The anger field must be from 0 to 100.',

                'depression.required' => 'The depression field is required.',
                'depression.numeric' => 'The depression field must be a number.',
                'depression.between' => 'The depression field must be from 0 to 100.',

                'self_consciousness.required' => 'The self_consciousness field is required.',
                'self_consciousness.numeric' => 'The self_consciousness field must be a number.',
                'self_consciousness.between' => 'The self_consciousness field must be from 0 to 100.',

                'immoderation.required' => 'The immoderation field is required.',
                'immoderation.numeric' => 'The immoderation field must be a number.',
                'immoderation.between' => 'The immoderation field must be from 0 to 100.',

                'vulnerability.required' => 'The vulnerability field is required.',
                'vulnerability.numeric' => 'The vulnerability field must be a number.',
                'vulnerability.between' => 'The vulnerability field must be from 0 to 100.',
            ]);
            return response()->json([
                'status' => "success"
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'status' => "error",
                'errors' => $exception->errors()
            ], 422);
        }
    }
}
