<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('products', 'ProductController', ['except' => ['create','edit']]);
Route::resource('categories', 'CategoryController', ['except' => ['create','edit']]);
Route::resource('allergens', 'AllergensController', ['except' => ['create','edit']]);
Route::resource('orders', 'OrderController', ['only' => ['index', 'show']]);
// we have to add more of these routes but we must do some research on how to configure them
// by research i mean watch more videos :P
