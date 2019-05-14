<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'postcode_id',
        'city_id',
        'address_field'
    ];
}
