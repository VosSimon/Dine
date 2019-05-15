<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Profiler\Profile;

class Address extends Model
{
    protected $fillable = [
        'postcode_id',
        'city_id',
        'address_field'
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function postcode()
    {
        return $this->hasOne(Postcode::class);
    }

    public function city()
    {
        return $this->hasOne(City::class);
    }
}
