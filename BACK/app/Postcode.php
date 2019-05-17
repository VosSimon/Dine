<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postcode extends Model
{
    protected $fillable = [
        'code'
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
