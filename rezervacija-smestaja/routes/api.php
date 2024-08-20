<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\AccommodationTypeController;
use App\Models\Accommodation;
use App\Models\Reservation;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/accommodations', [AccommodationController::class, 'index']);
Route::get('/accommodations3', [AccommodationController::class, 'get3Random']);
Route::get('/accommodations/page', [AccommodationController::class, 'indexPaginate']);
Route::get('/accommodations/{id}', [AccommodationController::class, 'show']);
Route::get('/accommodations/location/{id}', [AccommodationController::class, 'getByLocationId']);
Route::post('/accommodations', [AccommodationController::class, 'store']);
Route::delete('/accommodations/{id}', [AccommodationController::class, 'destroy']);
Route::get('/accommodations/user/{userId}', [AccommodationController::class, 'getByUserId']);
// Route::put('/accommodations/{id}', [AccommodationController::class, 'update']);
Route::post('/accommodations/{id}', [AccommodationController::class, 'update']);
// Route::middleware('auth:api')->group(function () {
//     Route::get('/accommodations/user/{userId}', [AccommodationController::class, 'getByUserId']);
// });

Route::get('/unavailable-dates', [SearchController::class, 'getUnavailableDates']);
Route::get('/search', [SearchController::class, 'search']);

Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations5', [LocationController::class, 'get5Random']);
Route::get('/locations/{id}', [LocationController::class, 'show']);

Route::get('/accommodation-types', [AccommodationTypeController::class, 'index']); // Izmenjeno

//Route::post('/reservations', [ReservationController::class, 'store'])->middleware('auth:sanctum');
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/{userId}', [ReservationController::class, 'getUserReservations']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
Route::get('/reservations/{smestajID}/dates', [ReservationController::class, 'getReservedDates']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);

    //Route::get('/reservations', [ReservationController::class, 'index']);
    // Route::post('/reservations', [ReservationController::class, 'store']); // Izmenjeno -> zakomentarisano
});
