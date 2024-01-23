<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class hobbies2 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $hobbies = [
            ['name' => 'videogame', 'img_url' => 'images/hobbies/videogame1.jpg'],
            ['name' => 'swimming', 'img_url' => 'images/hobbies/swimming.jpg'],
            ['name' => 'snowboard', 'img_url' => 'images/hobbies/snowboard.jpg'],
            ['name' => 'volleyball', 'img_url' => 'images/hobbies/volleyball1.jpg'],
            ['name' => 'skydiving', 'img_url' => 'images/hobbies/skydiving.jpg'],
            ['name' => 'coding', 'img_url' => 'images/hobbies/coding.jpg'],
        ];

        DB::table('hobbies')->insert($hobbies);
    }
}
