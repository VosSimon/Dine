<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Notifications\SignupActivate;
use Validator;
use Carbon\Carbon;

class PassportController extends Controller
{
    public $successStatus = 200;

    /**
     * Handles Registration Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required|min:8',
                'password_confirmation' => 'required|same:password',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        //return response($input);
        $input['password'] = bcrypt($input['password']);
        $input[ 'activation_token'] = str_random(60);
        $user = User::create($input);
        $user->notify(new SignupActivate($user));
        $success['token'] =  $user->createToken('Personal Access Token')->accessToken;
        return response()->json(['success' => $success], $this->successStatus)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Handles Login Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        //Error messages
        $messages = [
            "email.required" => "Email is required",
            "email.email" => "Email is not valid",
            "email.exists" => "Email doesn't exists",
            "password.required" => "Password is required",
            "password.min" => "Password must be at least 8 characters"
        ];

        // validate the form data
        $validator = Validator::make(
            $request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8'
            ], $messages
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        } else {
            // attempt to log
            $credentials = request(['email', 'password']);
            $credentials['active'] = 1;
            $credentials['deleted_at'] = null;

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $success['token'] =  $user->createToken('Personal Access Token')->accessToken;
                return response()->json(
                    [
                        'success' => $success,
                    ], $this->successStatus
                );
            } else {
                return response()->json(
                    [
                        'error' => 'Password is incorrect!'
                    ]
                );
            }
        }
    }

    /**
     * Returns Authenticated User Details
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }

    /**
     * Sets the user to active after email confirmation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signupActivate($token)
    {
        $user = User::where('activation_token', $token)->first();
        if (!$user) {
            return response()->json(
                [
                'message' => 'This activation token is invalid.'
                ], 404
            );
        }
        $user->active = true;
        $user->email_verified_at = Carbon::now();
        $user->activation_token = '';
        $user->save();
        return response()->json($user);
    }

    /**
     * Logging out user
     */
    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
            return response()->json(['success' => 'logout_success'], 200);
        } else {
            return response()->json(['error' => 'api.something_went_wrong'], 500);
        }
        // return $this->json(null, "Successfully Logged Out");
    }
}

/////////////////////////////
// Delete before submission//
/////////////////////////////

// Links with the tutorials:
// https://www.tutsmake.com/create-rest-api-using-passport-laravel-5-8-authentication/
// https://tutsforweb.com/laravel-passport-create-rest-api-with-authentication/

// if you end remigrating your DB, you'll have to do this comand :
// php artisan passport:client --personal


// install carbon  $ composer require nesbot/carbon


// BestMarvelFanSite@gmail.com
// Vlad&SimonBest2


// Change the email look
// https://medium.com/@christianjombo/customizing-laravels-default-notification-email-template-adding-a-logo-and-changing-ff6f107dd640
