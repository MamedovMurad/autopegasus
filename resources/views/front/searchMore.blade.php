@extends('front.Layout.master')
@section('content')




<section class="form-custom mt-10">

    <div class="container">
        <form action="Get">
        <div class="row">
          <div class="col-lg-12">
              <h3>Ətraflı axtarış</h3>
              <hr>
          </div>
        </div>
        <div class="row" style="padding:0  40px">
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <p>Marka:</p>
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control " > 
                            <option value="" >Bütün markalar</option>
                            <option value="">Vaz</option>
                            <option value="">Toyota</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6"><p>Şəhərlər:</p></div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px"> 
                            <option value="" >Bütün Şəhərlər</option>
                            <option value="">Bakı</option>
                            <option value="">Sumqayıt</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6"><p>Model:</p></div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px"> 
                            <option value="" >Bütün modellər</option>
                            <option value="">A6</option>
                            <option value="">330</option>
                        </select>
                    </div>
                </div>
            </div>
           
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <p>Yanacaq tipi:</p>
                    </div>
             
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px">
                        <option value="" >Bütün tiplər</option>
                        <option value="">Benzin</option>
                        <option value="">Dizel</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mb-3">
                <div class="row">
                    <div class="col-lg-6">
                       <p> Ban növü:</p>
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px">
                            <option value="" >Bütün tiplər</option>
                            <option value="">Avtobus</option>
                            <option value="">Kupe</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <p>Ötürücü:</p>
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px">
                            <option value="" >Bütün tiplər</option>
                            <option value="">Arxa</option>
                            <option value="">Ön</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <p>Rəng:</p>
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px">
                            <option value="" >Bütün</option>
                            <option value="">Ağ</option>
                            <option value="">Qara</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <p>Sürətlər qutusu</p>
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control " style="padding:0 2px">
                            <option value="" >Mexanika</option>
                            <option value="">Avtomat</option>
                          
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6"><p>Yürüş, km</p></div>
                    <div class="col-lg-3">   <input type="number" class="form-control" placeholder="min."></div>
                    <div class="col-lg-3">  <input type="number" class="form-control" placeholder="max."></div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6"><p>Buraxılış ili</p></div>
                    <div class="col-lg-3">   <input type="number" class="form-control" placeholder="min."></div>
                    <div class="col-lg-3">  <input type="number" class="form-control" placeholder="max."></div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-3"><p>Qiymət</p></div>
                    <div class="col-lg-3">  
                          <select class="form-control"   > 
                        <option value="">| Azn</option>
                        <option value="">Usd</option>
                    
                    </select>
                </div>
                    <div class="col-lg-3">   <input type="number" class="form-control" placeholder="min."></div>
                    <div class="col-lg-3">  <input type="number" class="form-control" placeholder="max."></div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row mb-3">
                    <div class="col-lg-6"><p>Mühərrikin  həcimi, sm <sup>3</sup></p></div>
                    <div class="col-lg-3">   <input type="number" class="form-control" placeholder="min."></div>
                    <div class="col-lg-3">  <input type="number" class="form-control" placeholder="max."></div>
                </div>
            </div>
            <div class="col-lg-6">
                <p class="form-control" >Barter &nbsp; &nbsp;<input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input"></p>
            </div>
            <div class="col-lg-6">
                <p class="form-control" >Kredit &nbsp; &nbsp;<input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input"></p>
               
            </div>
    <div class="col-lg-12"> <hr></div>
      
            <div class="col-lg-12 " style="padding: 20px 0 3px 30px">
                
                <h3>Avtomobilin təchizatı</h3></div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Yüngül lehimli disklər</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; ABS</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Lyuk</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Mərkəzi qapanma</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Park radarı</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Kondisioner</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Yağış sensoru</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Oturacaqların isidilməsi</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Dəri salon</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Ksenon lampalar</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Arxa görüntü kamerası</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Yan pərdələr</p>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="custom-detail mb-3">
                    <p class="form-control" ><input type="checkbox" style="width: 17px;height:17px; margin-top:0px" aria-label="Checkbox for following text input">&nbsp; &nbsp; Oturacaqların ventilyasiyası</p>
                </div>
            </div>

            <div class="col-lg-12 mt-10">
                <h3>Axtarışın nəticələri</h3>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6"><p>Çeşidləmə:</p> </div>
                    <div class="col-lg-6">       
                           <select class="form-control"   > 
                        <option value="">Tarixə görə</option>
                        <option value="">Öncə ucuz</option>
                        <option value="">Öncə bahalı</option>
                        <option value="">Yürüş</option>
                        <option value="">Buraxılış ili</option>
                    
                    </select></div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6"><p>Avtomobilləri göstər:</p> </div>
                    <div class="col-lg-6">       
                           <select class="form-control"   > 
                        <option value="">Bütün</option>
                        <option value="">İşlənmiş</option>
                        <option value="">Yeni</option>
                 
                    
                    </select></div>
                </div>
            </div>
            <div class="col-lg-12 mt-30">
                <button class=" btn btn-block btn-danger" >Axtar</button>
            </div>
        </div>
    </form>
    </div>

</section>









@endsection