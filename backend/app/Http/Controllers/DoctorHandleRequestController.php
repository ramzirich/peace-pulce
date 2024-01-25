<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Exceptions\ExceptionMessages;
use App\Http\Requests\PatientDoctorRequest\PatientDoctorRequestValidation;
use App\Manager\UserSpecificGenericManager;
use App\Models\Patient_doctor_request;
use Illuminate\Support\Facades\Auth;
use App\Models\Doctors;

class DoctorHandleRequestController extends Controller
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

    public function getAllRequestForDoctor(Request $req){
        $userDoctor= new  Doctors();
        $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;
        $model = $this->doctorRequest->where('doctor_id',  $doctorId)->where('request', 'accepted')
        ->with(['user', 'doctor'])->get();
        return $model;
    }

    public function getAllPendingRequestForDoctor(Request $req){
        $userDoctor= new  Doctors();
        $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;
        $model = $this->doctorRequest->where('doctor_id',  $doctorId)->where('request', 'requested')
            ->with(['user', 'doctor'])->get();
        return $model;
    }

    public function acceptRequest($id, Request $request){
        $userDoctor= new  Doctors();
        $doctorId = $userDoctor->where('user_id', $this->user->id)->first()->id;
        $model = $this->doctorRequest->find($id);
        $model->request = 'accepted';
        $model->save();
        return $model;
    }

    public function DeleteRequest($id){
        $userDoctor= new  Doctors(); 
        $doctorId = $userDoctor->where('user_id', $this->user->id)->first()->id;
        $model = $this->doctorRequest->find($id);
        $model->delete();
        return response()->json([
            'status' => 'success',
            'message' =>  "Request successfully deleted"
        ]);
   }
}