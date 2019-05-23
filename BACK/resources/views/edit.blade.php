@extends('layouts.app')
@section('content')
@if(isset($message))
    <div class="message">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <p id="message">{{ $message }}</p>
    </div>
@endif
<section id="productSection">
    @foreach($products as $index => $product)
    <div class="productView">
        <figure>
            <img src="{{asset('img/'.$product->image)}}">
        </figure>
        <figcaption>
        {{-- <form class="editProductForm" enctype="application/x-www-form-urlencoded" method="POST" action="{{ url('products', ['id' => $product->id]) }}"> --}}
                {{-- @method('put') --}}
                {{-- @csrf --}}
                {{-- {{ Form::create(['method' => 'PUT']) }} --}}
            <form method="POST", enctype="multipart/form-data", action="{{ route('edit.product.post', ['id' => $product->id]) }}">
            {{-- <form action="{{ url('products', ['id' => $product->id]) }}" enctype="application/x-www-form-urlencoded" method="POST"> --}}
            {{-- <input type="hidden" name="_method" value="PUT"> --}}
            {{-- {{method_field('PUT')}} --}}
            <input disabled type="hidden" name="_token" value="{{ csrf_token() }}">
                <ul>
                    <li>
                        <label for="prodName">naam</label><br>
                        <input disabled type="text" name="name" required id="prodName" value="{{ $product->name }}">
                    </li>
                    <li>
                        <label for="catName">categorie naam</label><br>
                        <select disabled name="category_id" id="category" required>
                            @foreach($categories as $category)
                                @if($category->id == $product->category_id)
                                    <option selected value="{{ $category->id }}">{{ $category->name }}</option>
                                @else
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endif
                            @endforeach
                        </select>
                    </li>
                    <li>
                        <label for="allergens">allergenen</label>
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
                    </li>
                    <li>
                        <label for="image">afbeelding</label><br>
                        <input disabled type="file" name="image" id="image">
                    </li>
                    <li>
                        <label for="desc">omschrijving</label><br>
                        <textarea disabled type="text" name="description" id="desc" placeholder="{{ $product->description }}"></textarea>
                    </li>
                    <li>
                        <label for="price">prijs</label><br>
                        <input disabled type="number" name="price" step="0.01" required id="price" value="{{ $product->price }}">
                    </li>
                    <li>
                    <input type="button" class="editProduct" value="edit">
                    <input disabled type="submit" class="saveProduct" value="save">
                    {{-- <input type="button" class="remProduct" value="rem" onclick="remProduct({{ $product->id }}, '{{ $product->name }}')"> --}}
                    </li>
                </ul>
            </form>
            <form method="POST", enctype="multipart/form-data", action="{{ route('rem.product.post', ['id' => $product->id]) }}">
                @csrf
                <input type="submit" class="remProduct" value="rem">
            </form>
        </figcaption>
    </div>
    @endforeach
</section>
<hr>
<section id="categorySection">
    @foreach($categories as $category)
    <form method="POST", enctype="multipart/form-data", action="{{ route('edit.category.post', ['id' => $category->id]) }}">
        @csrf
        <label for="naam">Categorie naam</label>
        <input id="naam" name="name" disabled type="text" value="{{$category->name}}">
        <input class="editCategories" type="button" value="edit">
        <input disabled type="submit" value="save">
    </form>
    <form method="POST", enctype="multipart/form-data", action="{{ route('rem.category.post', ['id' => $category->id]) }}">
        @csrf
        <input type="submit" value="rem">
    </form>
    @endforeach
</section>
<hr>
<section id="allergenSection">
        @foreach($allergens as $allergen)
        <form method="POST", enctype="multipart/form-data", action="{{ route('edit.allergen.post', ['id' => $allergen->id]) }}">
            @csrf
            <label for="naam">Allergeen naam</label>
            <input id="naam" name="name" disabled type="text" value="{{$allergen->name}}">
            <input class="editAllergen" type="button" value="edit">
            <input disabled type="submit" value="save">
        </form>
        <form method="POST", enctype="multipart/form-data", action="{{ route('rem.allergen.post', ['id' => $allergen->id]) }}">
            @csrf
            <input type="submit" value="rem">
        </form>
        @endforeach
    </section>
@endsection
