<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_user_register_success(): void
    {
        // HelperFunctions::create_roles();
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $response = $this->post('/api/register',
            ['first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'img_url' => '',
            'role_id' => 1]);

        $response->assertStatus(200);
    }

    public function test_user_register_missing_first_name(): void
    {
        // HelperFunctions::create_roles();
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $response = $this->post('/api/login',
            [
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1]);

        $response->assertStatus(401);
    }

    public function test_user_register_invalid_password(): void
    {
        // HelperFunctions::create_roles();
        Role::factory() -> create(["name" => 'patient']);
        Role::factory() -> create(["name" => 'doctor']);
        $response = $this->post('/api/login',
            [
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'Password12',
            'role_id' => 1]);

        $response->assertStatus(422);
    }

    public function test_user_login_succes(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        $response = $this->post('/api/login',
            [
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',  
        ]);

        $response->assertStatus(200);
    }

    public function test_user_login_failed(): void
    {
        Role::factory() -> create(["name" => 'patient']);
        User::factory() -> create([
            'first_name' => 'ramzi',
            'last_name' => 'rich',
            'email' => 'ramzi@gmail.com',
            'password' => 'P@ssword12',
            'role_id' => 1
        ]);
        $response = $this->post('/api/login',
            [
            'email' => 'ramz@gmail.com',
            'password' => 'Password12',  
        ]);

        $response->assertStatus(422);
    }
}
