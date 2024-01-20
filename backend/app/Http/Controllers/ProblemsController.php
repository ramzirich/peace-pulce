<?php

namespace App\Http\Controllers;

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

    }
}
