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

Auth::routes(['verify' => true]);
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('/nopermission', ['as' => 'nopermission', 'uses' => 'adminController@noperm']);

Route::middleware('auth', 'admin')->group(
    function () {
        Route::get('/add', ['as' => 'add', 'uses' => 'adminController@add']);
        Route::get('/edit', ['as' => 'edit', 'uses' => 'adminController@edit']);
        Route::get('/rem', ['as' => 'rem', 'uses' => 'adminController@rem']);
        Route::post('/add.product', ['as' => 'add.product.post', 'uses' => 'productController@store']);
        Route::post('/edit.product/{id}', ['as' => 'edit.product.post', 'uses' => 'productController@update']);
        Route::post('/rem.product/{id}', ['as' => 'rem.product.post', 'uses' => 'productController@destroy']);
        Route::post('/add.category', ['as' => 'add.category.post', 'uses' => 'categoryController@store']);
        Route::post('/edit.category/{id}', ['as' => 'edit.category.post', 'uses' => 'categoryController@update']);
        Route::post('/rem.category/{id}', ['as' => 'rem.category.post', 'uses' => 'categoryController@destroy']);
        Route::post('/add.allergens', ['as' => 'add.allergens.post', 'uses' => 'allergensController@store']);
        Route::post('/edit.allergen/{id}', ['as' => 'edit.allergen.post', 'uses' => 'allergensController@update']);
        Route::post('/rem.allergen/{id}', ['as' => 'rem.allergen.post', 'uses' => 'allergensController@destroy']);
    }
);

// Route::get('/add', ['as' => 'add', 'uses' => 'adminController@add']);
// Route::get('/edit', ['as' => 'edit', 'uses' => 'adminController@edit']);
// Route::get('/rem', ['as' => 'rem', 'uses' => 'adminController@rem']);
// Route::post('/add.product', ['as' => 'add.product.post', 'uses' => 'productController@store']);
// Route::post('/edit.product/{id}', ['as' => 'edit.product.post', 'uses' => 'productController@update']);
// Route::post('/rem.product/{id}', ['as' => 'rem.product.post', 'uses' => 'productController@destroy']);
// Route::post('/add.category', ['as' => 'add.category.post', 'uses' => 'categoryController@store']);
// Route::post('/edit.category/{id}', ['as' => 'edit.category.post', 'uses' => 'categoryController@update']);
// Route::post('/rem.category/{id}', ['as' => 'rem.category.post', 'uses' => 'categoryController@destroy']);
// Route::post('/add.allergens', ['as' => 'add.allergens.post', 'uses' => 'allergensController@store']);
// Route::post('/edit.allergen/{id}', ['as' => 'edit.allergen.post', 'uses' => 'allergensController@update']);
// Route::post('/rem.allergen/{id}', ['as' => 'rem.allergen.post', 'uses' => 'allergensController@destroy']);
