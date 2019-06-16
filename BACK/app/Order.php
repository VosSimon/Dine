<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Order extends Model
{

    use Notifiable;

    protected $fillable = [
        'user_id',
        'bruto',
        'netto',
        'pickup'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function orederDetail()
    {
        return $this->belongsTo(OrderDetail::class);
    }
}
