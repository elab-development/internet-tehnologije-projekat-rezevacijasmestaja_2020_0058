<?php

namespace App\Http\Controllers;

use App\Models\AccommodationType;
use Illuminate\Http\Request;

class AccommodationTypeController extends Controller
{
    public function index()
    {
        $locations = AccommodationType::all();
        return response()->json($locations);
    }

    public function show($id)
    {
    }
}
