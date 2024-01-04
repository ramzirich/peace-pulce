<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('places')->insert([
            'name' => 'beach',
            "img_url" => 'no_url',
        ]);

        DB::table('places')->insert([
            'name' => 'nature',
            "img_url" => 'no_url',
        ]);

        DB::table('places')->insert([
            'name' => 'coffe shop',
            "img_url" => 'no_url',
        ]);

        DB::table('places')->insert([
            'name' => 'restaurants',
            "img_url" => 'no_url',
        ]);
    }
}
