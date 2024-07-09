<?php

namespace App\Http\Resources\Accommodation;

use App\Http\Resources\AccommodationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AccommodationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */

    //public static $wrap = 'accommodations';

    public function toArray(Request $request) //: array
    {
        // return parent::toArray($request);
        return $this->collection->transform(function ($accommodation) {
            return new AccommodationResource($accommodation);
        });
    }
}
