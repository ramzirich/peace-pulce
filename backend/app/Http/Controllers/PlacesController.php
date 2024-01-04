<?php

namespace App\Http\Controllers;

use App\Manager\GenericManager;
use App\Models\Place;
use Illuminate\Http\Request;

class PlacesController extends Controller
{
    //
    private $places, $genericManager;
    public function __construct(){
        $this->places = new Place();
        $this->genericManager = new GenericManager($this->places);
    }

    public function getPlaces(){
        return $this->genericManager->getAll();
    }
}
