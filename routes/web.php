<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminDashboard;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Front\HomePage;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/back/panel',[AdminDashboard::class,'index']);*/
Route::get('/',[HomePage::class,'index'])->name('front.index');

Route::prefix('back')->middleware('isPanel')->group(function (){
    Route::get('login',[AuthController::class,'index'])->name('login');
    Route::post('login',[AuthController::class,'signin'])->name('signin');
});
Route::prefix('back')->middleware('isLogin')->group(function (){
    Route::get('logout',[AuthController::class,'logout'])->middleware('isLogin')->name('logout');
    Route::resource('/attributes', 'Admin\AttributesController');

    Route::get('panel',[AdminDashboard::class,'index'])->middleware('isLogin')->name('panel');

});

