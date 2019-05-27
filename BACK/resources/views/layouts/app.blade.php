<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">



    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav>
            @section("nav")
            <div id="navbar">
                <i id="bars" class="fas fa-bars"></i>
                <h1>Welkom admin {{$username}}</h1>
            </div>
            <ul id="navMenu">
                <li class="{{ (request()->is('add')) ? 'active' : 'not-active' }}"><a href="/add" title="Voeg producten, categorieën en allergenen toe">ADD</a></li>
                <li class="{{ (request()->is('edit')) ? 'active' : 'not-active' }}"><a href="/edit" title="Pas producten, categorieën en allergenen aan of verwijder">EDIT/REM</a></li>
            </ul>
            @show
        </nav>
        <header>
            @yield('header')
        </header>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
