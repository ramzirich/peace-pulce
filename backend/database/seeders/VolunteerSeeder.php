<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VolunteerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('volunteers')->insert([
            'user_id' => 13,
            'about'=> "Join me on a journey of making a difference! I am a dedicated volunteer with a passion for community development. Whether it's organizing events, supporting local causes, or lending a helping hand to those in need, I believe in the power of collective action to create positive change. Let's collaborate and contribute to building a better world together."
        ]);

        DB::table('volunteers')->insert([
            'user_id' => 14,
            'about'=> "I thrive on connecting with others and understanding their unique stories. As a volunteer, I bring a deep sense of empathy to every interaction. Through active listening and genuine compassion, I aim to make a meaningful impact on the lives of those I serve. Join me on this path of empathy-driven volunteering, and let's inspire positive transformations, one connection at a time."
        ]);

        DB::table('volunteers')->insert([
            'user_id' => 15,
            'about'=> "Life is a continuous journey of growth, and I am committed to both giving and receiving. As a volunteer, I offer my skills and knowledge to uplift others, providing mentorship and guidance. Simultaneously, I embrace every opportunity to learn from the diverse experiences of those around me. Let's create a dynamic learning community where we can grow together and empower one another."
        ]);

        DB::table('volunteers')->insert([
            'user_id' => 16,
            'about'=> "Join me in embracing the transformative nature of volunteer work, where each interaction becomes a stepping stone towards personal development. Let's celebrate the lessons learned from overcoming obstacles and the joy that comes from making a difference in the lives of others. Together, we'll navigate the intricacies of collaboration, build resilience, and foster a sense of purpose that extends beyond ourselves."
        ]);
    }
}
