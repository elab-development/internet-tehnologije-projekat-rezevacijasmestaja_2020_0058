<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $primaryKey = 'lokacijaID';
    protected $fillable = [
        'grad', 
        'drzava'
    ];

    // Relacija sa smeštajima u ovoj lokaciji
    public function accommodations()
    {
        return $this->hasMany(Accommodation::class, 'lokacijaID', 'lokacijaID');
    }
}
