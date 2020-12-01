<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class Cars extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('car_name');
            $table->string('car_slug');
            $table->float('car_price');
            $table->float('discount');
            $table->integer('motor_size');

            $table->integer('start_production_year');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('fuel_type_id');
            $table->unsignedBigInteger('gear_box_id');
            $table->unsignedBigInteger('differ_id');
            $table->longText('car_detail');

            $table->unsignedBigInteger('ban_id');
            $table->integer('used_km');
            $table->unsignedBigInteger('color_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('car_photo_id');
            $table->unsignedBigInteger('sell_type_id');
            // many to many for car supply

            $table->foreign('model_id')->references('id')->on('models')->onDelete('cascade');
            $table->foreign('fuel_type_id')->references('id')->on('fuel_types')->onDelete('cascade');
            $table->foreign('gear_box_id')->references('id')->on('gear_boxes')->onDelete('cascade');
            $table->foreign('differ_id')->references('id')->on('differs')->onDelete('cascade');
            $table->foreign('ban_id')->references('id')->on('bans')->onDelete('cascade');
            $table->foreign('color_id')->references('id')->on('car_colors')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
            $table->foreign('car_photo_id')->references('id')->on('car_photos')->onDelete('cascade');
            $table->foreign('sell_type_id')->references('id')->on('sell_types')->onDelete('cascade');










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
        Schema::dropIfExists('cars');
    }
}
