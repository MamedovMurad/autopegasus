@extends('back.layouts.master')
@section('content')

    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0 font-size-18">Cars Makes</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Utility</a></li>
                                    <li class="breadcrumb-item active">Starter Page</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Create New Make</h4>
                                <form class="outer-repeater" id="make_add" >
                                    <div data-repeater-list="outer-group" class="outer">
                                        <div data-repeater-item="" class="outer">
                                            <div class="form-group row mb-4">
                                                @csrf
                                                <label for="taskname" class="col-form-label col-lg-2">Make Name</label>
                                                <div class="col-lg-6">
                                                    <input id="taskname" name="make_name" type="text" class="form-control" placeholder="Enter Make Name...">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row justify-content-end">
                                        <div class="col-lg-10">
                                            <button type="button" id="make_click" class="btn btn-primary">Create Make</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
    @endsection
    @section('style')
        <!-- DataTables -->
            <link href="{{asset('admin')}}/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
            <link href="{{asset('admin')}}/assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
            <!-- Responsive datatable examples -->
            <link href="{{asset('admin')}}/assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    @endsection
    @section('script')
        <!-- Required datatable js -->
            <script src="{{asset('admin')}}/assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
            <!-- Buttons examples -->
            <script src="{{asset('admin')}}/assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/jszip/jszip.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/pdfmake/build/pdfmake.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/pdfmake/build/vfs_fonts.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-buttons/js/buttons.print.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-buttons/js/buttons.colVis.min.js"></script>
            <!-- Responsive examples -->
            <script src="{{asset('admin')}}/assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
            <script src="{{asset('admin')}}/assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
            <!-- Datatable init js -->
            <script src="{{asset('admin')}}/assets/js/pages/datatables.init.js"></script>
            <script>


                $( document ).ready(function() {
  var button = document.querySelector('#make_click')
button.addEventListener('click', function (e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url: "{{route('attributes.store')}}",
      //  url:'http://127.0.0.1:8000/back/attributes',
        data:$('#make_add').serialize(),
        success:function (e){

        }

    });
})


                });

            </script>


@endsection
