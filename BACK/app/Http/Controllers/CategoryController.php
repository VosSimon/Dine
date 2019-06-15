<?php

namespace App\Http\Controllers;

use App\Category;
use App\Allergen;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();

        return response()->json(['data' => $category], 200);
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
        $category = Category::create($data);

        // return response()->json(['data' => $category], 201);
        // $allergens = Allergen::all();
        // $categories = Category::all();
        // return view('add', ['allergens' => $allergens, 'categories' => $categories, 'message' => 'Categorie toegevoegd.']);
        $message = 'Categorie: \''. $data["name"] .'\' toegevoegd.';
        return redirect('/add')->with(array('message' => $message, 'code' => 'green'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);

        return response()->json(['data' => $category], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        if ($request->has("name")) {
            $category->name = $request->name;
        }

        if (!$category->isDirty()) {
            return response()->json(['data' => 'You need to specify a different value to update.', 'code' => 422], 422);
        }
        $category->save();

        $message = 'Categorie: \''. $request->name .'\' gewijzigd.';
        return redirect('/edit')->with(array('message' => $message, 'code' => 'green'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category $category
     * @return  \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return redirect('/edit')->with(array('message' => 'Categorie verwijderd.', 'code' => 'green'));
    }
}
