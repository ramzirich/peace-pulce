<?php

namespace App\Http\Controllers;

use App\Manager\GenericManager;
use Illuminate\Http\Request;
use App\Models\Volunteer;
use Illuminate\Support\Facades\Auth;

class GetVolunteerController extends Controller
{
    //
    protected $user, $volunteer, $genericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->volunteer = new Volunteer();
        $this->genericManager = new GenericManager($this->volunteer);
    }

    public function getVolunteer($id){
        return $this->genericManager->findById($id, ['user']);
    }

    public function getListOfVolunteers(Request $request){
        return $this->genericManager->getAll($request, ['user']);
    }


}
