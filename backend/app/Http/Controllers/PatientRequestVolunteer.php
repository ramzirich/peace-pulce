<?php

namespace App\Http\Controllers;
use App\Exceptions\ExceptionMessages;
use App\Http\Requests\PatientDoctorRequest\PatientDoctorRequestValidation;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Patient_doctor_request;
use App\Models\patient_volunteer_request;
use App\Models\Volunteer;
use Illuminate\Support\Facades\Auth;
use App\Models\Doctors;

use Illuminate\Http\Request;

class PatientRequestVolunteer extends Controller
{
    //
    protected $user, $volunteerRequest, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->volunteerRequest = new patient_volunteer_request ();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->volunteerRequest);
    }

    public function getRequestForPatient($id){
        return $this->userSpecificGenericManager->getByColumn("volunteer_id", $id, 'patient_id', $with=['volunteer']);   
    }

    public function getAllVolunteerRequestForPatient(Request $request){
        $request->merge(['patient_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $with=['volunteer']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function createVolunteerRequest(Request $request){
        try{
            // $validationResponse = PatientDoctorRequestValidation::createPatientDoctorRequestValidation($request);
            // $responseData = json_decode($validationResponse->getContent(), true);
            
            // if($responseData['status'] != "success"){
            //     return response()->json([
            //         "error" => $responseData['errors']
            //     ], 422); 
            // }

            $genericManager = new GenericManager(new Volunteer);
            $data = $request->json()->all();
            $doctorObj = $genericManager->findById($data['volunteer_id']);
            if(!$doctorObj){
                return ExceptionMessages::NotFound("Volunteer");
            }

            $isRequestExist = $this->userSpecificGenericManager
                                    ->getByColumn('volunteer_id', $data['volunteer_id'], 'patient_id');
            if(!empty($isRequestExist)){
                return ExceptionMessages::Error("Request already sent", 400);
            } 

            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteVolunteerRequest($id){
        try{
            $this->volunteerRequest->where('volunteer_id', $id)->where('patient_id',$this->user->id)->first();
            return response()->json([
                'status'=> 'success',
                'message'=> "Volunteer Request successfully deleted" 
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
}
