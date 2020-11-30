var arabam;
(function (arabam) {
    var AnalyticsService = /** @class */ (function () {
        function AnalyticsService() {
            // facet propertyname -> custom dimension mapping
            this.AnalyticsFilters = {
                "view": "CD_Listing_Gorunum",
                "city": "CD_Listing_Filters_Il",
                "town": "CD_Listing_Filters_Ilce",
                "price": "CD_Listing_Filters_Fiyat",
                "minPrice": "CD_Listing_Filters_Fiyat",
                "maxPrice": "CD_Listing_Filters_Fiyat",
                "gear": "CD_Listing_Filters_VitesTipi",
                "year": "CD_Listing_Filters_Yil",
                "minYear": "CD_Listing_Filters_Yil",
                "maxYear": "CD_Listing_Filters_Yil",
                "fuel": "CD_Listing_Filters_YakitTipi",
                "km": "CD_Listing_Filters_Kilometre",
                "minkm": "CD_Listing_Filters_Kilometre",
                "maxkm": "CD_Listing_Filters_Kilometre",
                "bodytype": "CD_Listing_Filters_KasaTipi",
                "color": "CD_Listing_Filters_Renk",
                //"!!!diger-ozellikler": "CD_Listing_Filters_Digerozellikler",
                "searchtext": "CD_Listing_Filters_AnahtarKelime",
                "tag": "CD_Listing_Filters_Ozelilanlar",
                "cc": "CD_Listing_Filters_MotorHacmi",
                "hp": "CD_Listing_Filters_MotorGucu",
                "w": "CD_Listing_Filters_MotorGucu",
                "ruhsat": "CD_Listing_Filters_AracCinsiRuhsat",
                "photo": "CD_Listing_Filters_Fotografliilanlar",
                "swap": "CD_Listing_Filters_TakasaUygun",
                //"!!!tum-kategoriler": "CD_Listing_Filters_TumKategoriler",
                "ustyapi": "CD_Listing_Filters_UstYapi",
                "cekis": "CD_Listing_Filters_Cekis",
                "aracmarkasi": "CD_Listing_Filters_Markalar",
                "aracinmarkasi": "CD_Listing_Filters_Markalar",
                "hisseli": "CD_Listing_Filters_Hisseli",
                "koltuksayisi": "CD_Listing_Filters_KoltukSayisi",
                //"CD_Listing_Filters_Takasa"
                "membertype": "CD_Listing_Filters_IlanSahibi",
                "motosiklettipi": "CD_Listing_Filters_MotosikletTipi",
                "drive": "CD_Listing_Filters_CekisTipi",
                "powertrain": "CD_Listing_Filters_GucAktarma",
                "cylinder": "CD_Listing_Filters_SilindirSayisi",
                "silindir": "CD_Listing_Filters_SilindirSayisi",
                "cooling": "CD_Listing_Filters_SogutmaSistemi",
                "kmh": "CD_Listing_Filters_Hiz",
                "brands": "CD_Listing_Filters_Brands",
                "status": "CD_Listing_Filters_Durumu",
                "distance": "CD_Listing_Filters_SurusMesafesi",
                "araclabirlikte": "CD_Listing_Filters_AraclaBirlikte",
                "mv": "CD_Listing_Filters_MotorVoltaji",
                "plakasi": "CD_Listing_Filters_Plaka",
                "days": "CD_Listing_Filters_IlanTarihi",
                "eq": "CD_Listing_Filters_Donanim"
            };
            // custom dimension olarak undefined bile olsa gonderilmemesi gerekenler
            this.AnalyticsExcludeFilter = ["category", "page", "currency"];
            // bu filtrelerde min max logicleri var
            this.RangeFilters = ["km", "price", "year"];
        }
        AnalyticsService.prototype.setDataLayer = function (category, action, label, event, nonInteraction) {
            var dl = window.dataLayer;
            if (nonInteraction) {
                dl.push({ Category: category, Action: action, Label: label, event: event, nonInteraction: true });
            }
            else {
                dl.push({ Category: category, Action: action, Label: label, event: event });
            }
        };
        AnalyticsService.prototype.setDataLayerVp = function (pageView, event, isUnique) {
            var dl = window.dataLayer;
            if (isUnique) {
                var exitFunction_1 = false;
                $(dl).each(function (e, x) {
                    if (x.pageView === pageView && x.event === event) {
                        exitFunction_1 = true;
                    }
                });
                if (exitFunction_1) {
                    return;
                }
            }
            dl.push({ 'pageView': pageView, 'event': event });
        };
        /**
         * yeni listeleme eventleri tek yerde gonderiliyor
         * @param selectedFilters
         */
        AnalyticsService.prototype.sendSearchParameters = function (selectedFilters) {
            var _this = this;
            //console.log(selectedFilters);
            this.cleanCustomDimensions();
            //this.sendNullForEveryCD();
            /** kategorileri filtreleyip ayri fonksiyona pasla */
            var categoryFilters = selectedFilters.filter(function (filter) {
                return filter.PropertyName == "category";
            });
            var cds = this.prepareCustomDimensionsForCategories(categoryFilters);
            cds.map(function (dimension) {
                _this.upsertCustomDimension(dimension);
            });
            /** custom dimension olarak gitmemesi gereken veriler var, onlari haric tutup ayri fonksiyona pasla */
            var filteredCategoryFilters = selectedFilters.filter(function (selectedFilter) {
                return _this.AnalyticsExcludeFilter.indexOf(selectedFilter.PropertyName) == -1;
            });
            cds = this.prepareCustomDimensionsForFilters(filteredCategoryFilters);
            cds.map(function (dimension) {
                _this.upsertCustomDimension(dimension);
            });
            this.sendRemainingFilterDimensions();
        };
        /**
         * kategoriler icin custom dimension yollar
         * @param categoryFilters kategoriler
         */
        AnalyticsService.prototype.prepareCustomDimensionsForCategories = function (categoryFilters) {
            var cds = [];
            var categoryCount = 0;
            //secilmemis olsa bile max 3 coklu kategori icin undefined deger yolla
            for (var categoryIndex = 0; categoryIndex < 3; categoryIndex++) {
                var category = categoryFilters[categoryIndex];
                if (category) {
                    var categoryArray = category.DisplayName.split(" / ");
                    if (categoryArray[0] == "2. El")
                        categoryArray.splice(0, 1);
                    // o kadar derine inilmemis de olsa 5 kategori seviyesi icin deger yolla
                    for (var brandIndex = 0; brandIndex < 5; brandIndex++) {
                        var categoryLabel = categoryArray[brandIndex];
                        var label = "CD_Listing_Brand" + (categoryIndex + 1) + "_CategoryLevel_" + (brandIndex + 1);
                        var categoryObject = {};
                        categoryObject[label] = categoryLabel || "null";
                        //console.debug("single category", categoryObject);
                        cds.push(categoryObject);
                    }
                    cds.push(this.prepareCustomDimensionsBreadCrumbs(category.DisplayName, categoryIndex));
                }
                else {
                    for (var brandIndex = 0; brandIndex < 5; brandIndex++) {
                        var label = "CD_Listing_Brand" + (categoryIndex + 1) + "_CategoryLevel_" + (brandIndex + 1);
                        var categoryObject = {};
                        categoryObject[label] = "null";
                        //console.debug("single category", categoryObject);
                        cds.push(categoryObject);
                    }
                    cds.push(this.prepareCustomDimensionsBreadCrumbs("null", categoryIndex));
                }
            }
            return cds;
        };
        AnalyticsService.prototype.prepareCustomDimensionsBreadCrumbs = function (breadcrumb, index) {
            var breadcrumbObject = {};
            var label = "CD_Listing_Brand" + (index + 1) + "_Breadcrumb";
            breadcrumbObject[label] = breadcrumb;
            return breadcrumbObject;
        };
        /**
         * facetler icin custom dimension yollar
         * @param selectedFilters facetler
         */
        AnalyticsService.prototype.prepareCustomDimensionsForFilters = function (selectedFilters) {
            var _this = this;
            var cds = [];
            selectedFilters.map(function (filter) {
                // daha once eklenmis mi bak
                var existingCds = cds.filter(function (cd) {
                    var label = _this.AnalyticsFilters[filter.PropertyName];
                    return cd.hasOwnProperty(label);
                });
                // eklenmemisse hepsini cek ekle
                if (existingCds && existingCds.length == 0) {
                    var allOfThisType = selectedFilters.filter(function (filter2) {
                        // min, max iceren facetlerde farkli davranmak gerek
                        if (filter.PropertyName.indexOf("min") > -1) {
                            var maxLabel = filter.PropertyName.replace("min", "max");
                            return filter.PropertyName == filter2.PropertyName || maxLabel == filter2.PropertyName;
                        }
                        else if (filter.PropertyName.indexOf("max") > -1) {
                            var minLabel = filter.PropertyName.replace("max", "min");
                            return filter.PropertyName == filter2.PropertyName || minLabel == filter2.PropertyName;
                        }
                        else
                            return filter.PropertyName == filter2.PropertyName;
                    });
                    if (allOfThisType && allOfThisType.length > 0) {
                        var cdObject = {};
                        var labelValue = _this.AnalyticsFilters[filter.PropertyName];
                        if (filter.PropertyName.indexOf("min") > -1 || filter.PropertyName.indexOf("max") > -1) {
                            var minFilter = allOfThisType.filter(function (typeFilter) {
                                return typeFilter.PropertyName.indexOf("min") > -1;
                            });
                            var maxFilter = allOfThisType.filter(function (typeFilter) {
                                return typeFilter.PropertyName.indexOf("max") > -1;
                            });
                            cdObject[labelValue] = (minFilter[0] ? minFilter[0].Value : '') + "-" + (maxFilter[0] ? maxFilter[0].Value : '');
                        }
                        else {
                            cdObject[labelValue] = allOfThisType.map(function (typeFilter) {
                                switch (typeFilter.PropertyName) {
                                    case "city":
                                    case "town":
                                    case "eq":
                                        return typeFilter.DisplayName;
                                    default:
                                        return typeFilter.Value;
                                }
                            }).join(",");
                        }
                        console.debug("range cd", cdObject);
                        cds.push(cdObject);
                    }
                }
            });
            return cds;
        };
        /** AnalyticsFilters listesindeki tum custom dimensionları temizler */
        AnalyticsService.prototype.cleanCustomDimensions = function () {
            for (var property in this.AnalyticsFilters) {
                for (var index = window.dataLayer.length; index <= 0; index--) {
                    var element = window.dataLayer[index];
                    if (element.hasOwnProperty(this.AnalyticsFilters[property])) {
                        window.dataLayer.splice(index, 1);
                    }
                    for (var prop in element) {
                        if (element.hasOwnProperty(prop) &&
                            (prop.indexOf("CM_ListAdvertCount") > -1 ||
                                prop.indexOf("CD_Listing_ViewType") > -1 ||
                                prop.indexOf("CD_Listing_PageNumber") > -1 ||
                                prop.indexOf("_Breadcrumb") > -1 ||
                                prop.indexOf("_CategoryLevel_") > -1)) {
                            window.dataLayer.splice(index, 1);
                            break;
                        }
                    }
                }
            }
        };
        AnalyticsService.prototype.sendNullForEveryCD = function () {
            for (var property in this.AnalyticsFilters) {
                if (this.AnalyticsFilters.hasOwnProperty(property)) {
                    var obj = {};
                    obj[this.AnalyticsFilters[property]] = "null";
                    window.dataLayer.push(obj);
                }
            }
        };
        /**
         * varsa gunceller yoksa ekler, varsa guncelelr kismi cogunlukla kategoriler icin
         **/
        AnalyticsService.prototype.upsertCustomDimension = function (dimension) {
            var found = -1;
            for (var index = 0; index < window.dataLayer.length; index++) {
                var cd = window.dataLayer[index];
                var dimensionLabel = "";
                for (var property in dimension) {
                    if (dimension.hasOwnProperty(property)) {
                        dimensionLabel = property;
                    }
                }
                if (cd.hasOwnProperty(dimensionLabel)) {
                    found = index;
                }
            }
            if (found > -1) {
                window.dataLayer.splice(found, 1);
                window.dataLayer.push(dimension);
            }
            else {
                window.dataLayer.push(dimension);
            }
        };
        AnalyticsService.prototype.sendRemainingFilterDimensions = function () {
            var self = this;
            for (var prop in self.AnalyticsFilters) {
                if (self.AnalyticsFilters.hasOwnProperty(prop)) {
                    var found = -1;
                    for (var index = 0; index < window.dataLayer.length; index++) {
                        var cd = window.dataLayer[index];
                        var dimensionLabel = "";
                        var dimension = self.AnalyticsFilters[prop];
                        for (var property in dimension) {
                            if (dimension.hasOwnProperty(property)) {
                                dimensionLabel = property;
                            }
                        }
                        if (cd.hasOwnProperty(self.AnalyticsFilters[prop])) {
                            found = index;
                        }
                    }
                    if (found == -1) {
                        var tempObject = {};
                        tempObject[self.AnalyticsFilters[prop]] = "null";
                        window.dataLayer.push(tempObject);
                    }
                }
            }
        };
        return AnalyticsService;
    }());
    arabam.AnalyticsService = AnalyticsService;
    angular.module("arabam").service("AnalyticsService", AnalyticsService);
})(arabam || (arabam = {}));
