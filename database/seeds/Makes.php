<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Makes extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $make=['Bmw','Audi','Porsche','Hyundai','Opel','Nissan'];
        foreach ($make as $m){
            DB::table('makes')->insert([
                'make_name'=>$m,
                'make_slug'=>$m
            ]);

        }


    }
}
