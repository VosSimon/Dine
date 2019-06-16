@extends('layouts.app')


@section('content')
@if(isset($message))
<div class="message {{$code}}">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <p id="message">{{ $message }}</p>
    </div>
@endif
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"></div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                        @if(isset($message))
                    <div class="message {{$code}}">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <p id="message">{{ $message }}</p>
                        </div>
                    @endif
                    You don't have permission to acces that page!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection



