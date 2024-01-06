<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientCommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('patients_comments')->insert([
            'patient_id' => 1,
            'doctor_id'=> 1,
            'comment' =>'I am grateful for the compassionate care provided by my psychiatrist. They listen attentively and offer valuable insights that have greatly improved my mental well-being.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 1,
            'doctor_id'=> 3,
            'comment' =>'My psychiatrist has been instrumental in helping me navigate through challenging times. Their support and guidance have made a significant positive impact on my mental health.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 2,
            'doctor_id'=> 5,
            'comment' =>'I appreciate the expertise of my psychiatrist in addressing my specific mental health needs. Their personalized approach has fostered a sense of trust and comfort in our sessions.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 2,
            'doctor_id'=> 7,
            'comment' =>'My psychiatrist is empathetic and understanding. They create a safe space for me to express myself, and their guidance has been pivotal in my journey towards better mental health.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 3,
            'doctor_id'=> 3,
            'comment' =>'I am grateful for the compassionate care provided by my psychiatrist. They listen attentively and offer valuable insights that have greatly improved my mental well-being.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 3,
            'doctor_id'=> 4,
            'comment' =>'I appreciate the expertise of my psychiatrist in addressing my specific mental health needs. Their personalized approach has fostered a sense of trust and comfort in our sessions.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 4,
            'doctor_id'=> 6,
            'comment' =>'My psychiatrist has been instrumental in helping me navigate through challenging times. Their support and guidance have made a significant positive impact on my mental health.'
        ]);

        DB::table('patients_comments')->insert([
            'patient_id' => 4,
            'doctor_id'=> 7,
            'comment' =>'My psychiatrist is empathetic and understanding. They create a safe space for me to express myself, and their guidance has been pivotal in my journey towards better mental health.'
        ]);
    }
}
