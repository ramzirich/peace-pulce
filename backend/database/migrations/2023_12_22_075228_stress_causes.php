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
        Schema::create('stress_causes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("patient_id");
            $table->string('name');
            $table->string('img_url')->nullable();
            $table->softDeletes()->nullable(); 

            $table->foreign('patient_id')->references('id')->on('users')->onDelete('cascade');
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
