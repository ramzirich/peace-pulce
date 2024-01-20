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
        Schema::create('problems', function(Blueprint $table){
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->text('problem');
            $table->integer('severity');
            $table->text('solution')->nullable();
            $table->text('ai_solution')->nullable();
            $table->text('action');
            $table->timestamps();

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
