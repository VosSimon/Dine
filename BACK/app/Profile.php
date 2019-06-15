<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'fname',
        'lname',
        'telephone',
        'birth_date',
        'company',
        'btw',
        'postcode'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

}
