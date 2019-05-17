<?php

namespace App\Http\Controllers;

use App\Allergen;
use App\Category;
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

        // return response()->json(['data' => $allergen], 201);
        // $allergens = Allergen::all();
        // $categories = Category::all();
        // return view('add', ['allergens' => $allergens, 'categories' => $categories, 'message' => 'Allergie toegevoegd.']);
        return redirect('/add')->with('message', 'Allergie toegevoegd.');
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

            return response()->json(['data' => $allergen],200);
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

        return response()->json(['data' => $allergen],200);
    }
}
