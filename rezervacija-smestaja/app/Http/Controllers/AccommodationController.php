<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use App\Http\Resources\Accommodation\AccommodationCollection;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AccommodationResource;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $accommodations = Accommodation::all();
        $accommodations = Accommodation::with(['user', 'location', 'accommodationType'])->get();

        if (is_null($accommodations) || count($accommodations) === 0) {
            return response()->json('No accommodations found!', 404);
        }

        // $accommodations->each(function ($accommodation) {
        //     $accommodation->putanja = $accommodation->putanja ? Storage::url($accommodation->putanja) : null;
        // });

        return response()->json(new AccommodationCollection($accommodations));
    }

    public function get3Random()
    {
        // Izvlačenje 3 nasumična smeštaja zajedno sa povezanim modelima
        $accommodations = Accommodation::with(['user', 'location', 'accommodationType'])
            ->inRandomOrder()
            ->take(3)
            ->get();

        if (is_null($accommodations) || $accommodations->isEmpty()) {
            return response()->json('No accommodations found!', 404);
        }

        $accommodations->each(function ($accommodation) {
            if ($accommodation->putanja && Storage::disk('public')->exists($accommodation->putanja)) {
                $accommodation->slika = base64_encode(Storage::disk('public')->get($accommodation->putanja));
            } else {
                $accommodation->slika = null;
            }
        });

        return response()->json(new AccommodationCollection($accommodations));
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
        /*$validatedData = */
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'lokacijaID' => 'required|exists:locations,lokacijaID',
            'adresa' => 'required|string|max:255',
            'brojKreveta' => 'required|integer|min:1',
            'maksimalanBrojOsoba' => 'required|integer|min:1',
            'cenaPoNoci' => 'required|numeric|min:0.01',
            'udaljenostOdCentra' => 'required|numeric|min:0.01',
            /*'putanja' => 'required|url',*/
            'tipSmestajaID' => 'required|exists:accommodation_types,tipSmestajaID',
            'userID' => 'required|exists:users,id',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('accommodation-images', 'public');
        }

        $accommodation = Accommodation::create(/*$validatedData*/[
            'naziv' => $request->naziv,
            'opis' => $request->opis,
            'lokacijaID' => $request->lokacijaID,
            'adresa' => $request->adresa,
            'brojKreveta' => $request->brojKreveta,
            'maksimalanBrojOsoba' => $request->maksimalanBrojOsoba,
            'cenaPoNoci' => $request->cenaPoNoci,
            'udaljenostOdCentra' => $request->udaljenostOdCentra,
            'putanja' => $imagePath,
            'tipSmestajaID' => $request->tipSmestajaID,
            'userID' => $request->userID,
        ]);

        return response()->json($accommodation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $accommodation = Accommodation::with(['location', 'accommodationType'])->find($id);

        if (!$accommodation) {
            return response()->json(['error' => 'Accommodation not found'], 404);
        }

        if ($accommodation->putanja && Storage::disk('public')->exists($accommodation->putanja)) {
            $accommodation->slika = base64_encode(Storage::disk('public')->get($accommodation->putanja));
        } else {
            $accommodation->slika = null;
        }

        return response()->json($accommodation);
    }

    public function getByUserId($userID)
    {
        $accommodations = Accommodation::where('userID', $userID)->with(['location', 'accommodationType', 'user'])->get();

        if (is_null($accommodations) || count($accommodations) === 0) {
            return response()->json('No accommodations found for this user', 404);
        }

        // Dodato
        // $accommodations->each(function ($accommodation) {
        //     $accommodation->putanja = $accommodation->putanja ? Storage::url($accommodation->putanja) : null;
        // });

        $accommodations->each(function ($accommodation) {
            if ($accommodation->putanja && Storage::disk('public')->exists($accommodation->putanja)) {
                $accommodation->slika = base64_encode(Storage::disk('public')->get($accommodation->putanja));
            } else {
                $accommodation->slika = null;
            }
        });

        return response()->json(new AccommodationCollection($accommodations));
    }

    public function getByLocationId($id)
    {
        $accommodations = Accommodation::where('lokacijaID', $id)->with(['location', 'accommodationType', 'user'])->get();

        if (is_null($accommodations) || count($accommodations) === 0) {
            return response()->json('No accommodations found for this location!', 404);
        }

        $accommodations->each(function ($accommodation) {
            if ($accommodation->putanja && Storage::disk('public')->exists($accommodation->putanja)) {
                $accommodation->slika = base64_encode(Storage::disk('public')->get($accommodation->putanja));
            } else {
                $accommodation->slika = null;
            }
        });

        return response()->json(new AccommodationCollection($accommodations));
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
    public function update(Request $request, $id)
    {
        $accommodation = Accommodation::findOrFail($id);

        // $validatedData = 
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'lokacijaID' => 'required|integer|exists:locations,lokacijaID',
            'adresa' => 'required|string|max:255',
            'brojKreveta' => 'required|integer|min:1',
            'maksimalanBrojOsoba' => 'required|integer|min:1',
            'cenaPoNoci' => 'required|numeric|min:0',
            'udaljenostOdCentra' => 'required|numeric|min:0',
            // 'putanja' => 'required|string|max:255',
            'tipSmestajaID' => 'required|integer|exists:accommodation_types,tipSmestajaID',
            'userID' => 'required|integer|exists:users,id',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($accommodation->putanja) {
                Storage::disk('public')->delete($accommodation->putanja);
            }
            $accommodation->putanja = $request->file('image')->store('accommodation-images', 'public');
        }

        // $accommodation->update($validatedData);

        $accommodation->update($request->only([
            'naziv',
            'opis',
            'lokacijaID',
            'adresa',
            'brojKreveta',
            'maksimalanBrojOsoba',
            'cenaPoNoci',
            'udaljenostOdCentra',
            'tipSmestajaID',
            'userID'
        ]));

        return response()->json(['message' => 'Accommodation updated successfully', 'accommodation' => $accommodation], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $accommodation = Accommodation::find($id);
        if (!$accommodation) {
            return response()->json(['message' => 'Accommodation not found'], 404);
        }
        $accommodation->delete();
        return response()->json(['message' => 'Accommodation deleted successfully', new AccommodationResource($accommodation)]);
    }
}
