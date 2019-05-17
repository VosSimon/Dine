<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/add', ['as' => 'add', 'uses' => 'addController@index']);
Route::post('/add.product', ['as' => 'add.product.post', 'uses' => 'productController@store']);
Route::post('/add.category', ['as' => 'add.category.post', 'uses' => 'categoryController@store']);
Route::post('/add.allergens', ['as' => 'add.allergens.post', 'uses' => 'allergensController@store']);
