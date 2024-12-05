<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'datumPrijave' => 'required|date',
            'datumOdjave' => 'required|date|after:datumPrijave',
            'brojOsoba' => 'required|integer|min:1',
            'smestajID' => 'required|exists:accommodations,smestajID',
            'userID' => 'required|exists:users,id'
        ]);

        $reservation = Reservation::create([
            'datumPrijave' => $request->datumPrijave,
            'datumOdjave' => $request->datumOdjave,
            'brojOsoba' => $request->brojOsoba,
            'userID' => $request->userID,
            'smestajID' => $request->smestajID,
        ]);

        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation' => $reservation
        ], 201);
    }

    public function getUserReservations($userId, Request $request)
    {
        $perPage = $request->input('per_page', 8);
        $reservations = Reservation::where('userID', $userId)
            ->with('accommodation.location')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        $reservations->getCollection()->transform(function ($reservation) {
            if ($reservation->accommodation->putanja && Storage::disk('public')->exists($reservation->accommodation->putanja)) {
                $reservation->accommodation->slika = base64_encode(Storage::disk('public')->get($reservation->accommodation->putanja));
            } else {
                $reservation->accommodation->slika = null;
            }
            return $reservation;
        });

        return response()->json($reservations);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $reservationData = $reservation->toArray();

        $reservation->delete();

        return response()->json([
            'message' => 'Reservation deleted successfully',
            'reservation' => $reservationData
        ], 200);
    }

    public function getReservedDates($smestajID)
    {
        try {
            $reservations = Reservation::where('smestajID', $smestajID)->get(['datumPrijave', 'datumOdjave']);
            return response()->json($reservations);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
