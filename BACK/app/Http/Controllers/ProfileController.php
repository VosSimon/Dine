<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Validator;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profile = Profile::all();

        return response()->json(['data' => $profile], 200);
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
        if ($request->birthDate == null) {
            unset($request->birthDate);
        }
        if ($request->company == null) {
            unset($request->company);
        }
        if ($request->btw == null) {
            unset($request->btw);
        }

        // validate the form data
        $validator = Validator::make(
            $request->all(),
            [
                'fname' => 'required|string',
                'lname' => 'required|string',
                'telephone' => 'required|string',
                'postcode' => 'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {
            $profile = Profile::create(
                [
                    'user_id' => $request->userId,
                    'fname' => $request->fname,
                    'lname' => $request->lname,
                    'telephone' => $request->telephone,
                    'birth_date' => $request->bithDate,
                    'company' => $request->company,
                    'btw' => $request->btw,
                    'postcode' => $request->postcode
                ]
            );
        }
        return response()->json(
            [
                'profile' => $profile,
                'success' => 'Profile information saved successfully'
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $profile = Profile::where('user_id', $id)->first();

        return response()->json(['data' => $profile], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $putData = file_get_contents("php://input");
        $request = json_decode($putData);
        $id = $id;
        $profile = Profile::where('id', $id)->first();
        // validate the form data
        // $validator = Validator::make(
        //     $request->all(),
        //     [
        //         'fname' => 'required|string',
        //         'lname' => 'required|string',
        //         'telephone' => 'required|string',
        //         'postcode' => 'required|string'
        //     ]
        // );

        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 401);
        // } else {
            // return response()->json($request->birth_date);
            if ($request->birth_date != null || $request->birth_date != "") {
                $profile->birth_date = $request->birth_date;
            }
            if ($request->company != null || $request->company != "") {
                $profile->company = $request->company;
            }
            if ($request->btw != null || $request->btw != "") {
                $profile->btw = $request->btw;
            }
            //update
            $profile->fname = $request->fname;
            $profile->lname = $request->lname;
            $profile->telephone = $request->telephone;
            $profile->postcode = $request->postcode;
            $profile->save();
        // }

        return response()->json(['success' => 'Profile updated succesfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);

        $profile->delete();

    }
}


// clean this up
// $date = Carbon::createFromIsoFormat('!YYYY-MMMM-D h:mm:ss a', $request->birthDate);
        // $newdate = $date->isoFormat('M-D-YY H:mm');
        // $incoming = $request->birthDate;
        // $date = strtotime($incoming);
        // $newformat = date('Y-m-d', $incoming);
        // return response()->json($formatteddate);
