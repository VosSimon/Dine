<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Product;
use App\Allergen;
use App\Category;
use Illuminate\Http\Request;

class adminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function add(Request $request)
    {
        $message = session('message');
        $request->session()->pull('message', 'default');
        $allergens = Allergen::all();
        $categories = Category::all();
        return view('add', ['allergens' => $allergens, 'categories' => $categories, 'message' => $message]);
    }

    public function edit(Request $request)
    {
        $message = session('message');
        $request->session()->pull('message', 'default');
        // $products = Product::all();
        $products = DB::table('products')
            ->leftJoin('allergen_product', 'allergen_product.product_id', '=', 'products.id')
            ->leftJoin('allergens', 'allergens.id', '=', 'allergen_id')
            ->select('products.*', 'allergens.id AS allergen_id')
            ->get();
        // return $products;
        $allergens = Allergen::all();
        $categories = Category::all();
        return view('edit', [
            'allergens' => $allergens,
            'categories' => $categories,
            'products' => $products,
            'message' => $message
        ]);
    }

    public function rem(Request $request)
    {
        $message = session('message');
        $request->session()->pull('message', 'default');
        $allergens = Allergen::all();
        $categories = Category::all();
        return view('rem', ['allergens' => $allergens, 'categories' => $categories, 'message' => $message]);
    }

}
