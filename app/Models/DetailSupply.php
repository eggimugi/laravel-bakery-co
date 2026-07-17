<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailSupply extends Model
{
    use HasFactory;

    protected $fillable = [
        'supply_id',
        'material_id',
        'material_price',
        'quantity',
    ];

    public function supply()
    {
        return $this->belongsTo(Supply::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
