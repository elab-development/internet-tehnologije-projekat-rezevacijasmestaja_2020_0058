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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('rezervacijaID');
            $table->date('datumPrijave');
            $table->date('datumOdjave');
            $table->integer('brojOsoba');
            $table->unsignedBigInteger('userID');  
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade'); 
            $table->unsignedBigInteger('smestajID');  
            $table->foreign('smestajID')->references('smestajID')->on('accommodations')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
