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


Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');

Route::middleware('auth:api')->group(
    function () {
        Route::get('user', 'PassportController@getUser');

        // Route::resource('products', 'ProductController');
    }
);

Route::apiResources(
    ['products' => 'ProductController',
    'categories' => 'CategoryController',
    'allergens' => 'AllergensController',
    'roles' => 'RoleController',
    'clientTypes' => 'ClientTypeController',
    'orders' => 'OrderController'
    // 'users', 'UserController'
    ]
);
// Route::resource('orders', 'OrderController', ['only' => ['index', 'show']]);
Route::resource('users', 'UserController', ['parameter' => ['users' => 'users']]);
Route::get('productByCategory/{category}', 'ProductController@productByCategory');
