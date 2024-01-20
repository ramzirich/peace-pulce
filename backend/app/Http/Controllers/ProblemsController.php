<?php

namespace App\Http\Controllers;

use App\Http\Requests\Problem\ProblemRequest;
use App\Manager\UserSpecificGenericManager;
use App\Models\Problem;
use Illuminate\Http\Request;

class ProblemsController extends Controller
{
    //
    private $_problem, $_userSpecificGenericManager;
    public function __construct(){
        $_problem = new Problem();
        $_userSpecificGenericManager = new UserSpecificGenericManager($_problem);
    }

    public function createProblem(Request $request){
        $validationResponse = ProblemRequest::createProblemValidation($request);
        $responseData = json_decode($validationResponse->getContent(), true);
        if($responseData['status']!="success"){
            return $responseData['errors'];
        }

        return $this->_userSpecificGenericManager->createWithSpecificUser($request);
    }
}
