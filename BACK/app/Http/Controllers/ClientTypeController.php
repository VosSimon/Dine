<?php

namespace App\Http\Controllers;

use App\ClientType;
use Illuminate\Http\Request;

class ClientTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ClientType = ClientType::all();

        return response()->json(['data' => $ClientType], 200);
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
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $clientType = ClientType::create($data);

        return response()->json(['data' => $clientType], 201);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $clientType = Role::findOrfail($id);

        return response()->json(['data' => $clientType], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $clientType = ClientType::findOrFail($id);

        if ($request->has('type')) {
            $clientType->type = $request->type;
        }

        $clientType->save();
        return response()->json('Client type changed');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $clientType = ClientType::findOrFail($id);

        $clientType->delete();

        return response()->json(['Type removed:' => $clientType->type], 200);
    }
}
