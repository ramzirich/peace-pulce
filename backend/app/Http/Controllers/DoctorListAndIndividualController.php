<?php

namespace App\Http\Controllers;

use App\Manager\GenericManager;
use App\Models\Doctors;
use Illuminate\Http\Request;

class DoctorListAndIndividualController extends Controller
{
    //
    private $doctor, $genericManager;
    public function __construct(){
        $this->doctor = new Doctors();
        $this->genericManager = new GenericManager($this->doctor);
    }

    public function getDoctor($id){
        return $this->genericManager->findById($id, ['user']);
    }

    public function getListOfDoctors(Request $request){
        return $this->genericManager->getAll($request, ['user']);
    }
}
