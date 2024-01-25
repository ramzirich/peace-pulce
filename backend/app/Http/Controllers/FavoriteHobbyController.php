<?php

namespace App\Http\Controllers;

use App\Exceptions\ExceptionMessages;
use App\Http\Requests\FavoriteHobby\CreateFavoriteHobbyRequest;
use App\Manager\UserSpecificGenericManager;
use App\Manager\GenericManager;
use App\Models\Favorite_hobby;
use App\Models\Hobby;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteHobbyController extends Controller
{
    //
    protected $user, $favoriteHobby, $userSpecificGenericManager ; 

    public function __construct(){
        $this->user = Auth::user();
        $this->favoriteHobby = new Favorite_Hobby();
        $this->userSpecificGenericManager = new UserSpecificGenericManager($this->favoriteHobby);
    }

    public function getFavoriteHobbyForUser($id){
        return $this->userSpecificGenericManager->findById($id, "user_id");   
    }

    public function getAllFavoriteHobbyForUser(Request $request){
        $request->merge(['user_id' => $this->user->id]);

        $model = $this->userSpecificGenericManager->getAllForCurrentUser($request, ['hobby']);
        if(!$model){
            return [];
        }
        return $model;
    }

    public function getAllFavoriteHobbyForVolunteer($id){
        try{
            return $this->favoriteHobby->where('user_id', $id)->with(['hobby'])->get();
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function createFavoriteHobby(Request $request){
        try{
            $validationResponse = CreateFavoriteHobbyRequest::createFavoriteHobbyValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $hobby = new Hobby();
            $genericManager = new GenericManager($hobby);
            $data = $request->json()->all();
            $placeObj = $genericManager->findById($data['hobbies_id']);
            if(!$placeObj){
                return ExceptionMessages::NotFound(class_basename($hobby));
            }
            
            return $this->userSpecificGenericManager->createWithSpecificUser($request);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateFavoriteHobby($id ,Request $request){
        try{
            $validationResponse = CreateFavoriteHobbyRequest::createFavoriteHobbyValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
        
            if($responseData['status'] != "success"){
                return $responseData['errors'];
            }

            $hobby = new Hobby();
            $genericManager = new GenericManager($hobby);
            $data = $request->json()->all();
            $placeObj = $genericManager->findById($data['hobbies_id']);
            if(!$placeObj){
                return ExceptionMessages::NotFound(class_basename($hobby));
            }
            return $this->userSpecificGenericManager->updateForSpecificUser($request, $id, "user_id");
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteFavoriteHobby($id){
        try{
            $this->favoriteHobby->where('user_id', Auth::user()->id)->where('hobbies_id', $id)->first()->delete();
            return response()->json([
                'status'=> 'success',
                'message'=> "Favorite hobby successfully deleted" 
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function massDeleteFavoriteHobby(Request $request){
        return $this->userSpecificGenericManager->massdeleteSpecificUser("user_id", $request) ;
    }
}
