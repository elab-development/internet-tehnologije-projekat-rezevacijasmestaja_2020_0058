<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use App\Http\Resources\Accommodation\AccommodationCollection;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accommodation = Accommodation::all();
        if (is_null($accommodation) || count($accommodation) === 0) {
            return response()->json('No accommodations found!', 404);
        }
        return response()->json(new AccommodationCollection($accommodation));
    }

    public function indexPaginate()
    {
        $accommodation = Accommodation::all();
        if (is_null($accommodation) || count($accommodation) === 0) {
            return response()->json('No accommodations found!', 404);
        }
        $accommodation = Accommodation::paginate(20);
        return response()->json(new AccommodationCollection($accommodation));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Accommodation $accommodation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accommodation $accommodation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Accommodation $accommodation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accommodation $accommodation)
    {
        //
    }
}
