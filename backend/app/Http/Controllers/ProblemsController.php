<?php

namespace App\Http\Controllers;

use App\Http\Requests\Problem\ProblemRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Problem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProblemsController extends Controller
{
    //
    private $_problem, $_userSpecificGenericManager;
    public function __construct(){
        $this->_problem = new Problem();
        $this->_userSpecificGenericManager = new UserSpecificGenericManager($this->_problem);
    }

    public function createProblem(Request $request){
        $validationResponse = ProblemRequest::createProblemValidation($request);
        $responseData = json_decode($validationResponse->getContent(), true);
        if($responseData['status']!="success"){
            return $responseData['errors'];
        }

        return $this->_userSpecificGenericManager->createWithSpecificUser($request);
    }

    public function updateProblem(Request $request, $id){
        $validationResponse = ProblemRequest::updateProblemValidation($request);
        $responseData = json_decode($validationResponse->getContent(), true);
        if($responseData['status']!="success"){
            return $responseData['errors'];
        }
        return $this->_userSpecificGenericManager->updateForSpecificUser($request, $id, "user_id");
    }

    public function deleteProblem($id){
        return $this->_userSpecificGenericManager->deleteForSpecificUser($id, "user_id");
    }

    public function getProblem($id){
        return $this->_userSpecificGenericManager->findById($id, "user_id");
    }

    public function getAllProblems(Request $request){
        $request->merge(['user_id' => Auth::user()->id]);
        return $this->_userSpecificGenericManager->getAllForCurrentUser($request);
    }
}
