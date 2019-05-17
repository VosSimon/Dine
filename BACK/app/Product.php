<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'name',
        'image',
        'price',
        'description'
    ];

    public function category()
    {
        return $this->hasOne(Category::class);
    }

    public function allergens()
    {
        return $this->belongsToMany(Allergen::class)->withTimestamps();
    }
}
