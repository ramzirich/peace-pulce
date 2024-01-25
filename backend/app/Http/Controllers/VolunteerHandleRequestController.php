<?php

namespace App\Http\Controllers;

use App\Models\patient_volunteer_request;
use Illuminate\Http\Request;
use App\Manager\UserSpecificGenericManager;
use App\Models\Patient_doctor_request;
use Illuminate\Support\Facades\Auth;

class VolunteerHandleRequestController extends Controller
{
    //
    protected $user, $volunteerRequest, $userSpecificGenericManager ; 
    public function __construct(){
        $this->user = Auth::user();
        $this->volunteerRequest = new patient_volunteer_request;
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->volunteerRequest);
    }

    public function getRequestForPatient($id){
        return $this->userSpecificGenericManager->getByColumn("volunteer_id", $id, 'volunteer_id', $with=['volunteer']);   
    }

    public function getAllRequestForVolunteer(Request $req){
        $req->merge(['volunteer_id' => $this->user->id]);
        $req->merge(['request' => 'accepted']);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($req, $with=['user']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function getAllPendingRequestForVolunteer(Request $req){
        $req->merge(['volunteer_id' => $this->user->id]);
        $req->merge(['request' => 'requested']);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($req, $with=['user']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function acceptRequest($id, Request $request){
        $request['request'] = 'accepted';
        return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, 'volunteer_id');
    }

    public function DeleteRequest($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, 'volunteer_id');
    }
}
