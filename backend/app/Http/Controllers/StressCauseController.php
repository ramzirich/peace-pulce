<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\StressCause\CreateStressCauseRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Stress_cause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StressCauseController extends Controller
{
    //
    protected $user, $stressCause, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->stressCause = new Stress_cause();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->stressCause);
    }

    public function getStressCauseForUser($id){
        return $this->userSpecificGenericManager->findById($id, "patient_id");   
    }

    public function getAllStressCauseForUser(Request $request){
        $perPage = $request->query('perPage', 10);
        $page = $request->query('page', 1);
        $sortColumns = $request->query('sortColumns', []);
        $request->merge(['patient_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $perPage, $page, $sortColumns);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function createStressCause(Request $request){
        try{
            $validationResponse = CreateStressCauseRequest::createStressCauseValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);

        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateStressCause($id ,Request $request){
        return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, "patient_id");
    }
    
    public function deleteStressCause($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "patient_id");
    }

    public function massDeleteStressCause(Request $request){
        return $this->userSpecificGenericManager->massdeleteSpecificUser("patient_id", $request) ;
    }

}
