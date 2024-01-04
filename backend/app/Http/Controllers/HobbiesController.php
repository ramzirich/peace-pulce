<?php

namespace App\Http\Controllers;
use App\Manager\GenericManager;
use App\Models\Hobby;

use Illuminate\Http\Request;

class HobbiesController extends Controller
{
    //
    private $hobbies, $genericManager;
    public function __construct(){
        $this->hobbies = new Hobby();
        $this->genericManager = new GenericManager($this->hobbies);
    }

    public function getHobbies(){
        return $this->genericManager->getAll();
    }
}
