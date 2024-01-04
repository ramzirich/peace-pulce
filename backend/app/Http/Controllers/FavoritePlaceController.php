<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\FavoritePlace\CreateFavoritePlaceRequest;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Favorite_place;
use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoritePlaceController extends Controller
{
    //
    protected $user, $favoritePlace, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->favoritePlace = new Favorite_place();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->favoritePlace);
    }

    public function getFavoritePlaceForUser($id){
        return $this->userSpecificGenericManager->findById($id, "user_id");   
    }

    public function getAllFavoritePlaceForUser(Request $request){
        $perPage = $request->query('perPage', 10);
        $page = $request->query('page', 1);
        $sortColumns = $request->query('sortColumns', []);
        $request->merge(['user_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, $perPage, $page, $sortColumns);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function createFavoritePlace(Request $request){
        try{
            $validationResponse = CreateFavoritePlaceRequest::createFavoritePlaceValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $place = new Place();
            $genericManager = new GenericManager($place);
            $data = $request->json()->all();
            $placeObj = $genericManager->findById($data['places_id']);
            if(!$placeObj){
                return ExceptionMessages::NotFound(class_basename($place));
            }
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateFavoritePlace($id ,Request $request){
        try{
            $validationResponse = CreateFavoritePlaceRequest::createFavoritePlaceValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $place = new Place();
            $genericManager = new GenericManager($place);
            $data = $request->json()->all();
            $placeObj = $genericManager->findById($data['places_id']);
            if(!$placeObj){
                return ExceptionMessages::NotFound(class_basename($place));
            }
            return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, "user_id");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
        
    }
    
    public function deleteFavoritePlace($id){
        return $this->userSpecificGenericManager->deleteForSpecificUser($id, "user_id");
    }

    public function massDeleteFavoritePlace(Request $request){
        return $this->userSpecificGenericManager->massdeleteSpecificUser("user_id", $request) ;
    }

}

