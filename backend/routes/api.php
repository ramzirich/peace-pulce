<?php

use App\Http\Controllers\DoctorHandleRequestController;
use App\Http\Controllers\DoctorListAndIndividualController;
use App\Http\Controllers\FavoritePlaceController;
use App\Http\Controllers\FavoriteHobbyController;
use App\Http\Controllers\HobbiesController;
use App\Http\Controllers\HomeImagesController;
use App\Http\Controllers\NeuroticismController;
use App\Http\Controllers\OpenAiController;
use App\Http\Controllers\PatientRequestDoctorController;
use App\Http\Controllers\PlacesController;
use App\Http\Controllers\ProblemsController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\StressCauseController;
use App\Http\Controllers\PatientCommentController;
use App\Http\Controllers\DoctorNoteController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\VolunteerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use OpenAI\Laravel\Facades\OpenAI;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('update/user', 'updateUser');
    Route::post('delete/user', 'deleteUser');
    Route::get('user', 'getCurrentUser');
    Route::post('image', 'uploadImage');
});

Route::controller(VideosController::class)->group(function () {
    Route::post('upload/video', 'uploadVideo');
    Route::get('videos', 'getAllVideos');
});

Route::controller(SongController::class)->group(function () {
    Route::post('upload/song', 'uploadSong');
    Route::get('songs', 'getAllSongs');
});

Route::controller(OpenAiController::class)->group(function () {
    Route::get('openai', 'send_to_open_ai_api');
});

Route::middleware('auth.user')->group(function () {
    Route::post('neuroticism_record/create',  [NeuroticismController::class, 'createRecord']);
    Route::get('neuroticism_records',  [NeuroticismController::class, 'findAllRecords']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('stress_cause/create',  [StressCauseController::class, 'createStressCause']);
    Route::post('stress_cause/update/{id}',  [StressCauseController::class, 'updateStressCause']);
    Route::post('stress_cause/delete/{id}',  [StressCauseController::class, 'deleteStressCause']);
    Route::post('stress_cause/massDelete',  [StressCauseController::class, 'massDeleteStressCause']);
    Route::get('stress_cause/{id}',  [StressCauseController::class, 'getStressCauseForUser']);
    Route::get('stress_causes',  [StressCauseController::class, 'getAllStressCauseForUser']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('favorite_place/create',  [FavoritePlaceController::class, 'createFavoritePlace']);
    Route::post('favorite_place/update/{id}',  [FavoritePlaceController::class, 'updateFavoritePlace']);
    Route::post('favorite_place/delete/{id}',  [FavoritePlaceController::class, 'deleteFavoritePlace']);
    Route::post('favorite_place/massDelete',  [FavoritePlaceController::class, 'massDeleteFavoritePlace']);
    Route::get('favorite_place/{id}',  [FavoritePlaceController::class, 'getFavoritePlaceForUser']);
    Route::get('favorite_places',  [FavoritePlaceController::class, 'getAllFavoritePlaceForUser']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('favorite_hobby/create',  [FavoriteHobbyController::class, 'createFavoriteHobby']);
    Route::post('favorite_hobby/update/{id}',  [FavoriteHobbyController::class, 'updateFavoriteHobby']);
    Route::post('favorite_hobby/delete/{id}',  [FavoriteHobbyController::class, 'deleteFavoriteHobby']);
    Route::post('favorite_hobby/massDelete',  [FavoriteHobbyController::class, 'massDeleteFavoriteHobby']);
    Route::get('favorite_hobby/{id}',  [FavoriteHobbyController::class, 'getFavoriteHobbyForUser']);
    Route::get('favorite_hobbies',  [FavoriteHobbyController::class, 'getAllFavoriteHobbyForUser']);
});

Route::middleware(['auth.user', 'patient.check'])->group(function () {
    Route::post('patient_comment/create',  [PatientCommentController::class, 'createPatientComment']);
    Route::post('patient_comment/update/{id}',  [PatientCommentController::class, 'updatePatientComment']);
    Route::post('patient_comment/delete/{id}',  [PatientCommentController::class, 'deletePatientComment']);
    Route::get('patient_comment/{id}',  [PatientCommentController::class, 'getPatientComment']);
    Route::get('patient_comments/{id}',  [PatientCommentController::class, 'getAllPatientCommentForDoctor']);
    Route::get('patient_comments/count/{id}',  [PatientCommentController::class, 'getCommentsCounts']);
});

Route::middleware(['auth.user', 'doctor.check'])->group(function () {
    Route::post('doctor_note/create',  [DoctorNoteController::class, 'createDoctorNote']);
    Route::post('doctor_note/update/{id}',  [DoctorNoteController::class, 'updateDoctorNote']);
    Route::post('doctor_note/delete/{id}',  [DoctorNoteController::class, 'deleteDoctorNote']);
    Route::get('doctor_note/{id}',  [DoctorNoteController::class, 'getDoctorNote']);
});

Route::middleware(['auth.user', 'doctor.check'])->group(function () {
    Route::post('doctor/create',  [DoctorController::class, 'createDoctor']);
    Route::post('doctor/update',  [DoctorController::class, 'updateDoctor']);
    Route::get('doctor',  [DoctorController::class, 'getDoctor']);
});

Route::middleware(['auth.user', 'volunteer.check'])->group(function () {
    Route::post('volunteer/create',  [VolunteerController::class, 'createVolunteer']);
    Route::post('volunteer/update',  [VolunteerController::class, 'updateVolunteer']);
    Route::get('volunteer',  [VolunteerController::class, 'getVolunteer']);
});

Route::controller(PlacesController::class)->group(function () {
    Route::get('places', 'getPlaces');
});

Route::controller(HobbiesController::class)->group(function () {
    Route::get('hobbies', 'getHobbies');
});

Route::controller(DoctorListAndIndividualController::class)->group(function () {
    Route::get('doctor/{id}', 'getDoctor');
    Route::get('doctors', 'getListOfDoctors');
});

Route::controller(HomeImagesController::class)->group(function () {
    Route::get('homeImages', 'getHomeImages');

});

Route::middleware(['auth.user', 'patient.check'])->group(function () {
    Route::post('doctor_request/create',  [PatientRequestDoctorController::class, 'createDoctorRequest']);
    Route::post('doctor_request/delete/{id}',  [PatientRequestDoctorController::class, 'deleteDoctorRequest']);
    Route::post('doctor_request/massDelete',  [PatientRequestDoctorController::class, 'massDeleteDoctorRequest']);
    Route::get('doctor_request/{id}',  [PatientRequestDoctorController::class, 'getRequestForPatient']);
    Route::get('doctor_request',  [PatientRequestDoctorController::class, 'getAllDoctorRequestForPatient']);
});

Route::middleware(['auth.user', 'doctor.check'])->group(function () {
    Route::get('doctor_request/pending',  [PatientRequestDoctorController::class, 'getAllPendingRequestForDoctor']);
    Route::get('patients_request',  [DoctorHandleRequestController::class, 'getAllRequestForDoctor']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('rating',  [RatingController::class, 'CreateUpdateRating']);
    Route::get('rating/{id}',  [RatingController::class, 'getRating']);
});

Route::middleware('auth.user')->group(function () {
    Route::post('problem/create',  [ProblemsController::class, 'createProblem']);
    Route::post('problem/update/{id}',  [ProblemsController::class, 'updateProblem']);
    Route::post('problem/delete/{id}',  [ProblemsController::class, 'deleteProblem']);
    Route::post('problems/massDelete',  [ProblemsController::class, 'massDeleteProblem']);
    Route::get('problem/{id}',  [ProblemsController::class, 'getProblem']);
    Route::get('problems',  [ProblemsController::class, 'getAllProblems']);
});


// Route::get('ask/{question}', function ($question){
//     $result = OpenAI::completions()->create([
//         'model' => 'text-davinci-003',
//         'prompt' => $question,
//         // 'max_tokens' =>20,
//         // 'temperature' =>0,
//         // 'n' =>2
//     ]);
     
//     echo $result['choices'][0]['text'];
// });



