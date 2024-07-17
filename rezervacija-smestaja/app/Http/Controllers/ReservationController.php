<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        return response()->json($reservation, 201);
    }

    public function getUserReservations($userId, Request $request)
    {
        $perPage = $request->input('per_page', 5); // Broj rezervacija po stranici, podrazumevano 5
        $reservations = Reservation::where('userID', $userId)
            ->with('accommodation.location')
            ->orderBy('datumPrijave', 'asc')
            ->paginate($perPage);

        return response()->json($reservations);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully'], 200);
    }
}
