<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Allergens extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
