<?php

namespace App\Http\Controllers;

use App\Allergens;
use Illuminate\Http\Request;

class AllergensController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allergen = Allergen::all();

        return response()->json(['data' => $allergen], 200);
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
        $data = $request->all();
        $allergen = Allergens::create($data);

        return response()->json(['data' => $allergen], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function show(Allergens $allergens)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function edit(Allergens $allergens)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Allergens $allergens)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function destroy(Allergens $allergens)
    {
        //
    }
}
