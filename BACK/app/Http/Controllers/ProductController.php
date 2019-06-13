<?php

namespace App\Http\Controllers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use App\Product;
use App\Allergen;
use App\Category;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset($request->items)) {
            $productList = Product::paginate($request->items);
        } else {
            $productList = Product::paginate(50);
        }
        $product = $productList;

        return response()->json($product, 200);
    }

    // /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    public function productByCategory(Request $request, $category)
    {
        if (isset($request->items)) {
            $productList = Product::where('category_id', $category)->paginate($request->items);
        } else {
            $productList = Product::where('category_id', $category)->paginate(50);
        }
        $product = $productList;

        return response()->json($product, 200);
    }

    // /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    public function autocompleteProduct(Request $request)
    {

        $product = Product::where('name', 'LIKE', '%'.$request->search.'%')->limit(20)->get('name');

        return response()->json(["data" => $product], 200);
    }

    // /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    public function searchProductByName(Request $request)
    {
        if (isset($request->items)) {
            $productList = Product::where('name', 'LIKE', '%'.$request->name.'%')->paginate($request->items);
        } else {
            $productList = Product::where('name', 'LIKE', '%'.$request->name.'%')->paginate(50);
        }
        $product = $productList;

        return response()->json($product, 200);
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
        $thumbnail = Image::make($request->file('image')->getRealPath());
        $thumbnail->widen(300);
        $thumbnail->save(public_path('thumbnails/'.$data["image"]));
        // afbeelding opslaan in /public/img/random gegenereerde naam
        // thumbnail opslaan in thumbnails map
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
        return redirect('/add')->with(array('message' => 'Product: \''. $data["name"] .'\' toegevoegd.', 'code' => 'green'));
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
        if ($request->description == "") {
            unset($request->description);
        }
        $product = Product::findOrFail($id);
        if ($request->has("category_id")) {
            $product->category_id = $request->category_id;
        }

        if ($request->has("name")) {
            $product->name = $request->name;
        }

        if ($request->has("image")) {
            $image = $request->image->store('');
            $product->image = $image;
            $thumbnail = Image::make($request->file('image')->getRealPath());
            $thumbnail->widen(300);
            $thumbnail->save(public_path('thumbnails/'.$image));
        }

        if ($request->has("price")) {
            $product->price = $request->price;
        }

        if ($request->has("description")) {
            $product->description = $request->description;
        }

        if (!$product->isDirty()){
            return redirect('/edit')->with(array('message' => 'Er is geen gewijzigde waarde gevonden.', 'code' => 'red'));
        }
            $product->save();

            // return redirect()->route('edit');
            return redirect('/edit')->with(array('message' => 'Product gewijzigd.', 'code' => 'green'));
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

        return redirect('/edit')->with('message', 'Product verwijderd.');
    }
}
