<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ValoracioController;
use App\Http\Controllers\ComentariController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);

Route::get('/posts/{post}/comentaris', [ComentariController::class, 'index']);

Route::middleware(['auth:sanctum', 'role:editor,admin'])->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/users/{user}/role', [AuthController::class, 'updateRole']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts/{post}/valoracio', [ValoracioController::class, 'storeOrUpdate']);
    Route::delete('/posts/{post}/valoracio', [ValoracioController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts/{post}/comentaris', [ComentariController::class, 'store']);
    Route::delete('/comentaris/{comentari}', [ComentariController::class, 'destroy']);
});