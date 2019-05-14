<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'address_id',
        'fname',
        'lname',
        'telephone',
        'birthdate',
        'company',
        'btw'
    ];
}
