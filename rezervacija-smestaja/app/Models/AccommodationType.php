<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccommodationType extends Model
{
    use HasFactory;

    protected $primaryKey = 'tipSmestajaID';
    protected $fillable = [
        'naziv'
    ];

    // Relacija sa smeštajima ovog tipa
    public function accommodations()
    {
        return $this->hasMany(Accommodation::class, 'tipSmestajaID', 'tipSmestajaID');
    }
}
