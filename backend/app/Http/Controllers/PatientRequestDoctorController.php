<?php

namespace App\Http\Controllers;
use App\Exceptions\ExceptionMessages;
use App\Http\Requests\PatientDoctorRequest\PatientDoctorRequestValidation;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Patient_doctor_request;
use Illuminate\Support\Facades\Auth;
use App\Models\Doctors;

use Illuminate\Http\Request;

class PatientRequestDoctorController extends Controller
{
    //
    protected $user, $doctorRequest, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->doctorRequest = new Patient_doctor_request();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->doctorRequest);
    }

    public function getRequestForPatient($id){
        return $this->userSpecificGenericManager->getByColumn("doctor_id", $id, 'patient_id', $with=['doctor']);   
    }

    public function getAllDoctorRequestForPatient(Request $request){
        $request->merge(['patient_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $with=['doctor']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function createDoctorRequest(Request $request){
        try{
            $validationResponse = PatientDoctorRequestValidation::createPatientDoctorRequestValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
            
            if($responseData['status'] != "success"){
                return response()->json([
                    "error" => $responseData['errors']
                ], 422); 
            }

            $genericManager = new GenericManager(new Doctors);
            $data = $request->json()->all();
            $doctorObj = $genericManager->findById($data['doctor_id']);
            if(!$doctorObj){
                return ExceptionMessages::NotFound("Doctor");
            }

            $isRequestExist = $this->userSpecificGenericManager
                                    ->getByColumn('doctor_id', $data['doctor_id'], 'patient_id');
            if(!empty($isRequestExist)){
                return ExceptionMessages::Error("Request already sent", 400);
            } 

            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteDoctorRequest($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "patient_id");
    }

    // public function massDeleteDoctorRequest(Request $request){
    //     return $this->userSpecificGenericManager->massdeleteSpecificUser("patient_id", $request) ;
    // }
}
