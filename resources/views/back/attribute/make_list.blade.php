@extends('back.layouts.master')
@section('content')
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
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
{{--                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif--}}
                    <div class="col-12">
                        <button type="button" class="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2" data-toggle="modal" data-target="#myModal">
                            <i class="mdi mdi-plus mr-1"></i> Add New Make</button>
                        <!-- Modal insert -->
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="outer-repeater" id="make_add" >
                                            <div data-repeater-list="outer-group" class="outer">
                                                <div data-repeater-item="" class="outer">
                                                    <div class="form-group row mb-4">
                                                        @csrf
                                                        <label for="taskname" class="col-form-label col-lg-6">Make Name</label>
                                                        <div class="col-lg-12">
                                                            <input id="taskname" name="make_name" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row justify-content-start">
                                                <div class="col-lg-4">
                                                    <button type="button" id="make_click" class="btn btn-primary">Create Make</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal insert -->
                     {{--   my modal edit--}}
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <form class="outer-repeater" id="make_add" >
                                            <div data-repeater-list="outer-group" class="outer">
                                                <div data-repeater-item="" class="outer">
                                                    <div class="form-group row mb-4">
                                                        @csrf
                                                        <label for="taskname" class="col-form-label col-lg-6">Make Name</label>
                                                        <div class="col-lg-12">
                                                            <input id="taskname" name="make_name" type="text" class="form-control" placeholder="Enter Make Name...">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row justify-content-start">
                                                <div class="col-lg-4">
                                                    <button type="button" id="make_click" class="btn btn-primary">Create Make</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{--   my modal edit--}}
                        <div class="card">
                            <div class="card-body">
                                <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Make Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($makes as $make)
                                    <tr>
                                        <td>{{$make->make_name}}</td>
                                        <td>
                                            <a href="javascript:void(0);" class="mr-3 text-primary make_id" data-toggle="modal" make_id="{{$make->id}}" data-target="#myModaledit" data-placement="top" title="" data-original-title="Edit"><i class="mdi mdi-pencil font-size-18"></i></a>
                                            <a href="javascript:void(0);" class="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><i class="mdi mdi-close font-size-18"></i></a>
                                        </td>
                                    </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> <!-- end col -->
                </div> <!-- end row -->
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
            // When the user clicks on div, open the popup
            function myFunction() {
                var popup = document.getElementById("myPopup");
                popup.classList.toggle("show");
            }
        </script>
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
    <script>

        $(function (){
            $('.make_id').click(function (){
                $id=$(this)[0].getAttribute('make_id');

            })
        })


    </script>
@endsection
