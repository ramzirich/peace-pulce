<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class hobbies extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $hobbies = [
            ['name' => 'basketball', 'img_url' => 'images/hobbies.basketball.jpg'],
            ['name' => 'football', 'img_url' => 'images/hobbies.football.jpg'],
            ['name' => 'tennis', 'img_url' => 'images/hobbies.tennis.jpg'],
            ['name' => 'pingpong', 'img_url' => 'images/hobbies.pingpong.jpg'],
            ['name' => 'reading', 'img_url' => 'images/hobbies.reading.jpg'],
            ['name' => 'running', 'img_url' => 'images/hobbies.running.jpg'],
            ['name' => 'ski', 'img_url' => 'images/hobbies.ski.jpg'],
            ['name' => 'photographing', 'img_url' => 'images/hobbies.photographing.jpg'],
            ['name' => 'cooking', 'img_url' => 'images/hobbies.cooking.jpg'],
            ['name' => 'videogames', 'img_url' => 'images/hobbies.videogames.jpg'],
        ];

        foreach ($hobbies as $hobby) {
            DB::table('hobbies')->insert($hobby);
        }
    }
}
