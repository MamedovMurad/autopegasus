<!doctype html>
<html  lang="tr">


<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Autima - Car Accessories Shop HTML Template </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('css')
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('/front/autima/')}}/assets/img/favicon.ico">


    <script src="https://kit.fontawesome.com/b58e494fbb.js" crossorigin="anonymous"></script>
     <!-- CSS
    ========================= -->
     <!--bootstrap min css-->
     <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/bootstrap.min.css">
    <!--owl carousel min css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/owl.carousel.min.css">
    <!--slick min css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/slick.css">
    <!--magnific popup min css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/magnific-popup.css">
    <!--font awesome css-->

    <!--ionicons min css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/ionicons.min.css">
    <!--animate css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/animate.css">
    <!--jquery ui min css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/jquery-ui.min.css">
    <!--slinky menu css-->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/slinky.menu.css">
    <!-- Plugins CSS -->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/plugins.css">

    <!-- Main Style CSS -->
    <link rel="stylesheet" href="{{asset('/front/autima/')}}/assets/css/style.css">

    <!--modernizr min js here-->
    <script src="{{asset('/front/autima/')}}/assets/js/vendor/modernizr-3.7.1.min.js"></script>




</head>




    <!-- Main Wrapper Start -->
    <!--header area start-->
    <header class="header_area"> {{--
        <!--header top start-->
        <div class="header_top">
            <div class="container">
                <div class="top_inner">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6">
                            <div class="follow_us">
                                <label>Follow Us:</label>
                                <ul class="follow_link">
                                    <li><a href="#"><i class="ion-social-facebook"></i></a></li>
                                    <li><a href="#"><i class="ion-social-twitter"></i></a></li>
                                    <li><a href="#"><i class="ion-social-googleplus"></i></a></li>
                                    <li><a href="#"><i class="ion-social-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="top_right text-right">
                                <ul>
                                    <li class="top_links"><a href="#"><i class="ion-android-person"></i> My Account<i class="ion-ios-arrow-down"></i></a>
                                        <ul class="dropdown_links">
                                            <li><a href="checkout.html">Checkout </a></li>
                                            <li><a href="my-account.html">My Account </a></li>
                                            <li><a href="cart.html">Shopping Cart</a></li>
                                            <li><a href="wishlist.html">Wishlist</a></li>
                                        </ul>
                                    </li>
                                    <li class="language"><a href="#"><img src="{{asset('/front/autima/')}}/assets/img/logo/language.png" alt="">en-gb<i class="ion-ios-arrow-down"></i></a>
                                        <ul class="dropdown_language">
                                            <li><a href="#"><img src="{{asset('/front/autima/')}}/assets/img/logo/language.png" alt=""> English</a></li>
                                            <li><a href="#"><img src="{{asset('/front/autima/')}}/assets/img/logo/language2.png" alt=""> Germany</a></li>
                                        </ul>
                                    </li>
                                    <li class="currency"><a href="#">$ USD<i class="ion-ios-arrow-down"></i></a>
                                        <ul class="dropdown_currency">
                                            <li><a href="#">EUR – Euro</a></li>
                                            <li><a href="#">GBP – British Pound</a></li>
                                            <li><a href="#">INR – India Rupee</a></li>
                                        </ul>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}
        <!--header top start-->

        <!--header bottom satrt-->
        <div class="header_bottom sticky-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="main_menu header_position">
                            <nav>
                                <ul>
                                    <li><a href="javascript:void(0)">TezSat!<img style="width: 11px; margin-left:2px" src="{{asset('/front/autima/')}}/assets/img/auto-logo/icon.png" alt=""></a>
                                        <ul class="sub_menu" style="width:0px !important; padding:8px 3px !important; ">
                                            <li style="padding: 0 10px"><a href="index.html">Təklİf al</a></li>

                                        </ul>
                                    </li>
                                    <li class="mega_items"><a href="javascript:void(0)">AvtomoBİL al<img style="width: 11px; margin-left:2px" src="{{asset('/front/autima/')}}/assets/img/auto-logo/icon.png" alt=""></a>
                                        <div class="mega_menu">
                                            <ul class="mega_menu_inner">
                                                <li><a href="javascript:void(0)">Kateqorİyalar</a>
                                                    <ul>
                                                        <li><a href="shop-fullwidth.html">Avtomobil</a></li>
                                                        <li><a href="shop-fullwidth-list.html">SUV , Ofroader , Pikap</a></li>
                                                        <li><a href="shop-right-sidebar.html">Minivan & Furqon</a></li>
                                                        <li><a href="shop-right-sidebar-list.html">Klassik Avtomobil</a></li>
                                                        <li><a href="shop-list.html">Elektrikli Avtomobil</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="javascript:void(0)">Kuzov Tİpİnə görə</a>
                                                    <ul>
                                                        <li><a href="cart.html">Sedan</a></li>
                                                        <li><a href="wishlist.html">Hetçbek</a></li>
                                                        <li><a href="checkout.html">Universal</a></li>
                                                        <li><a href="my-account.html">Ofroader , Pikap</a></li>
                                                        <li><a href="404.html">Kupe</a></li>
                                                        <li><a href="404.html">Kabriolet</a></li>
                                                        <li><a href="404.html">Van/ Furqon</a></li>
                                                        <li><a href="404.html">Mikroavtobus</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="javascript:void(0)">Bütün elanlar</a>
                                                    <ul>
                                                        <li><a href="product-details.html">Məsləhətli nə var?</a></li>
                                                        <li><a href="product-sidebar.html">Maşınım neçeye gedər?</a></li>
                                                        <li><a href="product-grouped.html">Markalar</a></li>


                                                    </ul>
                                                </li>

                                            </ul>
                                            <div class="banner_static_menu">
                                                <a href="shop.html"><img src="{{asset('/front/autima/')}}/assets/img/auto-logo/banner.png" alt=""></a>
                                            </div>
                                        </div>
                                    </li>
                                    <li><a href="blog.html">Avtomobİl  sat!<img style="width: 11px; margin-left:2px" src="{{asset('/front/autima/')}}/assets/img/auto-logo/icon.png" alt=""></a>
                                        <ul class="sub_menu pages">
                                            <li><a href="blog-details.html">TezSat!</a></li>
                                            <li><a href="blog-fullwidth.html">Maşınım neçəyə gedər?</a></li>

                                        </ul>
                                    </li>
                                    <li><a href="#">XİDMƏTLƏRİMİZ <img style="width: 11px; margin-left:2px" src="{{asset('/front/autima/')}}/assets/img/auto-logo/icon.png" alt=""></a>
                                        <ul class="sub_menu pages">
                                            <li><a href="about.html">100 Nöqtə yoxlanışı</a></li>
                                            <li><a href="about.html">Kredİt</a></li>
                                            <li><a href="about.html">Qİymətləndİrmə</a></li>
                                            <li><a href="about.html">Barter</a></li>
                                            <li><a href="about.html">Bİzİmlə satın</a></li>
                                            <li><a href="about.html">Köhnə avtomobİl İlkİn ödənİş KİMİ</a></li>
                                            <li><a href="about.html">TEST DRİVE <i class="far fa-arrow-alt-circle-up"></i></a></li>


                                        </ul>
                                    </li>


                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!--header bottom end-->



        <!--header middel start-->
        <div class="header_middle">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-6">
                        <div class="logo" style="margin-left: 12px">
                        <a href="{{route('front.index')}}"><img src="{{asset('/front/autima/')}}/assets/img/auto-logo/Logo_Pegasus.png" alt=""></a>
                        </div>
                    </div>
                    <div class="col-lg-9 col-md-6" >
                        <div class="middel_right">
                            <div class="search-container" >
                                <form action="#">
                                    <div class="search_box" style="margin-left: 19%">
                                        <input placeholder="Almaq istədiyiniz modeli axtarın..." type="text">
                                        <button type="submit"><i class="ion-ios-search-strong"></i></button>
                                    </div>
                                </form>
                            </div>
                      {{--       <div class="middel_right_info">

                                <div class="header_wishlist">
                                    <a href="wishlist.html"><span class="lnr lnr-heart"></span> Wish list </a>
                                    <span class="wishlist_quantity">3</span>
                                </div>
                                <div class="mini_cart_wrapper">
                                    <a href="javascript:void(0)"><span class="lnr lnr-cart"></span>My Cart </a>
                                    <span class="cart_quantity">2</span>

                                </div>
                            </div> --}}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--header middel end-->

{{--         <!--mini cart-->
        <div class="mini_cart">
            <div class="cart_close">
                <div class="cart_text">
                    <h3>cart</h3>
                </div>
                <div class="mini_cart_close">
                    <a href="javascript:void(0)"><i class="ion-android-close"></i></a>
                </div>
            </div>
            <div class="cart_item">
                <div class="cart_img">
                    <a href="#"><img src="{{asset('/front/autima/')}}/assets/img/s-product/product.jpg" alt=""></a>
                </div>
                <div class="cart_info">
                    <a href="#">JBL Flip 3 Splasroof Portable Bluetooth 2</a>

                    <span class="quantity">Qty: 1</span>
                    <span class="price_cart">$60.00</span>

                </div>
                <div class="cart_remove">
                    <a href="#"><i class="ion-android-close"></i></a>
                </div>
            </div>
            <div class="cart_item">
                <div class="cart_img">
                    <a href="#"><img src="{{asset('/front/autima/')}}/assets/img/s-product/product2.jpg" alt=""></a>
                </div>
                <div class="cart_info">
                    <a href="#">Koss Porta Pro On Ear Headphones </a>
                    <span class="quantity">Qty: 1</span>
                    <span class="price_cart">$69.00</span>
                </div>
                <div class="cart_remove">
                    <a href="#"><i class="ion-android-close"></i></a>
                </div>
            </div>
            <div class="mini_cart_table">
                <div class="cart_total">
                    <span>Sub total:</span>
                    <span class="price">$138.00</span>
                </div>
                <div class="cart_total mt-10">
                    <span>total:</span>
                    <span class="price">$138.00</span>
                </div>
            </div>

            <div class="mini_cart_footer">
                <div class="cart_button">
                    <a href="cart.html">View cart</a>
                </div>
                <div class="cart_button">
                    <a class="active" href="checkout.html">Checkout</a>
                </div>

            </div>

        </div>
        <!--mini cart end--> --}}

    </header>

<body>
<style>
    .custom-scroll{
        font-family: FontAwesome !important;
        font-size: 20px
    }
</style>
