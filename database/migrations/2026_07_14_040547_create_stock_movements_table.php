<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->morphs('stockable');
            $table->integer('quantity');
            $table->string('type');
            $table->nullableMorphs('reference');
            $table->text('note')->nullable();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->timestamps();

            $table->index(['stockable_type', 'stockable_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
