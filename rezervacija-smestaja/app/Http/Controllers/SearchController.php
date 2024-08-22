<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accommodation;
use App\Models\Reservation;
use Illuminate\Support\Facades\Storage;

class SearchController extends Controller
{
    public function getUnavailableDates(Request $request)
    {
        $destination = $request->input('destination');

        $accommodations = Accommodation::with('location')
            ->whereHas('location', function ($query) use ($destination) {
                $query->where('grad', 'like', "%$destination%")
                    ->orWhere('drzava', 'like', "%$destination%");
            })
            ->pluck('smestajID');

        $unavailableDates = Reservation::whereIn('smestajID', $accommodations)
            ->select('datumPrijave', 'datumOdjave')
            ->get();

        return response()->json($unavailableDates);
    }

    public function search(Request $request)
    {
        $destination = $request->input('destination');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $guests = $request->input('guests');

        $destinationParts = preg_split('/\s*,\s*|\s+/', $destination);

        // Get accommodations by destination
        $accommodations = Accommodation::with('location')
            ->whereHas('location', function ($query) use ($destinationParts) {
                $query->where(function ($query) use ($destinationParts) {
                    foreach ($destinationParts as $part) {
                        $query->orWhere('grad', 'like', "%$part%")
                            ->orWhere('drzava', 'like', "%$part%");
                    }
                });
            })
            ->where('maksimalanBrojOsoba', '>=', $guests)
            ->get();

        // Filter out accommodations that are reserved in the given date range
        $filteredAccommodations = $accommodations->filter(function ($accommodation) use ($startDate, $endDate) {
            $reservations = Reservation::where('smestajID', $accommodation->smestajID)
                ->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween('datumPrijave', [$startDate, $endDate])
                        ->orWhereBetween('datumOdjave', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('datumPrijave', '<=', $startDate)
                                ->where('datumOdjave', '>=', $endDate);
                        });
                })
                ->exists();

            return !$reservations;
        });

        $filteredAccommodations->transform(function ($accommodation) {
            if ($accommodation->putanja && Storage::disk('public')->exists($accommodation->putanja)) {
                $accommodation->setAttribute('slika', base64_encode(Storage::disk('public')->get($accommodation->putanja)));
            } else {
                $accommodation->setAttribute('slika', null);
            }
            return $accommodation;
        });

        return response()->json($filteredAccommodations);
    }
}
