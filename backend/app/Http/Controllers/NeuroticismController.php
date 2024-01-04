<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Neuroticism\CreateRecordRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Neuroticism;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NeuroticismController extends Controller
{
    private $user;
    private $userSpecGenericManager;
    private $neuroticism; 

    public function __construct(){
        $this->user = Auth::user();
        $this->neuroticism = new Neuroticism();
        $this->userSpecGenericManager = new UserSpecificGenericManager ($this->neuroticism );
    }
    public function createRecord(Request $request){
        try{
            $validationResponse = CreateRecordRequest::createRecordValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            return $this->userSpecGenericManager->createWithSpecificUser($request);

        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function findAllRecords(Request $request){
        $perPage = $request->query('perPage', 10);
        $page = $request->query('page', 1);
        $sortColumns = $request->query('sortColumns', []);
        $request->merge(['user_id' => $this->user->id]);
        $model = $this->userSpecGenericManager->getAllForCurrentUser($request, $perPage, $page, $sortColumns);
        if(!$model){
            return [];
        }
        return $model;
    }
}
