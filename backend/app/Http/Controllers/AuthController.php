<?php

namespace App\Http\Controllers;
use App\Exceptions\ExceptionMessages;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
// use App\Http\Requests\LoginRequest;
// use App\Http\Requests\RegisterRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Manager\GenericManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.user', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $validationResponse = LoginRequest::loginValidation($request);
        $responseData = json_decode($validationResponse->getContent(), true);
        
        if($responseData['status'] != "success"){
            return response()->json([
                "error" => $responseData['errors']
            ], 422); 
        }
        
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Wrong credentials',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $validationResponse = RegisterRequest::registrationValidation($request);
        $responseData = json_decode($validationResponse->getContent(), true);
        
        if($responseData['status'] != "success"){
            return response()->json([
                "error" => $responseData['errors']
            ], 422);      
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->is_online = 1;
        $user->role_id = 1;

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function getCurrentUser(){
        try{
            return response()->json([
                "status" => "success",
                "data" => Auth::user()
            ]) ;
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateUser(Request $request){
        try{
            $validationResponse = UpdateUserRequest::updateUserValidation($request);
            $responseData = json_decode($validationResponse->getContent(), true);
            
            if($responseData['status'] != "success"){
                return response()->json([
                    "error" => $responseData['errors']
                ], 422);      
            }
            $user_id = Auth::user()->id;
            $request['id'] = $user_id;
            $genericManager = new GenericManager(Auth::user());
            return $genericManager->update($request, $user_id);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteUser(){
        $genericManager = new GenericManager(Auth::user());
        return $genericManager->delete(Auth::user()->id);
    }

    public function uploadImage(Request $request){
        try{
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $user = Auth::user(); 
            if ($user && $request->hasFile('image')) {
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
                $user->update(['img_url' => 'images/' . $imageName]);
        
                return response()->json(['success' => 'Image uploaded successfully']);
            }       
            return ExceptionMessages::Error('Unauthorized', 401);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

}
