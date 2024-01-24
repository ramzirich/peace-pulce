<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Volunteer\VolunteerRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerController extends Controller
{
    //
    protected $user, $volunteer, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->volunteer = new Volunteer();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->volunteer);
    }

    public function getVolunteer(){
        return $this->userSpecificGenericManager->getByColumn('user_id', Auth::user()->id, 'user_id', ['user']);   
    }

    public function createVolunteer(Request $request){
        try{
            $validationResponse = VolunteerRequest::createVolunteerValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $volunteerObj = $this->userSpecificGenericManager->getByColumn('user_id', Auth::user()->id, 'user_id'); 
            if($volunteerObj){
                return ExceptionMessages::Error("Bad Request", 400);
            } 
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);

        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateVolunteer(Request $request){
        try{
            $volunteerObj =  $this->userSpecificGenericManager->getByColumn('user_id', Auth::user()->id, 'user_id');
            if($volunteerObj){
                $data  = $request->all();
                $volunteerObj->fill($data);
                $volunteerObj->save();

                return response()->json([
                    'status'=> 'success',
                    'data'=> $volunteerObj
                ]);
            }
            return ExceptionMessages::NotFound("Doctor");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
