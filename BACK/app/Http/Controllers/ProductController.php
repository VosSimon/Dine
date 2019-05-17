<?php

namespace App\Http\Controllers;

use App\Product;
use App\Allergen;
use App\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();

        return response()->json(['data' => $product], 200);
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
        $data["image"] = $request->image->store('');
        // afbeelding opslaan in /public/img/random gegenereerde naam
        // $data["image"] bevat gegenereerde naam voor in de database
        $product = Product::create($data);
        $allergens = array_values(array_filter($data["allergens"]));
        // id 0 uit array halen
        if (count($allergens) > 0) {
            $product->Allergens()->attach($allergens);
        }

        // return response()->json(['data' => $product], 201);
        // $allergens = Allergen::all();
        // $categories = Category::all();
        // return view('add', ['allergens' => $allergens, 'categories' => $categories, 'message' => 'Product toegevoegd.']);
        return redirect('/add')->with('message', 'Product toegevoegd.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json(['data' => $product], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        if ($request->has("product_id")) {
            $product->category_id = $request->product_id;
        }

        if ($request->has("name")) {
            $product->name = $request->name;
        }

        if ($request->has("image")) {
            $product->image = $request->image;
        }

        if ($request->has("price")) {
            $product->price = $request->price;
        }

        if ($request->has("description")) {
            $product->description = $request->description;
        }

        if (!$product->isDirty()){
            return response()->json(['data' => 'You need to specify a different value to update.', 'code' => 422], 422);
        }
            $product->save();

            return response()->json(['data' => $product],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json(['data' => $product],200);
    }
}
