<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canton extends Model
{
    use HasFactory;

    protected $table = 'cantones';

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function coordinador()
    {
        return $this->hasOne(Coordinador::class);
    }

}
