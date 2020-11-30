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
            $table->string('mark_name');
            $table->string('model_name');
            $table->string('fuel_type');
            $table->string('gear_box');
            $table->string('differ');
            $table->string('detail');   
            $table->string('ban');
            $table->integer('used_km');
            $table->string('color');
            $table->string('city');
           $table->unsignedBigInteger('customer_car_img_id');
            $table->string('sell_type');
            $table->foreign('customer_car_img_id')->references('id')->on('customer_car_imgs')->onDelete('cascade');
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
