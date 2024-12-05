<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccommodationTypeResource extends JsonResource
{
    public static $wrap = 'accommodationType';
    public function toArray($request)
    {
        return [
            'tipSmestajaID' => $this->tipSmestajaID,
            'naziv' => $this->naziv
        ];
    }
}
