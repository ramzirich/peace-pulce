<?php

namespace Tests\Feature;

use App\Models\Doctors;
use App\Models\Patient_doctor_request;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class Patient_doctor_requestTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_patient_create_request_notFound_doctor(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        $response = $this->post('/doctor_request/create',[
            'patient_id'=>1,
            'doctor_id' =>1,
            'request' =>'requested'
        ]);

        $response->assertStatus(404);
    }

    public function test_patient_create_request_doctor_unauthorized(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $user = User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        User::factory() -> create([
            'first_name' => 'elsa',
            'last_name' => 'frozen',
            'email' => 'elsa@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 2
        ]);
        Doctors::factory() -> create([
            'about' => 'hi',
            'hourly_rate' => 10,
            'degree' => 'hi',
            'specialization' => 'hi',
            'user_id' =>2
        ]);
        // $token = $user->createToken('test-token')->plainTextToken;
        // Sanctum::actingAs($user, ['*']);

        $response = $this->post('/api/doctor_request/create',[
            'patient_id'=>1,
            'doctor_id' =>1,
            'request' =>'requested'
        ]);

        $response->assertStatus(403);
    }

    public function test_patient_get_request_doctor(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $user = User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        User::factory() -> create([
            'first_name' => 'elsa',
            'last_name' => 'frozen',
            'email' => 'elsa@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 2
        ]);
        Doctors::factory() -> create([
            'about' => 'hi',
            'hourly_rate' => 10,
            'degree' => 'hi',
            'specialization' => 'hi',
            'user_id' =>2
        ]);
        Patient_doctor_request::factory()-> create([
            'patient_id'=>1,
            'doctor_id' =>1,
            'request' =>'requested'
        ]);

        $response = $this-> actingas($user) ->get('/api/doctor_request/1');

        $response->assertStatus(200);
    }

    public function test_patient_getall_doctors_request_forpatient_successfull(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $user = User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        User::factory() -> create([
            'first_name' => 'elsa',
            'last_name' => 'frozen',
            'email' => 'elsa@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 2
        ]);
        Doctors::factory() -> create([
            'about' => 'hi',
            'hourly_rate' => 10,
            'degree' => 'hi',
            'specialization' => 'hi',
            'user_id' =>2
        ]);
        Patient_doctor_request::factory()-> create([
            'patient_id'=>1,
            'doctor_id' =>1,
            'request' =>'requested'
        ]);

        $response = $this-> actingas($user) ->get('/api/doctor_request');

        $response->assertStatus(200);
    }

    public function test_patient_delete_doctors_request_unauthorized(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $user = User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        User::factory() -> create([
            'first_name' => 'elsa',
            'last_name' => 'frozen',
            'email' => 'elsa@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 2
        ]);
        Doctors::factory() -> create([
            'about' => 'hi',
            'hourly_rate' => 10,
            'degree' => 'hi',
            'specialization' => 'hi',
            'user_id' =>2
        ]);
        Patient_doctor_request::factory()-> create([
            'patient_id'=>1,
            'doctor_id' =>1,
            'request' =>'requested'
        ]);

        $response = $this-> actingas($user) ->post('/api/doctor_request/delete/1');

        $response->assertStatus(403);
    }


    // public function test_patient_delete_doctors_request(): void
    // {
    //     Role::factory() -> create(["name" => 'patient']);
    //     Role::factory() -> create(["name" => 'doctor']);
    //     $user = User::factory() -> create([
    //         'first_name' => 'ramzi',
    //         'last_name' => 'rich',
    //         'email' => 'ramzi@gmail.com',
    //         'password' => 'P@ssword12',
    //         'role_id' => 1
    //     ]);
    //     User::factory() -> create([
    //         'first_name' => 'elsa',
    //         'last_name' => 'frozen',
    //         'email' => 'elsa@gmail.com',
    //         'password' => 'P@ssword12',
    //         'role_id' => 2
    //     ]);
    //     Doctors::factory() -> create([
    //         'about' => 'hi',
    //         'hourly_rate' => 10,
    //         'degree' => 'hi',
    //         'specialization' => 'hi',
    //         'user_id' =>2
    //     ]);
    //     Patient_doctor_request::factory()-> create([
    //         'patient_id'=>1,
    //         'doctor_id' =>1,
    //         'request' =>'requested'
    //     ]);

    //     $response = $this-> actingAs($user) ->post('/api/doctor_request/delete/1');

    //     $response->assertStatus(200);
    // }

    // public function test_get_single_doctor(): void
    // {
    //     Role::factory() -> create(["name" => 'patient']);
    //     Role::factory() -> create(["name" => 'doctor']);

    //     User::factory() -> create([
    //         'first_name' => 'elsa',
    //         'last_name' => 'frozen',
    //         'email' => 'elsa@gmail.com',
    //         'password' => 'P@ssword12',
    //         'role_id' => 2
    //     ]);
    //     Doctors::factory() -> create([
    //         'about' => 'hi',
    //         'hourly_rate' => 10,
    //         'degree' => 'hi',
    //         'specialization' => 'hi',
    //         'user_id' =>1
    //     ]);
        
    //     $response = $this->get('/doctor/1');

    //     $response->assertStatus(200);
    // }
}
