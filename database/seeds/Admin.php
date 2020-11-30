<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Admin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'email'=>'webmaster@avtopegasus.az',
            'password'=>bcrypt(102030)
        ]);
    }
}
