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
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id('smestajID');
            $table->string('naziv');
            $table->string('opis');
            $table->unsignedBigInteger('lokacijaID');  
            $table->foreign('lokacijaID')->references('lokacijaID')->on('locations')->onDelete('cascade'); 
            $table->string('adresa');
            $table->integer('brojKreveta');
            $table->integer('maksimalanBrojOsoba');
            $table->float('cenaPoNoci');
            $table->double('udaljenostOdCentra');
            $table->string('putanja');
            $table->unsignedBigInteger('tipSmestajaID');
            $table->foreign('tipSmestajaID')->references('tipSmestajaID')->on('accommodation_types')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
