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
            ['name' => 'basketball', 'img_url' => 'images/hobbies/basketball.jpg'],
            ['name' => 'videogame', 'img_url' => 'images/hobbies/videogame.jpg'],
            ['name' => 'swimming', 'img_url' => 'images/hobbies/swimming.jpg'],
            ['name' => 'snowboard', 'img_url' => 'images/hobbies/snowboard.jpg'],
            ['name' => 'volleyball', 'img_url' => 'images/hobbies/volleyball.jpg'],
            ['name' => 'skydiving', 'img_url' => 'images/hobbies/skydiving.jpg'],
            ['name' => 'coding', 'img_url' => 'images/hobbies/coding.jpg'],
        ];

        DB::table('hobbies')->insert($hobbies);
    }
}
