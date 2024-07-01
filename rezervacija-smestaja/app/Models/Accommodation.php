<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $primaryKey = 'smestajID';
    protected $fillable = [
        'naziv', 
        'opis', 
        'lokacijaID', 
        'adresa', 
        'brojKreveta', 
        'maksimalanBrojOsoba',
        'cenaPoNoci', 
        'udaljenostOdCentra', 
        'putanja', 
        'tipSmestajaID', 
        'userID'//od strane koga je kreiran smestaj
    ];

    // Relacija sa lokacijom smeštaja
    public function location()
    {
        return $this->belongsTo(Location::class, 'lokacijaID', 'lokacijaID');
    }

    // Relacija sa tipom smeštaja
    public function accommodationType()
    {
        return $this->belongsTo(AccommodationType::class, 'tipSmestajaID', 'tipSmestajaID');
    }

    // Relacija sa korisnikom koji je dodao smeštaj
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    // Relacija sa rezervacijama ovog smeštaja
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'smestajID', 'smestajID');
    }
}
