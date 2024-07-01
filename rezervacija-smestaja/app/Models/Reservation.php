<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $primaryKey = 'rezervacijaID';
    protected $fillable = [
        'datumPrijave', 
        'datumOdjave', 
        'brojOsoba', 
        'userID', 
        'smestajID'
    ];

    // Relacija sa korisnikom koji je napravio rezervaciju
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    // Relacija sa smeštajem koji je rezervisan
    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class, 'smestajID', 'smestajID');
    }
}
