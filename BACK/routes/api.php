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


Route::post('apilogin', 'PassportController@login');
Route::post('apiregister', 'PassportController@register');
Route::get('activate/{token}', 'PassportController@signupActivate');
Route::post('create', 'PasswordResetController@create');
Route::get('find/{token}', 'PasswordResetController@find');
Route::post('reset', 'PasswordResetController@reset');


Route::middleware('auth:api')->group(
    function () {
        Route::get('apiuser', 'PassportController@getUser');
        Route::get('logout', 'PassportController@logout');
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
Route::resource('users', 'UserController', ['parameter' => ['users' => 'users']]);
Route::get('productByCategory/{category}', 'ProductController@productByCategory');
Route::post('autocompleteProduct', 'ProductController@autocompleteProduct');
Route::get('searchProductByName', 'ProductController@searchProductByName');
