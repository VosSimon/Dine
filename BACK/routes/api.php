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

// testing email style   remove later
// use this so you don't have to register or reset password to be able to see how emails look

use Illuminate\Support\Facades\Notification;
// use App\Notifications\PasswordResetSuccess;
use App\Notifications\ContactMessage;

Route::get('/test-mail', function () {
    Notification::route('mail', 'BestMarvelFanSite@gmail.com')->notify(new ContactMessage("something@lol.co", "I just want to say that the croisants are amazing!!!"));
    return 'Sent';
});

// end test    don't remove yet  :P

Route::post('apilogin', 'PassportController@login');
Route::post('apiregister', 'PassportController@register');
Route::get('activate/{token}', 'PassportController@signupActivate');
Route::post('create', 'PasswordResetController@create');
Route::get('find/{token}', 'PasswordResetController@find');
Route::post('reset', 'PasswordResetController@reset');
Route::post('contact/message', 'ContactMessageController@sendMessage');

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
    'orders' => 'OrderController',
    'profile' => 'ProfileController'
    // 'users', 'UserController'
    ]
);
Route::resource('users', 'UserController', ['parameter' => ['users' => 'users']]);
Route::get('productByCategory/{category}', 'ProductController@productByCategory');
Route::post('autocompleteProduct', 'ProductController@autocompleteProduct');
Route::get('searchProductByName', 'ProductController@searchProductByName');
// Route::put('profile/update', 'ProfileController@update');
