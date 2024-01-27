<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\DoctorNote\DoctorNoteRequest;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Doctors;
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
        $userDoctor= new  Doctors();
        $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;
        $model = $this->doctor_note->where('doctor_id',  $doctorId)->where('patient_id', $id)
            ->with(['user', 'patient'])->get()->first();
        return $model; 
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
            
            $userDoctor= new  Doctors();
            $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;

            $this->doctor_note->patient_id = $request['patient_id'];
            $this->doctor_note->doctor_id = $doctorId;
            $this->doctor_note->note = $request['note'];
            $this->doctor_note->save();
            
            return response()->json([
                'status'=> 'success',
                'data'=> $this->doctor_note
            ], 201);
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
            
            $model = $this->doctor_note->find($id);
            $model->note = $request['note'];
            $model->save();
            return response()->json([
                'status'=> 'success',
                'data'=> $model
            ], 200);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteDoctorNote($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "doctor_id");
    }
}
