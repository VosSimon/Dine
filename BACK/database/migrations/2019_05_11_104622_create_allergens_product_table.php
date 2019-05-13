<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAllergensProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('allergens_product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('allergens_id');
            $table->unsignedBigInteger('product_id');
            $table->timestamps();

            $table->foreign('allergens_id')
            ->references('id')
            ->on('allergens')
            ->onDelete('cascade');

            $table->foreign('product_id')
            ->references('id')
            ->on('products')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('allergens_product');
    }
}
