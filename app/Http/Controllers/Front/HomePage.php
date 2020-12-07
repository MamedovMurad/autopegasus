<?php
namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomePage extends Controller
{
    public function index(){
        return view('front.homepage');
    }


    public function moreSearch(){
        return view('front.searchMore');
    }

    public function carDetail(){
        return view('front.carDetail');
    }
}
