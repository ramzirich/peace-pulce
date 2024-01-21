<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Doctor\DoctorRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Doctors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    //
    protected $user, $doctor, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->doctor = new Doctors();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->doctor);
    }

    public function getDoctor(){
        return $this->userSpecificGenericManager->getByColumn("user_id", $this->user->id, "user_id");  
    }

    // public function createDoctor(Request $request){
    //     try{
    //         $validationResponse = DoctorRequest::createDoctorValidation($request);
    //         $responseData = json_decode($validationResponse->getContent(), true);
        
    //         if($responseData['status'] != "success"){
    //             return $responseData['errors'];
    //         }

    //         $doctorObj = $this->userSpecificGenericManager->getByColumn("user_id", $this->user->id, ); 
    //         if($doctorObj){
    //             return ExceptionMessages::Error("Bad Request", 400);
    //         } 
            
    //         return $this->userSpecificGenericManager->createWithSpecificUser($request);

    //     }catch(\Exception $exception){
    //         return ExceptionMessages::Error($exception->getMessage());
    //     }
    // }

    public function updateDoctor(Request $request){
        try{
            $doctorModel =  $this->userSpecificGenericManager->getByColumn("user_id", $this->user->id,'user_id');
            if($doctorModel){
                $data  = $request->all();
                $doctorModel->fill($data);
                $doctorModel->save();

                return response()->json([
                    'status'=> 'success',
                    'data'=> $doctorModel
                ]);
            }
            return ExceptionMessages::NotFound("Doctor");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
