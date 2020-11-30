<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomersCar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers_cars', function (Blueprint $table) {
            $table->id();


            $table->float('car_price');
            $table->integer('motor_size');
            $table->integer('start_production_year');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('fuel_type_id');
            $table->unsignedBigInteger('gear_box_id');
            $table->unsignedBigInteger('differ_id');

            $table->unsignedBigInteger('ban_id');
            $table->integer('used_km');
            $table->unsignedBigInteger('color_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('car_photo_id');
            $table->unsignedBigInteger('sell_type_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers_cars');
    }
}
