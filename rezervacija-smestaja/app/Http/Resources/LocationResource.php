<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public static $wrap = 'location';
    public function toArray($request)
    {
        return [
            'lokacijaID' => $this->lokacijaID,
            'grad' => $this->grad,
            'drzava' => $this->drzava,
            'putanja' => $this->putanja,
        ];
    }
}
