@extends('front.Layout.master')
@section('content')

@section('css')

@endsection

     <!-- CSS
    ========================= -->
     <!--bootstrap min css-->

    <!--owl carousel min css-->

    <!--slick min css-->

    <!--magnific popup min css-->




    <!--modernizr min js here-->
 {{--    <script src="{{asset('/front/autima/')}}/assets/js/vendor/modernizr-3.7.1.min.js"></script> --}}

</head>

<body>


    <!--header area end-->




    <!--breadcrumbs area start-->
    <div class="breadcrumbs_area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb_content">
                        <ul>
                            <li><a href="index.html">home</a></li>

                            <li>Toyota</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--breadcrumbs area end-->

    <!--product details start-->
    <div class="product_details product_sidebar mt-20">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-12">
                    <!--sidebar widget start-->
                    <aside class="sidebar_widget">
                        <div class="widget_inner">

                            <div class="widget_list widget_categories">
                                <h2>..............</h2>
                                <ul>
                                    <li>

                                        <a href="#">.......</a>

                                    </li>


                                </ul>
                            </div>



                        </div>

                    </aside>
                    <!--sidebar widget end-->
                </div>
                <div class="col-lg-9 col-md-12">
                    <div class="product_right_sidebar">
                        <div class="row">
                            <div class="col-lg-8 col-md-6">
                                <div class="product-details-tab">

                                    <div id="img-1" class="zoomWrapper single-zoom">
                                        <a href="#">
                                            <img id="zoom1" src="{{asset('/front/autima/')}}/assets/img/auto-logo/car1.jpg" data-zoom-image="{{asset('/front/autima/')}}/assets/img/auto-logo/car1.jpg" alt="big-1">
                                        </a>
                                    </div>

                                    <div class="single-zoom-thumb">
                                        <ul class="s-tab-zoom owl-carousel single-product-active" id="gallery_01">
                                            <li>
                                                <a href="#" class="elevatezoom-gallery active" data-update="" data-image="{{asset('/front/autima/')}}/assets/img/auto-logo/car1.jpg" data-zoom-image="{{asset('/front/autima/')}}/assets/img/auto-logo/car1.jpg">
                                                    <img src="{{asset('/front/autima/')}}/assets/img/auto-logo/car1.jpg" alt="zo-th-1" />
                                                </a>

                                            </li>
                                            <li>
                                                <a href="#" class="elevatezoom-gallery active" data-update="" data-image="{{asset('/front/autima/')}}/assets/img/product/product9.jpg" data-zoom-image="{{asset('/front/autima/')}}/assets/img/product/product9.jpg">
                                                    <img src="{{asset('/front/autima/')}}/assets/img/product/product9.jpg" alt="zo-th-1" />
                                                </a>

                                            </li>

                                          {{--   <li>
                                                <a href="#" class="elevatezoom-gallery active" data-update="" data-image="assets/img/product/product13.jpg" data-zoom-image="assets/img/product/product13.jpg">
                                                    <img src="assets/img/product/product13.jpg" alt="zo-th-1" />
                                                </a>

                                            </li> --}}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="product_d_right">

                                        <ul>
                                            <li><strong>Şəhər:</strong>  &nbsp; <span>Bakı</span> </li>
                                            <li><strong>Elan tarixi:</strong> &nbsp; <span>05/2020/12</span> </li>
                                            <li><strong>Marka:</strong>&nbsp; <span>Toyota</span> </li>
                                            <li><strong>Model:</strong> &nbsp; <span>Land Cruiser</span> </li>
                                            <li><strong>Buraxılış ili:</strong> &nbsp; <span>2012</span> </li>
                                            <li><strong>Yanacaq tipi:</strong> &nbsp; <span>Benzin</span> </li>
                                            <li><strong>Sürətlər qutusu:</strong>  &nbsp; <span>Avtomat</span></li>
                                            <li><strong>Motorun həcimi:</strong> &nbsp; <span>4.0 L</span> </li>
                                            <li><strong>At gücü:</strong>  &nbsp; <span>282 a.g.</span></li>
                                            <li><strong>Ban növü:</strong>  &nbsp; <span>Offroader / SUV</span></li>
                                            <li><strong>Rəng:</strong>  &nbsp; <span>Qara</span></li>
                                            <li><strong>Yürüş:</strong> &nbsp; <span>124 000 km </span></li>
                                            <li><strong>Ötürücü:</strong> &nbsp; <span>Tam </span></li>
                                            <li><strong>Qiymət</strong> &nbsp; <span>38 900 $</span> </li>
                                            <li><strong>Barter:</strong>&nbsp; <span>bəli</span> </li>
                                        </ul>





                                </div>
                            </div>
                        </div>
                    </div>



                </div>
<div class="col-lg-12">   <!--product info start-->
    <div class="product_d_info sidebar">
        <div class="product_d_inner ">
            <div class="product_info_button">
                <ul class="nav" role="tablist">
                    <li>
                        <a class="active" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Xüsusiyyətlər</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#sheet" role="tab" aria-controls="sheet" aria-selected="false">Detail</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (1)</a>
                    </li>
                </ul>
            </div>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="info" role="tabpanel">
                    <div class="product_info_content">
                        <div class="row">

                            <div class="col-lg-3"><li class="custom-detail"> <span>Yüngül lehimli disklər</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"><span> ABS</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Oturacaqların isidilməsi</span> <i class="fas fa-minus"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Yağış sensoru</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Mərkəzi qapanma</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Yan pərdələr</span> <i class="fas fa-minus"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Oturacaqların ventilyasiyası</span> <i class="fas fa-minus"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"><span> Park radarı </span><i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Kondisioner </span><i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Arxa görüntü kamerası</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"><span>Lyuk</span> <i class="fas fa-check"></i></li></div>
                            <div class="col-lg-3"> <li class="custom-detail"> <span>Dəri salon</span> <i class="fas fa-minus"></i></li></div>




                        </div>
                        </div>
                </div>
                <div class="tab-pane fade" id="sheet" role="tabpanel">
                    <div class="product_d_table">
                        <form action="#">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="first_child">Compositions</td>
                                        <td>Polyester</td>
                                    </tr>
                                    <tr>
                                        <td class="first_child">Styles</td>
                                        <td>Girly</td>
                                    </tr>
                                    <tr>
                                        <td class="first_child">Properties</td>
                                        <td>Short Dress</td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="product_info_content">
                        <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>
                    </div>
                </div>

                <div class="tab-pane fade" id="reviews" role="tabpanel">
                    <div class="reviews_wrapper">
                        <h2>1 review for Donec eu furniture</h2>
                        <div class="reviews_comment_box">
                            <div class="comment_thmb">
                                <img src="{{asset('/front/autima/')}}/assets/img/blog/comment2.jpg" alt="">
                            </div>
                            <div class="comment_text">
                                <div class="reviews_meta">

                                    <p><strong>admin </strong>- September 12, 2018</p>
                                    <span>roadthemes</span>
                                </div>
                            </div>

                        </div>
                        <div class="comment_title">
                            <h2>Add a review </h2>
                            <p>Your email address will not be published. Required fields are marked </p>
                        </div>
                        <div class="product_ratting mb-10">
                            <h3>.......</h3>

                        </div>
                        <div class="product_review_form">
                            <form action="#">
                                <div class="row">
                                    <div class="col-12">
                                        <label for="review_comment">Your review </label>
                                        <textarea name="comment" id="review_comment"></textarea>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <label for="author">Name</label>
                                        <input id="author" type="text">

                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <label for="email">Email </label>
                                        <input id="email" type="text">
                                    </div>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--product info end--></div>
            </div>
        </div>
    </div>
    <!--product details end-->







@section('script')
<script src="{{asset('/front/autima/')}}/assets/js/slinky.menu.js"></script>
<script src="{{asset('/front/autima/')}}/assets/js/owl.carousel.min.js"></script>
<script src="{{asset('/front/autima/')}}/assets/js/vendor/jquery-3.4.1.min.js"></script>
<!--popper min js-->
<script src="{{asset('/front/autima/')}}/assets/js/popper.js"></script>
<!--bootstrap min js-->
<script src="{{asset('/front/autima/')}}/assets/js/bootstrap.min.js"></script>
<script src="{{asset('/front/autima/')}}/assets/js/jquery.ui.js"></script>
<!--jquery elevatezoom min js-->
<script src="{{asset('/front/autima/')}}/assets/js/jquery.elevatezoom.js"></script>
<!--isotope packaged min js-->
<script src="{{asset('/front/autima/')}}/assets/js/isotope.pkgd.min.js"></script>
<script src="{{asset('/front/autima/')}}/assets/js/slick.min.js"></script>
<!--magnific popup min js-->
<script src="{{asset('/front/autima/')}}/assets/js/jquery.magnific-popup.min.js"></script>
<!--jquery countdown min js-->
<script src="{{asset('/front/autima/')}}/assets/js/jquery.countdown.js"></script>
<!--jquery ui min js-->

<!--slinky menu js-->

<!-- Plugins JS -->
<script src="{{asset('/front/autima/')}}/assets/js/plugins.js"></script>

<!-- Main JS -->
<script src="{{asset('/front/autima/')}}/assets/js/main.js"></script>
@endsection








@endsection
