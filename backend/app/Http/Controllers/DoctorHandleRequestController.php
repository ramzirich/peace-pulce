<?php

namespace App\Http\Controllers;

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

    public function getAllDoctorRequestForPatient(Request $request){
        $request->merge(['patient_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $with=['doctor']);
        if(!$model){
            return [];
        }
        return $model;
    }
}
