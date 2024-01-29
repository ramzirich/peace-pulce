<?php

namespace Tests\Feature;

use App\Models\Doctors;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DoctorsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_get_single_doctor(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);

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
            'user_id' =>1
        ]);
        
        $response = $this->get('/api/doctor/1');

        $response->assertStatus(200);
    }

    public function test_get_all_doctors(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);

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
            'user_id' =>1
        ]);
        
        $response = $this->get('/api/doctors');

        $response->assertStatus(200);
    }
}
