var arabam;!function(i){var e=function(){function i(){this.AnalyticsFilters={view:"CD_Listing_Gorunum",city:"CD_Listing_Filters_Il",town:"CD_Listing_Filters_Ilce",price:"CD_Listing_Filters_Fiyat",minPrice:"CD_Listing_Filters_Fiyat",maxPrice:"CD_Listing_Filters_Fiyat",gear:"CD_Listing_Filters_VitesTipi",year:"CD_Listing_Filters_Yil",minYear:"CD_Listing_Filters_Yil",maxYear:"CD_Listing_Filters_Yil",fuel:"CD_Listing_Filters_YakitTipi",km:"CD_Listing_Filters_Kilometre",minkm:"CD_Listing_Filters_Kilometre",maxkm:"CD_Listing_Filters_Kilometre",bodytype:"CD_Listing_Filters_KasaTipi",color:"CD_Listing_Filters_Renk",searchtext:"CD_Listing_Filters_AnahtarKelime",tag:"CD_Listing_Filters_Ozelilanlar",cc:"CD_Listing_Filters_MotorHacmi",hp:"CD_Listing_Filters_MotorGucu",w:"CD_Listing_Filters_MotorGucu",ruhsat:"CD_Listing_Filters_AracCinsiRuhsat",photo:"CD_Listing_Filters_Fotografliilanlar",swap:"CD_Listing_Filters_TakasaUygun",ustyapi:"CD_Listing_Filters_UstYapi",cekis:"CD_Listing_Filters_Cekis",aracmarkasi:"CD_Listing_Filters_Markalar",aracinmarkasi:"CD_Listing_Filters_Markalar",hisseli:"CD_Listing_Filters_Hisseli",koltuksayisi:"CD_Listing_Filters_KoltukSayisi",membertype:"CD_Listing_Filters_IlanSahibi",motosiklettipi:"CD_Listing_Filters_MotosikletTipi",drive:"CD_Listing_Filters_CekisTipi",powertrain:"CD_Listing_Filters_GucAktarma",cylinder:"CD_Listing_Filters_SilindirSayisi",silindir:"CD_Listing_Filters_SilindirSayisi",cooling:"CD_Listing_Filters_SogutmaSistemi",kmh:"CD_Listing_Filters_Hiz",brands:"CD_Listing_Filters_Brands",status:"CD_Listing_Filters_Durumu",distance:"CD_Listing_Filters_SurusMesafesi",araclabirlikte:"CD_Listing_Filters_AraclaBirlikte",mv:"CD_Listing_Filters_MotorVoltaji",plakasi:"CD_Listing_Filters_Plaka",days:"CD_Listing_Filters_IlanTarihi",eq:"CD_Listing_Filters_Donanim"},this.AnalyticsExcludeFilter=["category","page","currency"],this.RangeFilters=["km","price","year"]}return i.prototype.setDataLayer=function(i,e,r,t,a){var s=window.dataLayer;a?s.push({Category:i,Action:e,Label:r,event:t,nonInteraction:!0}):s.push({Category:i,Action:e,Label:r,event:t})},i.prototype.setDataLayerVp=function(r,t,i){var e=window.dataLayer;if(i){var a=!1;if($(e).each(function(i,e){e.pageView===r&&e.event===t&&(a=!0)}),a)return}e.push({pageView:r,event:t})},i.prototype.sendSearchParameters=function(i){var e=this;this.cleanCustomDimensions();var r=i.filter(function(i){return"category"==i.PropertyName}),t=this.prepareCustomDimensionsForCategories(r);t.map(function(i){e.upsertCustomDimension(i)});var a=i.filter(function(i){return-1==e.AnalyticsExcludeFilter.indexOf(i.PropertyName)});(t=this.prepareCustomDimensionsForFilters(a)).map(function(i){e.upsertCustomDimension(i)}),this.sendRemainingFilterDimensions()},i.prototype.prepareCustomDimensionsForCategories=function(i){for(var e=[],r=0;r<3;r++){var t=i[r];if(t){var a=t.DisplayName.split(" / ");"2. El"==a[0]&&a.splice(0,1);for(var s=0;s<5;s++){var n=a[s];(o={})["CD_Listing_Brand"+(r+1)+"_CategoryLevel_"+(s+1)]=n||"null",e.push(o)}e.push(this.prepareCustomDimensionsBreadCrumbs(t.DisplayName,r))}else{for(s=0;s<5;s++){var o;(o={})["CD_Listing_Brand"+(r+1)+"_CategoryLevel_"+(s+1)]="null",e.push(o)}e.push(this.prepareCustomDimensionsBreadCrumbs("null",r))}}return e},i.prototype.prepareCustomDimensionsBreadCrumbs=function(i,e){var r={};return r["CD_Listing_Brand"+(e+1)+"_Breadcrumb"]=i,r},i.prototype.prepareCustomDimensionsForFilters=function(o){var l=this,_=[];return o.map(function(t){var i=_.filter(function(i){var e=l.AnalyticsFilters[t.PropertyName];return i.hasOwnProperty(e)});if(i&&0==i.length){var e=o.filter(function(i){if(-1<t.PropertyName.indexOf("min")){var e=t.PropertyName.replace("min","max");return t.PropertyName==i.PropertyName||e==i.PropertyName}if(-1<t.PropertyName.indexOf("max")){var r=t.PropertyName.replace("max","min");return t.PropertyName==i.PropertyName||r==i.PropertyName}return t.PropertyName==i.PropertyName});if(e&&0<e.length){var r={},a=l.AnalyticsFilters[t.PropertyName];if(-1<t.PropertyName.indexOf("min")||-1<t.PropertyName.indexOf("max")){var s=e.filter(function(i){return-1<i.PropertyName.indexOf("min")}),n=e.filter(function(i){return-1<i.PropertyName.indexOf("max")});r[a]=(s[0]?s[0].Value:"")+"-"+(n[0]?n[0].Value:"")}else r[a]=e.map(function(i){switch(i.PropertyName){case"city":case"town":case"eq":return i.DisplayName;default:return i.Value}}).join(",");console.debug("range cd",r),_.push(r)}}}),_},i.prototype.cleanCustomDimensions=function(){for(var i in this.AnalyticsFilters)for(var e=window.dataLayer.length;e<=0;e--){var r=window.dataLayer[e];for(var t in r.hasOwnProperty(this.AnalyticsFilters[i])&&window.dataLayer.splice(e,1),r)if(r.hasOwnProperty(t)&&(-1<t.indexOf("CM_ListAdvertCount")||-1<t.indexOf("CD_Listing_ViewType")||-1<t.indexOf("CD_Listing_PageNumber")||-1<t.indexOf("_Breadcrumb")||-1<t.indexOf("_CategoryLevel_"))){window.dataLayer.splice(e,1);break}}},i.prototype.sendNullForEveryCD=function(){for(var i in this.AnalyticsFilters)if(this.AnalyticsFilters.hasOwnProperty(i)){var e={};e[this.AnalyticsFilters[i]]="null",window.dataLayer.push(e)}},i.prototype.upsertCustomDimension=function(i){for(var e=-1,r=0;r<window.dataLayer.length;r++){var t=window.dataLayer[r],a="";for(var s in i)i.hasOwnProperty(s)&&(a=s);t.hasOwnProperty(a)&&(e=r)}-1<e&&window.dataLayer.splice(e,1),window.dataLayer.push(i)},i.prototype.sendRemainingFilterDimensions=function(){var i=this;for(var e in i.AnalyticsFilters)if(i.AnalyticsFilters.hasOwnProperty(e)){for(var r=-1,t=0;t<window.dataLayer.length;t++){var a=window.dataLayer[t],s=i.AnalyticsFilters[e];for(var n in s)s.hasOwnProperty(n)&&n;a.hasOwnProperty(i.AnalyticsFilters[e])&&(r=t)}if(-1==r){var o={};o[i.AnalyticsFilters[e]]="null",window.dataLayer.push(o)}}},i}();i.AnalyticsService=e,angular.module("arabam").service("AnalyticsService",e)}(arabam||(arabam={}));
//# sourceMappingURL=analyticsService.min.js.map