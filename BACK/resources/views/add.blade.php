@extends('layouts.app')
@section('content')
@if(isset($message))
<div class="message {{$code}}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        {{ $message }}
    </div>
@endif

<section id="addPage">
    <h1>Toevoegen</h1>
    <h2>Producten</h2>
    <fieldset>
        <legend>Voeg product toe</legend>
        <form method="POST", enctype="multipart/form-data", action="{{ route('add.product.post') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <ul>
                <li class="col-left">
                    <input name="name" id="name" type="text" required>
                    <label for="name">naam</label>
                </li>
                <li class="col-left">
                    <input required name="image" id="image" type="file">
                    <label class="imageButtonLabel" for="image">Afbeelding kiezen</label>
                    <p class="showImageName"></p>
                </li>
                <li class="col-right">
                    <input name="price" id="price" type="number" step="0.01" required>
                    <label for="price">prijs</label>
                </li>
                <li class="col-right">
                    <select name="category_id" id="category" required>
                        <option value="" disabled selected hidden>Selecteer een categorie</option>
                        @if(count($categories) == 0)
                            <option value="0" disabled>Geen categorieën gevonden.</option>
                        @else
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        @endif
                    </select>
                    <label for="category">categorie</label>
                </li>
                <li class="col-right">
                    <select name="allergens[]" id="allergens" multiple required>
                        @if(count($categories) == 0)
                            <option value="0">Geen allergenen gevonden.</option>
                        @else
                            <option value="0" selected>geen</option>
                            @foreach($allergens as $allergen)
                                <option value="{{ $allergen->id }}">{{ $allergen->name }}</option>
                            @endforeach
                        @endif
                    </select>
                    <label for="allergens">allergenen</label>
                </li>
                <li class="col-left">
                    <textarea name="description" id="description"></textarea>
                    <label for="description">omschrijving</label>
                </li>
                <li id="storeProduct">
                    <input type="submit" value="opslaan">
                </li>
            </ul>
        </form>
    </fieldset>

    <h2>Categorieën</h2>
    <fieldset>
        <legend>Voeg categorie toe</legend>
        <form method="POST", enctype="multipart/form-data", action="{{ route('add.category.post') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <ul>
                <li>
                    <input id="name" name="name" type="text" required>
                    <label for="name">naam</label>
                </li>
                <li>
                    <input value="opslaan" type="submit">
                </li>
            </ul>
        </form>
    </fieldset>

    <h2>Allergenen</h2>
    <fieldset>
        <legend>Voeg allergenen toe</legend>
        <form method="POST", enctype="multipart/form-data", action="{{ route('add.allergens.post') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <ul>
                <li>
                    <input id="name" name="name" type="text" required>
                    <label for="name">naam</label>
                </li>
                <li>
                    <input value="opslaan" type="submit">
                </li>
            </ul>
        </form>
    </fieldset>
</section>
@endsection
