<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserReservationController;
use App\Http\Controllers\AccommodationController;

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