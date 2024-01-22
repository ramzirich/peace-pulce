<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\DoctorNote\DoctorNoteRequest;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Doctors_note;
use App\Models\Patient_doctor_request;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorNoteController extends Controller
{
    //
    protected $user, $doctor_note, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->doctor_note = new Doctors_note();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->doctor_note );
    }

    public function getDoctorNote($id){
        return $this->userSpecificGenericManager->getByColumn('user_id', $id, "doctor_id");   
    } 
    public function createDoctorNote(Request $request){
        try{
            $validationResponse = DoctorNoteRequest::createDoctorNoteValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $genericManager = new GenericManager(new User);
            $data = $request->json()->all();
            $patientObj = $genericManager->findById($data['patient_id']);
            if(!$patientObj){
                return ExceptionMessages::NotFound("Patient");
            }
            if($patientObj->role_id != 1){
                return ExceptionMessages::Error('This user is not a patient', 400);
            }

            $genericManagerRequest = new UserSpecificGenericManager(new Patient_doctor_request());
            $patientDoctorRequestModel = $genericManagerRequest->getByColumn('patient_id', 
                $data['patient_id'], 'doctor_id');
            if($patientDoctorRequestModel ==[] || $patientDoctorRequestModel->request != 'accepted'){
                return ExceptionMessages::Error('This user is not your patient', 400);
            } 
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateDoctorNote($id ,Request $request){
        try{
            $validationResponse = DoctorNoteRequest::updateDoctorNoteValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
            if ($request->has('patient_id')) {
                $data = $request->except(['patient_id']);
                $request->replace($data);
            }
            return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, "doctor_id");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteDoctorNote($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "doctor_id");
    }
}
