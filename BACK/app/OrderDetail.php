<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity'
    ];

    public function order()
    {
        return $this->hasOne(Order::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
