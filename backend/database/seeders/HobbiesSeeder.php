<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HobbiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('hobbies')->insert([
            'name' => 'Karate',
            "img_url" => 'no_url',
        ]);

        DB::table('hobbies')->insert([
            'name' => 'Video games',
            "img_url" => 'no_url',
        ]);

        DB::table('hobbies')->insert([
            'name' => 'Hiking',
            "img_url" => 'no_url',
        ]);

        DB::table('hobbies')->insert([
            'name' => 'Reading',
            "img_url" => 'no_url',
        ]);
    }
}
