<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientRequestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('patient_doctor_requests')->insert([
            'patient_id' => 1,
            'doctor_id'=> 5,
            'request' =>'accepted'
        ]);

        DB::table('patient_doctor_requests')->insert([
            'patient_id' => 1,
            'doctor_id'=> 5,
            'request' =>'accepted'
        ]);

        DB::table('patient_doctor_requests')->insert([
            'patient_id' => 1,
            'doctor_id'=> 5,
            'request' =>'accepted'
        ]);

        DB::table('patient_doctor_requests')->insert([
            'patient_id' => 1,
            'doctor_id'=> 5,
            'request' =>'accepted'
        ]);

        DB::table('patient_doctor_requests')->insert([
            'patient_id' => 1,
            'doctor_id'=> 5,
            'request' =>'accepted'
        ]);
    }
}
