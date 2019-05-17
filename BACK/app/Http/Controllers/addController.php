<?php

namespace App\Http\Controllers;

use App\Allergen;
use App\Category;
use Illuminate\Http\Request;

class addController extends Controller
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
    public function index(Request $request)
    {
        $message = session('message');
        $request->session()->pull('message', 'default');
        $allergens = Allergen::all();
        $categories = Category::all();
        return view('add', ['allergens' => $allergens, 'categories' => $categories, 'message' => $message]);
    }

}
