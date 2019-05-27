@extends('layouts.app')

@section('header')

@endsection
@section('content')
@if(isset($message))
<div class="message {{$code}}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <p id="message">{{ $message }}</p>
    </div>
@endif
@section("nav")
@parent
<div id="subnav">
    <a href="#productSection" title="Naar producten">
        <div>
            <i class="fas fa-bread-slice"></i>
            <span>
                <p>{{count($products)}}</p>
                <p>Producten</p>
            </span>
        </div>
    </a>
    <a href="#categorySection" title="Naar categorieën">
        <div>
            <i class="fas fa-tags"></i>
            <span>
                <p>{{count($categories)}}</p>
                <p>categorieën</p>
            </span>
        </div>
    </a>
    <a href="#allergenSection" title="Naar allergenen">
        <div>
            <i class="fas fa-allergies"></i>
            <span>
                <p>{{count($allergens)}}</p>
                <p>Allergenen</p>
            </span>
        </div>
    </a>
</div>
@endsection
<section id="productSection" class="container">
    <h1>Aanpassen en verwijderen</h1>
    <h2>Producten</h2>
    @foreach($products as $index => $product)
    <div class="productView">
        <figure>
            <img src="{{asset('img/'.$product->image)}}">
        </figure>
        <figcaption>
            <form class="updateProduct" method="POST", enctype="multipart/form-data", action="{{ route('edit.product.post', ['id' => $product->id]) }}">
            <input disabled type="hidden" name="_token" value="{{ csrf_token() }}">
                <ul>
                    <li>
                        <input disabled type="text" name="name" required id="prodName" value="{{ $product->name }}">
                        <label for="prodName">naam</label>
                    </li>
                    <li>
                        <select disabled name="category_id" id="category" required>
                        @foreach($categories as $category)
                            @if($category->id == $product->category_id)
                                <option selected value="{{ $category->id }}">{{ $category->name }}</option>
                            @else
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endif
                        @endforeach
                        </select>
                        <label for="catName">categorie naam</label>
                    </li>
                    <li>
                        <select disabled name="allergens[]" id="allergens" multiple required>
                            <option value="0">geen</option>
                            @foreach($allergens as $allergen)
                                @if($allergen->id == $product->allergen_id)
                                    <option selected value="{{ $allergen->id }}">{{ $allergen->name }}</option>
                                @else
                                    <option value="{{ $allergen->id }}">{{ $allergen->name }}</option>
                                @endif
                            @endforeach
                        </select>
                        <label for="allergens">allergenen</label>
                    </li>
                    <li>
                        <input disabled type="file" name="image" id="image">
                        <label id="imageButtonLabel" for="image">afbeelding</label>
                        <p id="showImageName"></p>
                    </li>
                    <li>
                        <input disabled type="number" name="price" step="0.01" required id="price" value="{{ $product->price }}">
                        <label for="price">prijs</label>
                    </li>
                    <li>
                        <textarea disabled type="text" name="description" id="desc" placeholder="{{ $product->description }}"></textarea>
                        <label for="desc">omschrijving</label>
                    </li>
                    <li class="editSave">
                    <input type="button" class="editProduct" value="edit">
                    <input disabled type="submit" class="saveProduct" value="save">
                    {{-- <input type="button" class="remProduct" value="rem" onclick="remProduct({{ $product->id }}, '{{ $product->name }}')"> --}}
                    </li>
                </ul>
            </form>
            <form class="removeProduct" method="POST", enctype="multipart/form-data", action="{{ route('rem.product.post', ['id' => $product->id]) }}">
                @csrf
                <input type="submit" class="remProduct" value="rem">
            </form>
        </figcaption>
    </div>
    @endforeach
</section>
<hr>
<section id="categorySection" class="container">
    <h2>Categorieën</h2>
    @foreach($categories as $category)
    <div class="categoryView">
        <form method="POST", enctype="multipart/form-data", action="{{ route('edit.category.post', ['id' => $category->id]) }}">
            @csrf
            <ul>
                <li>
                    <input id="naam" name="name" disabled type="text" value="{{$category->name}}">
                    <label for="naam">Categorie naam</label>
                </li>
                <li class="editSave">
                    <input class="editCategories" type="button" value="edit">
                    <input disabled type="submit" value="save">
                </li>
            </ul>
        </form>
        <form method="POST", enctype="multipart/form-data", action="{{ route('rem.category.post', ['id' => $category->id]) }}">
            @csrf
            <input type="submit" value="rem">
        </form>
    </div>
    @endforeach
</section>
<hr>
<section id="allergenSection" class="container">
        <h2>Allergenen</h2>
        @foreach($allergens as $allergen)
        <div class="allergensView">
            <form method="POST", enctype="multipart/form-data", action="{{ route('edit.allergen.post', ['id' => $allergen->id]) }}">
                @csrf
                <ul>
                    <li>
                        <input id="naam" name="name" disabled type="text" value="{{$allergen->name}}">
                        <label for="naam">Allergeen naam</label>

                    </li>
                    <li class="editSave">
                        <input class="editAllergen" type="button" value="edit">
                        <input disabled type="submit" value="save">
                    </li>
                </ul>
            </form>
            <form method="POST", enctype="multipart/form-data", action="{{ route('rem.allergen.post', ['id' => $allergen->id]) }}">
                @csrf
                <input type="submit" value="rem">
            </form>
        </div>
        @endforeach
    </section>
@endsection
