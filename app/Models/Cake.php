<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cake extends Model
{
    use HasFactory;

    protected $fillable = [
        'cake_name',
        'cake_price',
        'stock',
        'unit',
        'cake_image',
        'best_before',
        'cake_flavour',
    ];

    public function compositions()
    {
        return $this->hasMany(Composition::class);
    }

    public function detailOrders()
    {
        return $this->hasMany(DetailOrder::class);
    }
}
