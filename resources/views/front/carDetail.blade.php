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
    <script src="{{asset('/front/autima/')}}/assets/js/vendor/modernizr-3.7.1.min.js"></script>

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

                            <li>product sidebar</li>
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
                                <h2>categories</h2>
                                <ul>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Categories1 (6)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Categories2(10)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Categories3 (4)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Categories4(10)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Categories5(8)</a>
                                        <span class="checkmark"></span>
                                    </li>

                                </ul>
                            </div>

                            <div class="widget_list widget_categories">
                                <h2>Manufacturer</h2>
                                <ul>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Brake Parts(6)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Accessories (10)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Engine Parts (4)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">hermes(10)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">louis vuitton(8)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">Tommy Hilfiger(7)</a>
                                        <span class="checkmark"></span>
                                    </li>
                                    <li>
                                        <input type="checkbox">
                                        <a href="#">House Plants(6)</a>
                                        <span class="checkmark"></span>
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
                            <div class="col-lg-6 col-md-6">
                                <div class="product-details-tab">

                                    <div id="img-1" class="zoomWrapper single-zoom">
                                        <a href="#">
                                            <img id="zoom1" src="{{asset('/front/autima/')}}/assets/img/product/product15.jpg" data-zoom-image="{{asset('/front/autima/')}}/assets/img/product/product15.jpg" alt="big-1">
                                        </a>
                                    </div>

                                    <div class="single-zoom-thumb">
                                        <ul class="s-tab-zoom owl-carousel single-product-active" id="gallery_01">
                                            <li>
                                                <a href="#" class="elevatezoom-gallery active" data-update="" data-image="{{asset('/front/autima/')}}/assets/img/product/product8.jpg" data-zoom-image="{{asset('/front/autima/')}}/assets/img/product/product8.jpg">
                                                    <img src="{{asset('/front/autima/')}}/assets/img/product/product8.jpg" alt="zo-th-1" />
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
                            <div class="col-lg-6 col-md-6">
                                <div class="product_d_right">
                                    <form action="#">

                                        <h1>Nonstick Dishwasher PFOA</h1>


                                        <div class="product_desc">
                                            <p>eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in </p>
                                        </div>



                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                    <!--product info start-->
                    <div class="product_d_info sidebar">
                        <div class="product_d_inner ">
                            <div class="product_info_button">
                                <ul class="nav" role="tablist">
                                    <li>
                                        <a class="active" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Description</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#sheet" role="tab" aria-controls="sheet" aria-selected="false">Specification</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (1)</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="info" role="tabpanel">
                                    <div class="product_info_content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
                                        <p>Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget.</p>
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
                                                    <div class="star_rating">
                                                        <ul>
                                                            <li><a href="#"><i class="ion-ios-star"></i></a></li>
                                                            <li><a href="#"><i class="ion-ios-star"></i></a></li>
                                                            <li><a href="#"><i class="ion-ios-star"></i></a></li>
                                                            <li><a href="#"><i class="ion-ios-star"></i></a></li>
                                                            <li><a href="#"><i class="ion-ios-star"></i></a></li>
                                                        </ul>
                                                    </div>
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
                                            <h3>Your rating</h3>
                                            <ul>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                            </ul>
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
                    <!--product info end-->


                </div>

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
