@extends('layouts.app')
@section('content')
@if(isset($message))
    <div class="message">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        {{ '$message' }}
    </div>
@endif
<fieldset>
    <legend>product</legend>
    <form method="POST", enctype="multipart/form-data", action="{{ route('add.product.post') }}">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <ul>
            <li>
                <label for="name">naam</label>
                <input name="name" id="name" type="text" required>
            </li>
            <li>
                <label for="price">prijs</label>
                <input name="price" id="price" type="number" step="0.01" required>
            </li>
            <li>
                <label for="description">omschrijving</label>
                <textarea name="description" id="description"></textarea>
            </li>
            <li>
                <label for="image">afbeelding</label>
                <input name="image" id="image" type="file">
            </li>
            <li>
                <label for="category">categorie</label>
                <select name="category_id" id="category" required>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endforeach
                </select>
            </li>
            <li>
                <label for="allergens">allergenen</label>
                <select name="allergens[]" id="allergens" multiple required>
                    <option value="0" selected>geen</option>
                    @foreach($allergens as $allergen)
                        <option value="{{ $allergen->id }}">{{ $allergen->name }}</option>
                    @endforeach
                </select>
            </li>
            <li>
                <input type="submit" value="opslaan">
            </li>
        </ul>
    </form>
</fieldset>
<fieldset>
    <legend>categorie</legend>
    <form method="POST", enctype="multipart/form-data", action="{{ route('add.category.post') }}">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <label for="name">naam</label>
        <input id="name" name="name" type="text" required>
        <input value="opslaan" type="submit">
    </form>
</fieldset>
<fieldset>
    <legend>allergenen</legend>
    <form method="POST", enctype="multipart/form-data", action="{{ route('add.allergens.post') }}">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <label for="name">naam</label>
        <input id="name" name="name" type="text" required>
        <input value="opslaan" type="submit">
    </form>
</fieldset>
@endsection
