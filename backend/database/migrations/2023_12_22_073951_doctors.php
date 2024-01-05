<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->decimal('hourly_rate');
            $table->text('about');
            $table->string('degree');
            $table->string('specialization');
            $table->softDeletes()->nullable(); 

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
