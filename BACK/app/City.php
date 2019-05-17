<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'city'
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
