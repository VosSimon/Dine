<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Allergens extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];
}
