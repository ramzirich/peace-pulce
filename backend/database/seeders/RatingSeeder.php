<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('ratings')->insert([
            'patient_id' => 1,
            'doctor_id'=> 1,
            'rating' => 3
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 1,
            'doctor_id'=> 3,
            'rating' => 2.5
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 2,
            'doctor_id'=> 5,
            'rating' => 4
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 2,
            'doctor_id'=> 7,
            'rating' => 1
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 3,
            'doctor_id'=> 3,
            'rating' => 2
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 3,
            'doctor_id'=> 4,
            'rating' => 5
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 4,
            'doctor_id'=> 7,
            'rating' => 2.5
        ]);

        DB::table('ratings')->insert([
            'patient_id' => 4,
            'doctor_id'=> 6,
            'rating' => 4
        ]);
    }
}
