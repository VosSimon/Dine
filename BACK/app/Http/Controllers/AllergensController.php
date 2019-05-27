<?php

namespace App\Http\Controllers;

use App\Allergen;
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
        $allergen = Allergen::create($data);

        return redirect('/add')->with('message', 'Allergie: \''. $data["name"] .'\' toegevoegd.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $allergen = Allergen::findOrFail($id);

        return response()->json(['data' => $allergen], 200);
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
    public function update(Request $request, $id)
    {
        $allergen = Allergen::findOrFail($id);

        if ($request->has("name")) {
            $allergen->name = $request->name;
        }

        if (!$allergen->isDirty()){
            return response()->json(['data' => 'You need to specify a different value to update.', 'code' => 422], 422);
        }
        $allergen->save();

        return redirect('/edit')->with('message', 'Allergie: \''. $request->name .'\' gewijzigd.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Allergens  $allergens
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $allergen = Allergen::findOrFail($id);

        $allergen->delete();

        return redirect('/edit')->with('message', 'Allergie verwijderd.');
    }
}
