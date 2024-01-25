<?php

namespace App\Http\Controllers;

use App\Models\patient_volunteer_request;
use App\Models\Volunteer;
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
        $userDoctor= new  Volunteer();
        $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;
        $model = $this->volunteerRequest->where('volunteer_id',  $doctorId)->where('request', 'accepted')
            ->with(['user', 'volunteer'])->get();
        return $model;
    }

    public function getAllPendingRequestForVolunteer(Request $req){
        $userDoctor= new  Volunteer();
        $doctorId = $userDoctor->where('user_id',  $this->user->id)->first()->id;
        $model = $this->volunteerRequest->where('volunteer_id',  $doctorId)->where('request', 'requested')
            ->with(['user', 'volunteer'])->get();
        return $model;
    }

    public function acceptRequest($id, Request $request){
        $userDoctor= new  Volunteer();
        $doctorId = $userDoctor->where('user_id', $this->user->id)->first()->id;
        $model = $this->volunteerRequest->find($id);
        $model->request = 'accepted';
        $model->save();
        return $model;
    }

    public function DeleteRequest($id){
        $userDoctor= new  Volunteer();
        $doctorId = $userDoctor->where('user_id', $this->user->id)->first()->id;
        $model = $this->volunteerRequest->find($id);
        $model->delete();
        return response()->json([
            'status' => 'success',
            'message' =>  "Request successfully deleted"
        ]);
    }
}
