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
        Schema::create('cakes', function (Blueprint $table) {
            $table->id();
            $table->string('cake_name')->default('');
            $table->double('cake_price')->default(0);
            $table->integer('stock')->default(0);
            $table->string('unit')->default('');
            $table->string('cake_image')->default('');
            $table->dateTime('best_before')->useCurrent();
            $table->string('cake_flavour')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cakes');
    }
};
