<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return response()->json($locations);
    }

    public function get5Random()
    {
        // Izvlačenje 5 nasumičnih lokacija
        $locations = Location::inRandomOrder()
            ->take(5)
            ->get();

        if (is_null($locations) || $locations->isEmpty()) {
            return response()->json('No locations found!', 404);
        }

        return response()->json($locations);
    }

    public function show($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }

        return response()->json($location);
    }
}
