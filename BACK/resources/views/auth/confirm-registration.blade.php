@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Confirm registration') }}</div>

                <div class="card-body">

                        <div class="alert alert-success" role="alert">
                            {{ __('Your account creation is done. Thank you!') }}
                        </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
