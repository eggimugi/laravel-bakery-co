<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Composition extends Model
{
    use HasFactory;

    protected $fillable = [
        'cake_id',
        'material_id',
        'quantity',
    ];

    public function cake()
    {
        return $this->belongsTo(Cake::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
