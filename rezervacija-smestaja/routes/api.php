<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserReservationController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SearchController;

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

Route::get('/users/{id}/reservations', [UserReservationController::class, 'index'])->name('users.reservations.index');

Route::get('/accommodations', [AccommodationController::class, 'index']);
Route::get('/accommodations/page', [AccommodationController::class, 'indexPaginate']);
Route::get('/accommodations/{id}', [AccommodationController::class, 'show']);
Route::get('/accommodations/location/{id}', [AccommodationController::class, 'getByLocationId']);

Route::get('/unavailable-dates', [SearchController::class, 'getUnavailableDates']);
Route::get('/search', [SearchController::class, 'search']);

Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations/{id}', [LocationController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});
