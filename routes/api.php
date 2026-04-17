<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CommandeController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Produits publics
Route::get('/produits',      [ProduitController::class, 'index']);
Route::get('/produits/{id}', [ProduitController::class, 'show']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',          [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $r) => $r->user());

    Route::post('/produits',        [ProduitController::class, 'store']);
    Route::put('/produits/{id}',    [ProduitController::class, 'update']);
    Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);

    Route::get('/commandes',        [CommandeController::class, 'index']);
    Route::post('/commandes',       [CommandeController::class, 'store']);
    Route::get('/commandes/{id}',   [CommandeController::class, 'show']);
});