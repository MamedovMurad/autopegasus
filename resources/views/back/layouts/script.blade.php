<!-- JAVASCRIPT -->
{{--<script src="{{asset('admin')}}/assets/libs/jquery/jquery.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/metismenu/metisMenu.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/simplebar/simplebar.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/node-waves/waves.min.js"></script>--}}


<script src="{{asset('admin')}}/assets/libs/jquery/jquery.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/metismenu/metisMenu.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/simplebar/simplebar.min.js"></script>
<script src="{{asset('admin')}}/assets/libs/node-waves/waves.min.js"></script>

<!-- apexcharts -->
<script src="{{asset('admin')}}/assets/libs/apexcharts/apexcharts.min.js"></script>

<script src="{{asset('admin')}}/assets/js/pages/dashboard.init.js"></script>

<!-- App js -->
{{--<script src="{{asset('admin')}}/assets/js/app.js"></script>--}}

@toastr_js
@toastr_render


@yield('script')
