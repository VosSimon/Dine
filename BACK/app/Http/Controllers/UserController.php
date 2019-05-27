<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        if (!$users) {  // look into why this doesn't work
            return response()->json(
                [
                    'success' => false,
                    'message' => 'There are no users in the database'
                ],
                400
            );
        }

        return response()->json(
            [
                'data' => $users,
                'success' => true
            ],
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ];

        $request->validate($rules);

        $data = $request->all();
        $data['password'] = bcrypt($request->password);
        // $data['email_verified_at'] = User::UNVERIFIED_EMAIL;

        $user = User::create($data);
        return response()->json(['data' => $user], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrfail($id);

        if (!$user) {
            return response()->json(
                [
                'success' => false,
                'message' => 'Usert with id ' . $id . ' not found'
                ],
                400
            );
        }

        return response()->json(
            [
            'data' => $user,
            'succsess' => true
            ],
            200
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrfail($id);

        if (!$user) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Usert with id ' . $id . ' not found'
                ],
                400
            );
        }

        $rules = [
            'email' => 'email|unique:users,email' . $user->id,
            'password' => 'min:8|confirmed'
        ];
        $request->validate($rules);

        if ($request->has('email') && $user->email != $request->email) {
            // $user->email_verified_at = User::UNVERIFIED_EMAIL;
            $user->email = $request->email;
        }

        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }

        return response()->json(
            [
                'success' => true,
                'message' => 'Usert with id ' . $id . ' was updated'
            ],
            400
        );


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrfail($id);

        if (!$user) {
            return response()->json(
                [
                'success' => false,
                'message' => 'User with id ' . $id . ' not found'
                ],
                400
            );
        }

        if ($user->delete()) {
            return response()->json(
                [
                'success' => true
                ]
            );
        } else {
            return response()->json(
                [
                'success' => false,
                'message' => 'User could not be deleted'
                ],
                500
            );
        }
    }
}
