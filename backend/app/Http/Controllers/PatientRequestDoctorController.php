<?php

namespace App\Http\Controllers;
use App\Exceptions\ExceptionMessages;
use App\Http\Requests\PatientDoctorRequest\PatientDoctorRequestValidation;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Patient_doctor_request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
        return $this->userSpecificGenericManager->findById($id, "patient_id");   
    }

    public function getAllDoctorRequestForPatient(Request $request){
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

    public function createDoctorRequest(Request $request){
        try{
            $validationResponse = PatientDoctorRequestValidation::createPatientDoctorRequestValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
            
            if($responseData['status'] != "success"){
                return response()->json([
                    "error" => $responseData['errors']
                ], 422); 
            }

            $genericManager = new GenericManager(new User);
            $data = $request->json()->all();
            $doctorObj = $genericManager->findById($data['doctor_id']);
            if(!$doctorObj){
                return ExceptionMessages::NotFound("Doctor");
            }
            if($doctorObj->role_id != 2){
                return ExceptionMessages::Error('This user is not a doctor', 400);
            }

            $data['patient_id'] = Auth::user()->id;
            $data['doctor_id'] = $request['doctor_id'];
            $data['request'] = 'requested';
            
            $this->doctorRequest->fill($data);
            $this->doctorRequest->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $this->doctorRequest
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteDoctorRequest($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "patient_id");
    }

    public function massDeleteDoctorRequest(Request $request){
        return $this->userSpecificGenericManager->massdeleteSpecificUser("patient_id", $request) ;
    }
}
