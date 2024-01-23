<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class places extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $placesData = [
            ['name' => 'bar', 'img_url' => 'images/places/bar.jpg'],
            ['name' => 'restaurant', 'img_url' => 'images/places/restaurant.jpg'],
            ['name' => 'beach', 'img_url' => 'images/places/beach.jpg'],
            ['name' => 'city', 'img_url' => 'images/places/city.jpg'],
            ['name' => 'lake', 'img_url' => 'images/places/lake.jpg'],
            ['name' => 'nature', 'img_url' => 'images/places/nature.jpg'],
            ['name' => 'sunset', 'img_url' => 'images/places/sunset.png'],
            ['name' => 'waterfall', 'img_url' => 'images/places/waterfall.jpg'],
        ];
        
        foreach ($placesData as $data) {
            DB::table('places')->insert($data);
        }
    }
}
