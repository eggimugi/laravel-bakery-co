<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'stockable_type', 'stockable_id',
        'quantity', 'type',
        'reference_type', 'reference_id',
        'note', 'user_id',
    ];

    public function stockable()
    {
        return $this->morphTo();
    }

    public function reference()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
