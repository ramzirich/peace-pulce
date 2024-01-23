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

    public function getAllRequestForDoctor(Request $req){
        $req->merge(['doctor_id' => $this->user->id]);
        $req->merge(['request' => 'accepted']);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($req, $with=['user']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function getAllPendingRequestForDoctor(Request $req){
        $req->merge(['doctor_id' => $this->user->id]);
        $req->merge(['request' => 'requested']);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($req, $with=['user']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function acceptRequest($id, Request $request){
        $request['request'] = 'accepted';
        return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, 'doctor_id');
    }
}
