<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\Rating\RatingRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Patient_doctor_request;
use Illuminate\Support\Facades\Auth;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    //
    protected $user, $rating, $doctor, $userSpecificGenericManager;
    public function __construct(){
        // $this->middleware('patient.check', ['except' => ['login','register']]);
        $this->middleware('patient.check', ['except' => ['getRating']]);
        $this->user = Auth::user();
        $this->rating = new Rating();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->rating);
        $this->doctor = new User();
    }

    public function getRating($id){
        try{
            return $this->rating->where('doctor_id', $id)->get();
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }
    public function CreateUpdateRating(Request $request){
        try{
            $validationResponse  = RatingRequest::createRatingValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
            
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }
           
            $doctorObj = $this->doctor->find($request['doctor_id']);
            if(!$doctorObj){
                return ExceptionMessages::NotFound("Doctor");
            }
            if($doctorObj->role_id != 2){
                return ExceptionMessages::Error("Not a doctor", 400);
            }
            $request['patient_id']=Auth::user()->id;
            $ratingObj = $this->rating->where('patient_id',$request['patient_id'])
                                        ->where("doctor_id", $request['doctor_id'])
                                        ->first();                         
            if($ratingObj){
                $ratingObj = $this->rating->where('patient_id',$request['patient_id'])
                ->where("doctor_id", $request['doctor_id'])
                ->update(['rating' => $request['rating']]);
                return response()->json([
                    "status"=>"sucess",
                    "data" => $ratingObj
                ]);
            }

            $patientDoctorRequest = new Patient_doctor_request();
            $patientDoctorRequestResponse = $patientDoctorRequest->where('patient_id',$request['patient_id'])
                                                                ->where("doctor_id", $request['doctor_id']) 
                                                                ->where('request', 'accepted')
                                                                ->first();
            if(!$patientDoctorRequestResponse){
                return ExceptionMessages::Error('Not allowed to rate this doctor',400);
            }

            $this->rating->patient_id = $request['patient_id'];
            $this->rating->doctor_id = $request['doctor_id'];
            $this->rating->rating= $request['rating'];
            $this->rating->save();
            
            return response()->json([
                "status"=>"sucess",
                "data" => $this->rating
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
        
    }
}
