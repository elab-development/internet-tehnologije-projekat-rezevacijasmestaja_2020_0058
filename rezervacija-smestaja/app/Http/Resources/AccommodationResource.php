<?php

namespace App\Http\Resources;

use App\Models\AccommodationType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccommodationResource extends JsonResource
{
    public static $wrap = 'accommodation';
    public function toArray($request)
    {
        return [
            'smestajID' => $this->smestajID,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'lokacija' => new LocationResource($this->whenLoaded('location')),
            'adresa' => $this->adresa,
            'brojKreveta' => $this->brojKreveta,
            'maksimalanBrojOsoba' => $this->maksimalanBrojOsoba,
            'cenaPoNoci' => $this->cenaPoNoci,
            'udaljenostOdCentra' => $this->udaljenostOdCentra,
            'putanja' => $this->putanja,
            'slika' => $this->slika,
            'tipSmestaja' => new AccommodationTypeResource($this->whenLoaded('accommodationType')),
            'user' => new UserResource($this->whenLoaded('user'))
        ];
    }
}
