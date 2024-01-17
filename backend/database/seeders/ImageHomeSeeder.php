<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageHomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $quotes = [
            [
                'text' => "The only limit to our realization of tomorrow will be our doubts of today.",
                'author' => 'Franklin D. Roosevelt',
                'url' => 'images/home/8.jpg',
            ],
            [
                'text' => "You will not fail if it is worth it. Do not give up!",
                'author' => 'Pantheon',
                'url' => 'images/home/9.jpg',
            ],
            [
                'text' => "In the future, the great division will be between those who have trained themselves to handle these complexities and those who are overwhelmed by them ",
                'author' => 'Robert Green',
                'url' => 'images/home/12.jpg',
            ],
            [
                'text' => "Pressing forward is not the same as running from your mistakes. We are what we overcome",
                'author' => 'Pantheon',
                'url' => 'images/home/13.jpg',
            ],
            [
                'text' => 'The only way to do great work is to love what you do.',
                'author' => 'Steve Jobs',
                'url' => 'images/home/14.jpg',
            ],
            [
                'text' => "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
                'author' => 'Ralph Waldo Emerson',
                'url' => 'images/home/15.jpg',
            ],
            [
                'text' => "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                'author' => 'Winston Churchill',
                'url' => 'images/home/16.jpg',
            ],
            [
                'text' => 'How much further could we march, if we were not forced to carry our fears on our backs?',
                'author' => 'Pantheon',
                'url' => 'images/home/18.jpg',
            ],
            [
                'text' => "You possess a potent force that you either use, or it will use you.",
                'author' => 'Robert Greene',
                'url' => 'images/home/19.jpg',
            ],
        ];

        foreach ($quotes as $quote) {
            DB::table('home_images')->insert([
                'text' => $quote['text'],
                'author' => $quote['author'],
                'url' => $quote['url'],
            ]);
        }
    }
}
