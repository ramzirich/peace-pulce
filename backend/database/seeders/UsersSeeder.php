<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            'first_name' => 'George',
            'last_name'=> 'Atiyeh',
            'email' =>'georges@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/user.jpg',
            'role_id' =>1
        ]);

        DB::table('users')->insert([
            'first_name' => 'Ali',
            'last_name'=> 'Kassem',
            'email' =>'alikassem@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/user2.jpg',
            'role_id' =>1
        ]);

        DB::table('users')->insert([
            'first_name' => 'Omar',
            'last_name'=> 'Daouk',
            'email' =>'omarDaouk@gmail.com',
            'password' => Hash::make('R@mzi123'), 
            'img_url' => 'images/user5.jpg',
            'role_id' =>1
        ]);

        DB::table('users')->insert([
            'first_name' => 'Nadim',
            'last_name'=> 'Nadam',
            'email' =>'nadimNadam@gmail.com',
            'password' => Hash::make('R@mzi123'), 
            'img_url' => 'images/user10.jpg',
            'role_id' =>1
        ]);

        DB::table('users')->insert([
            'first_name' => 'Brad',
            'last_name'=> 'Notpitt',
            'email' =>'bradNotpitt@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy1.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Ashin',
            'last_name'=> 'Venkat',
            'email' =>'ashinVenkat@gmail.com',
            'password' => Hash::make('R@mzi123'), 
            'img_url' => 'images/psy2.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Elsa',
            'last_name'=> 'Frozen',
            'email' =>'elsaFrozen@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy3.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Simon',
            'last_name'=> 'Casper',
            'email' =>'simonCasper@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy4.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Serena',
            'last_name'=> 'Selena',
            'email' =>'serenaSelena@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy5.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'george',
            'last_name'=> 'atiyeh',
            'email' =>'georges@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/user.jpg',
            'role_id' =>1
        ]);

        DB::table('users')->insert([
            'first_name' => 'Patrick',
            'last_name'=> 'Cruise',
            'email' =>'patrickCruise@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy7.jpg',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Pragim',
            'last_name'=> 'Paghich',
            'email' =>'pragimPaghich@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/psy7.png',
            'role_id' =>2
        ]);

        DB::table('users')->insert([
            'first_name' => 'Jean',
            'last_name'=> 'Dreamer',
            'email' =>'jeanDremaer@gmail.com',
            'password' =>Hash::make('R@mzi123'), 
            'img_url' => 'images/pexels-photo-663455.jpeg',
            'role_id' =>3
        ]);
    }
}
