<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('doctors')->insert([
            'user_id' => 5,
            'hourly_rate' => 20,
            'about' =>'Providing compassionate care with a focus on holistic mental wellness. Specializing in mood disorders, anxiety. Collaborative and patient-centered approach for lasting emotional well-being.',
            'degree' => 'Harvard Medical School',
            'specialization' => 'Doctor of Medicine (MD)'
        ]);

        DB::table('doctors')->insert([
            'user_id' => 6,
            'hourly_rate' => 22.5,
            'about' =>'Board-Certified in Psychiatry, demonstrating expertise and adherence to high professional standards in mental health care.',
            'degree' => 'Stanford University',
            'specialization' => 'Master of Science in Clinical Psychology'
        ]);

        DB::table('doctors')->insert([
            'user_id' => 7,
            'hourly_rate' => 25.0,
            'about' =>'Doctor of Medicine with a focus on innovative treatment modalities and patient-centered care.',
            'degree' => 'Harvard Medical School',
            'specialization' => 'Doctor of Medicine in Psychiatry'
        ]);

        DB::table('doctors')->insert([
            'user_id' => 8,
            'hourly_rate' => 20.0,
            'about' =>'Ph.D. in Psychiatry from Johns Hopkins University, bringing a research-oriented approach to mental health interventions.',
            'degree' => 'Johns Hopkins University',
            'specialization' => 'Doctor of Philosophy (Ph.D.) in Psychiatry'
        ]);

        DB::table('doctors')->insert([
            'user_id' => 9,
            'hourly_rate' => 30.0,
            'about' =>"Master's in Psychiatric Nursing from the University of California, San Francisco, dedicated to compassionate nursing care in mental health.",
            'degree' => 'University of California, San Francisco',
            'specialization' => 'Master of Psychiatric Nursing'
        ]);

        DB::table('doctors')->insert([
            'user_id' => 11,
            'hourly_rate' => 28.0,
            'about' =>'Doctor of Psychology (Psy.D.) in Counseling from the University of Pennsylvania, offering a blend of psychological insights and counseling expertise.',
            'degree' => 'University of Pennsylvania',
            'specialization' => 'Doctor of Psychology (Psy.D.) in Counseling'
        ]);
        
        // Record 6
        DB::table('doctors')->insert([
            'user_id' => 12,
            'hourly_rate' => 24.0,
            'about' =>'Board-Certified Child & Adolescent Psychiatrist with specialized training at Columbia University, dedicated to the mental health needs of young individuals.',
            'degree' => 'Columbia University',
            'specialization' => 'Board-Certified Child & Adolescent Psychiatrist'
        ]);

    }
}
