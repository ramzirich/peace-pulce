<?php

namespace App\Http\Controllers;

use App\Manager\GenericManager;
use App\Models\HomeImages;
use Illuminate\Http\Request;

class HomeImagesController extends Controller
{
    //
    private $genericManager, $homeImages;
    public function __construct(){
        $this->homeImages = new HomeImages();
        $this->genericManager = new GenericManager($this->homeImages);
    }
    public function getHomeImages(){
        return $this->genericManager->getAll();
    }
}
