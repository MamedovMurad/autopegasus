var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var arabam;
(function (arabam) {
    var LocationBase = /** @class */ (function () {
        function LocationBase() {
        }
        return LocationBase;
    }());
    arabam.LocationBase = LocationBase;
    var ChildLocation = /** @class */ (function (_super) {
        __extends(ChildLocation, _super);
        function ChildLocation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChildLocation;
    }(LocationBase));
    arabam.ChildLocation = ChildLocation;
    var SearchControllerBase = /** @class */ (function () {
        function SearchControllerBase($scope, CommonHelperService, DialogService, HttpHelperService, $sce, $compile, $timeout, $rootScope, $filter, CompareService, $location, $window, $q, LastSearchService, SwapOpsService, PrevNextService, ShowHideListingService, SearchService, FavoriteService, AnalyticsService) {
            this.$scope = $scope;
            this.CommonHelperService = CommonHelperService;
            this.DialogService = DialogService;
            this.HttpHelperService = HttpHelperService;
            this.$sce = $sce;
            this.$compile = $compile;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.$filter = $filter;
            this.CompareService = CompareService;
            this.$location = $location;
            this.$window = $window;
            this.$q = $q;
            this.LastSearchService = LastSearchService;
            this.SwapOpsService = SwapOpsService;
            this.PrevNextService = PrevNextService;
            this.ShowHideListingService = ShowHideListingService;
            this.SearchService = SearchService;
            this.FavoriteService = FavoriteService;
            this.AnalyticsService = AnalyticsService;
            this.selectedFilterLimit = 99;
            this.showFilterPopup = false;
            this.showFilterPopupDetail = false;
            this.firmDetailPage = window.location.pathname.indexOf("/galeri") == 0;
            this.isUserLoggedIn = this.$rootScope.Properties.IsUserLoggedIn;
            this.isEmailRequired = this.$rootScope.Properties.IsEmailRequired;
            this.oneclick = false;
            this.cities = {};
            this.towns = {};
            this.crumbToggleWrapper = {};
            this.showSubIlText = "İl";
            this.showSubIlceText = "İlçe";
            this.dirtyCalc = !0;
            this.active = 0;
            this.dirtyCalcTown = !0;
            this.activeTown = 0;
            this.saveSearchObj = {};
            this.comparables = [];
            this.dcomparables = [];
            this.compareAvailable = true;
            this.showSearchLoading = false;
            this.activeCategories = [];
            this.keywordSearchValue = [];
            this.showHideAvailable = false;
            this.favoriteAvailable = false;
            this.shellAdImpression = false;
            /** radio tipi facetlerin model degelerini tutmasi icin */
            this.radioData = [];
            this.init();
        }
        SearchControllerBase.prototype.init = function () {
            var self = this;
            self.$rootScope.saveQueryResult = false;
            self.bindSegmentifyCallbacks();
            self.bindSegmentifyCallbacksForLessTen();
            document.body.classList.add("background2018");
            window.Collect = window.Collect || null;
            self.hasLocalStorage = !!this.CommonHelperService.storageAvailable("localStorage");
            self.isMobile = self.$rootScope.isMobile;
            self.setPopState(window.location.href);
            self.compareAvailable = self.CompareService.init();
            if (self.compareAvailable) {
                self.comparables = self.CompareService.getCarList();
                self.prepareCompareListForSearch(self.CompareService.getCarList());
            }
            self.showHideAvailable = self.ShowHideListingService.init();
            self.selectedFilters = self.selectedFilters || [];
            self.$scope.$on("deleteCarFromCompare", function (ev, args) {
                self.removeFromCompare(args.id);
            });
            // ASD-4286 MOBIL + DESKTOP
            // hizli gezinmede kaldigi yerden devam etmiyor
            var scrollAdvertId = !!localStorage && localStorage.getItem("scrollOnPageChangeByAdvertId");
            if (!!scrollAdvertId) {
                localStorage.removeItem("scrollOnPageChangeByAdvertId");
                self.$timeout(function () {
                    self.scrollIntoView(scrollAdvertId);
                }, 170);
            }
            self.favoriteAvailable = self.FavoriteService.init();
            self.ecommerceDataLayer();
        };
        /*Search*/
        SearchControllerBase.prototype.quickSearch = function () {
            if (this.keyword) {
                // this.AnalyticsService.setDataLayer("AdvertNotFound", "Arama", this.keyword, "gaEvent", true);
                window.location.href = "/ikinci-el?searchText=" + this.keyword.replace(/ /g, "+");
            }
        };
        SearchControllerBase.prototype.search = function (url, $event) {
            var self = this;
            var d = self.$q.defer();
            this.showSearchLoading = true;
            if ($event) {
                $event.preventDefault();
                if ($event.ctrlKey && url) {
                    window.open(url, "_blank");
                    return;
                }
            }
            this.SearchService.searchAndGetHtml(url)
                .then(function (res) {
                self.setHtml(res);
                self.setTitle(res, url);
                self.setPopState(url);
                self.refreshDfpAdverts();
                self.showSearchLoading = false;
                self.$window.smartAppBanner = url;
                d.resolve();
            })
                .catch(function (error) {
                self.DialogService.warning({
                    error: "Bir hata oluştu, lütfen tekrar deneyiniz"
                });
                self.showSearchLoading = false;
                d.reject();
            });
            return d.promise;
        };
        /**
         * diger searchten tek farki yukari scroll ediyor
         * @param url
         * @param
         */
        SearchControllerBase.prototype.searchFromPaging = function (url, $event) {
            var _this = this;
            var self = this;
            this.showSearchLoading = true;
            if ($event) {
                $event.preventDefault();
                if ($event.ctrlKey && url) {
                    window.open(url, "_blank");
                    return;
                }
            }
            this.SearchService.searchAndGetHtml(url)
                .then(function (res) {
                _this.setHtml(res);
                _this.setTitle(res, url);
                _this.setPopState(url);
                _this.refreshDfpAdverts();
                _this.showSearchLoading = false;
                _this.$window.smartAppBanner = url;
                $("html,body").animate({ scrollTop: $("body").offset().top }, 400);
            })
                .catch(function (error) {
                _this.DialogService.warning({
                    error: "Bir hata oluştu, lütfen tekrar deneyiniz"
                });
                _this.showSearchLoading = false;
            });
        };
        /**
         * kategori facetindeki a taglerinin callbacki
         * @param url aranacak url
         * @param event event
         * @param categoryData mobil facetlerde sayfayi refreshlemeden yapilacak searchlerde selectedfilters kutusunu guncellemek icin
         */
        SearchControllerBase.prototype.searchCategory = function (url, $event) {
            if ($event) {
                $event.preventDefault();
            }
            this.search(url, $event).then(function () {
                window.segProducts();
            });
        };
        SearchControllerBase.prototype.searchForms = function ($event) {
            var self = this;
            if ($event) {
                $event.preventDefault();
            }
            if (!!this.keywordSearchValue) {
                this.keywordSearchCallback();
            }
            var url = this.SearchService.prepareSearchUrl(this.selectedFilters);
            this.search(url, $event).then(function () {
                window.segProducts();
                setTimeout(function () {
                    self.scrollTopOfElementIntoViewport(".selected-filters-wrapper");
                }, 100);
            });
        };
        /**
         * facetler uzerinden tetiklenen search
         * @param el
         * @param preventSearch range tipi inputlarda blur aninda tetiklenmemesi gerekiyor
         */
        SearchControllerBase.prototype.searchElement = function (el, preventSearch) {
            if (preventSearch === void 0) { preventSearch = false; }
            if (!el) {
                return;
            }
            el = el.target;
            var filter = this.getFilter(el);
            filter.Modified = true;
            if (el.type.toLowerCase() == "checkbox") {
                this.setInputElement(el, filter);
            }
            else {
                this.setTextElement(el, filter);
            }
            if (this.oneclick && !preventSearch) {
                this.searchForms(null);
            }
        };
        SearchControllerBase.prototype.setInputElement = function (el, filter) {
            // const existingIndex = this.CommonHelperService.findInArray(this.selectedFilters, "PropertyName", filter.PropertyName);
            if (el.checked) {
                this.selectedFilters.push(filter);
            }
            else {
                this.removeFilter(filter, false);
            }
            // if (this.oneclick)
            //    this.searchForms(null);
        };
        /**
         * text tipi bir inputu selectedFilters içine ekler
         * @param el input element
         * @param filter filter
         */
        SearchControllerBase.prototype.setTextElement = function (el, filter) {
            var index = this.CommonHelperService.findInArray(this.selectedFilters, "PropertyName", el.name);
            if (index > -1) {
                // inputun ici bosaltilmissa kaldir
                if (filter.Value.length == 0 || filter.Value == "0") {
                    this.selectedFilters.splice(index, 1);
                }
                else {
                    this.selectedFilters[index] = filter;
                    this.selectedFilters[index].Value = el.getAttribute("data-checkModelVal")
                        ? el.attributes["data-checkModelVal"].value
                        : el.value;
                    this.selectedFilters[index].Text = this.CommonHelperService.toFriendlyUrl(el.value);
                }
            }
            else {
                // inputun ici bossa ekleme
                if (filter.Value && filter.Value.length > 0 && (filter.Value != 0 || filter.PropertyName == "maxkm")) {
                    this.selectedFilters.push(filter);
                }
            }
        };
        SearchControllerBase.prototype.getFilter = function (el) {
            return {
                Name: el.getAttribute("data-facetname") ? el.attributes["data-facetname"].value : el.name,
                PropertyName: el.name,
                IsUrlFilter: !!el.getAttribute("data-urlfacet") && el.getAttribute("data-urlfacet").toLowerCase() === "true",
                Value: el.getAttribute("data-checkModelVal") ? el.attributes["data-checkModelVal"].value : el.value,
                Text: this.CommonHelperService.toFriendlyUrl(el.value),
                DisplayName: el.getAttribute("data-displayname") ? el.attributes["data-displayname"].value : el.value,
                HideFilter: el.getAttribute("data-hidefilter") ? el.attributes["data-hidefilter"].value : true
            };
        };
        /**
         * ilce inputunda secimleri kaldir butonununun gosterilmesi icin kullaniliyor
         * @param citySlug
         */
        SearchControllerBase.prototype.isTownSetInCity = function (citySlug) {
            var self = this;
            var result = false;
            // townlari ayikla
            var towns = this.selectedFilters.filter(function (filter) { return filter.PropertyName == "town"; });
            var citiesWithTownSelected = [];
            // townsavailable icinden parentname yani sehir slugina ulas
            towns.map(function (selectedFilter) {
                citiesWithTownSelected = citiesWithTownSelected.concat(self.townsAvailable.filter(function (town) { return town.Value == selectedFilter.Value; }).map(function (filtered) { return filtered.ParentName; }));
            });
            // parametre olarak verilen key bu sehirler icinde mi?
            result = citiesWithTownSelected.filter(function (slug) { return slug == citySlug; }).length > 0 ? true : false;
            return result;
        };
        /**
         * ilce inputunu temizler
         * @param citySlug
         */
        SearchControllerBase.prototype.clearTownsOfCity = function (citySlug) {
            var self = this;
            console.log(citySlug, this.selectedFilters, this.townsAvailable);
            // sehrin tum townlarini ayikla
            var townsToRemove = this.townsAvailable.filter(function (town) {
                if (town.ParentName == citySlug && town.Selected) {
                    town.Selected = false;
                    return town;
                }
            });
            townsToRemove.map(function (town) {
                var indexInSelectedFilters = self.CommonHelperService.findInArray(self.selectedFilters, "Value", "" + town.Value);
                self.selectedFilters.splice(indexInSelectedFilters, 1);
                town.Selected = false;
            });
            self.searchForms(null);
        };
        SearchControllerBase.prototype.clearAll = function (preventSearch) {
            if (preventSearch === void 0) { preventSearch = false; }
            this.removeFilters();
            if (!preventSearch) {
                this.searchForms(null);
            }
        };
        SearchControllerBase.prototype.addFilter = function (filter) {
            this.selectedFilters.push(filter);
        };
        SearchControllerBase.prototype.removeFilter = function (filter, executeSearch, shouldSendEvent) {
            if (executeSearch === void 0) { executeSearch = true; }
            if (shouldSendEvent === void 0) { shouldSendEvent = false; }
            this.selectedFilters = this.selectedFilters.filter(function (x) {
                return x.Value != filter.Value;
            });
            if (filter.PropertyName.toLocaleLowerCase() == "searchtext")
                this.keywordSearchValue = null;
            if (shouldSendEvent) {
                this.AnalyticsService.setDataLayer("Ilan Listeleme", "Liste ust - Kriter silme", "", "gaEvent", true);
            }
            if (executeSearch) {
                this.searchForms(null);
            }
        };
        SearchControllerBase.prototype.removeFilters = function () {
            var self = this;
            self.selectedFilters.map(function (filter) {
                self[filter.PropertyName] = null;
            });
            self.selectedFilters = [];
            self.keywordSearchValue = null;
        };
        SearchControllerBase.prototype.setPopState = function (url) {
            var _this = this;
            // console.debug("setting pop state from searchbase", url);
            window.onpopstate = function (e) {
                var href = window.location.href.replace(window.location.origin, "");
                url = url.replace(window.location.origin, "");
                if (url && url != href) {
                    if (href.indexOf("/ilan/") > -1) {
                        _this.$window.location.href = href;
                    }
                    else {
                        _this.search(window.location.href, null);
                    }
                }
            };
        };
        SearchControllerBase.prototype.prevNextDataReady = function () {
            var _this = this;
            this.$timeout(function () { return _this.setAdvertList(); }, 0);
        };
        /**
         * ilan detay lightbox için, razordan ilan listesi ng-init ile self.advertlist değişkenine atılıyor
         * bu listenin prevnext servisine iletilmesi için callback gerekli
         * search fonksiyonundan çağırılıyor
         */
        SearchControllerBase.prototype.setAdvertList = function () {
            var self = this;
            self.PrevNextService.adverts = self.advertList;
            self.PrevNextService.currentPage = self.currentPage;
            self.PrevNextService.searchUrl = self.$location.url();
            self.PrevNextService.totalPage = self.totalPage;
            self.PrevNextService.writeLocalStorage();
        };
        SearchControllerBase.prototype.clearAdvertList = function () {
            var self = this;
            self.PrevNextService.adverts = [];
            self.PrevNextService.currentPage = 0;
            self.PrevNextService.totalPage = 0;
            self.PrevNextService.writeLocalStorage();
        };
        SearchControllerBase.prototype.setHtml = function (res, overrideAppendEl, shouldCompile) {
            if (shouldCompile === void 0) { shouldCompile = true; }
            var nakedHtml = this.$sce.trustAsHtml(res);
            var nakedTrustedHtml = this.$sce.valueOf(nakedHtml);
            var searchContainer = $(nakedTrustedHtml).find("#searchContainer");
            if (window.Collect && searchContainer) {
                var collect = searchContainer.find("#collect");
                if (collect && collect.length > 0) {
                    var advertCollection = JSON.parse(collect[0].value);
                    window.Collect.send(advertCollection, "Impression");
                }
            }
            if (searchContainer.length > 0) {
                var $compareTool = $(".compare-tool");
                /** bunu tek satira inline etmek maharet degil */
                var appendEl = "";
                if (overrideAppendEl) {
                    appendEl = $(overrideAppendEl);
                    if (overrideAppendEl != "#searchContainer") {
                        searchContainer = $(searchContainer).find(overrideAppendEl);
                    }
                }
                else {
                    if (this.firmDetailPage) {
                        appendEl = $("#searchContainer");
                    }
                    else if (this.categoryPage ||
                        window.location.pathname.indexOf("ikinci-el") != -1 ||
                        window.location.pathname.indexOf("sifir-km") != -1) {
                        appendEl = $("#searchContainer");
                    }
                    else {
                        $("#wrapper .content");
                    }
                }
                /**
                 * prepend append yerine container icindeki htmli degisitiriyoruz
                 * cunku arama sonuclari genelde en sondaki html elementi olmuyor artik
                 */
                $(appendEl).html("");
                if ($compareTool.length > 0) {
                    // $(searchContainer).insertBefore($compareTool);
                    $(appendEl).html(searchContainer.html());
                }
                else {
                    $(appendEl).html(searchContainer.html());
                }
                this.adverts = window.recommendedAdverts;
                if (shouldCompile) {
                    this.$compile($("#searchContainer"))(this.$scope);
                }
                this.setFooterHtml(res);
                this.callImageLazyLoad();
                this.prepareFacetDataFromAjaxRequest();
                this.prepareFilterDataFromAjaxRequest();
            }
        };
        SearchControllerBase.prototype.setFooterHtml = function (res, shouldCompile) {
            if (shouldCompile === void 0) { shouldCompile = true; }
            var selector = "#dynamic-footer-menu-container";
            var nakedHtml = this.$sce.trustAsHtml(res);
            var nakedTrustedHtml = this.$sce.valueOf(nakedHtml);
            var footerContent = $(nakedTrustedHtml).find(selector);
            $(selector).html(footerContent.html());
            if (shouldCompile) {
                this.$compile($(selector))(this.$scope);
            }
        };
        SearchControllerBase.prototype.refreshDfpAdverts = function () {
            try {
                if (window.googletag && googletag.pubadsReady) {
                    googletag.cmd.push(function () {
                        // googletag.display();
                        googletag.pubads().refresh();
                    });
                }
            }
            catch (error) {
                angular.noop();
            }
        };
        SearchControllerBase.prototype.prepareFacetDataFromAjaxRequest = function () {
            var self = this;
            if (this.isMobile) {
                this.facetData = {};
                // console.log("x", +(new Date()));
                if (window.facets) {
                    window.facets.map(function (facet) {
                        if (facet.FriendlyUrlName == "il") {
                            facet.Items.map(function (facetItem) {
                                facetItem.Value = facetItem.Id;
                            });
                            self.citiesAvailable = facet.Items;
                        }
                        else if (facet.FriendlyUrlName == "donanim") {
                            if (facet.Items) {
                                facet.Items.map(function (item) {
                                    self.facetData[item.FriendlyUrl] = item;
                                });
                            }
                        }
                        self.facetData[facet.FriendlyUrlName] = facet;
                    });
                }
            }
        };
        SearchControllerBase.prototype.prepareFilterDataFromAjaxRequest = function () {
            var self = this;
            if (this.isMobile && window.ajaxFilters) {
                this.selectedFilters = this.selectedFilters.filter(function (filter) { return filter.PropertyName == "category"; });
                window.ajaxFilters.map(function (filter) {
                    if (filter.PropertyName.indexOf("min") > -1 || filter.PropertyName.indexOf("max") > -1) {
                        self[filter.PropertyName] = filter.Value;
                    }
                });
                this.selectedFilters = this.selectedFilters.concat(window.ajaxFilters);
            }
        };
        SearchControllerBase.prototype.scrollIntoView = function (advertId) {
            var element = document.getElementById("listing" + advertId);
            if (!!element) {
                var elemPositionTop = $(element).offset().top;
                var scrollTo_1 = this.isMobile ? elemPositionTop - 65 : elemPositionTop - 10;
                $("html,body").stop().animate({ scrollTop: scrollTo_1 }, 330);
            }
        };
        SearchControllerBase.prototype.setTitle = function (res, url) {
            var titleMatcher = /<title>(.*)<\/title>/g;
            var match = titleMatcher.exec(res);
            var title = document.title;
            if (match && match.length > 0) {
                title = match[1];
                document.title = title;
            }
            url = this.ensurePath(url);
            var stateUrl = url.indexOf(window.location.origin) == -1
                ? window.location.origin + (this.firmDetailPage ? window.location.pathname : "") + url
                : url;
            if (stateUrl != window.location.href) {
                this.$location.url(url);
                this.$location.replace();
                this.$window.history.pushState({ url: this.$location.absUrl() }, title, this.$location.absUrl());
            }
            if (window.dataLayer) {
                var pageType = this.firmDetailPage ? "Galeri" : "Search Results";
                window.dataLayer.push({
                    event: "virtualPageviewListing",
                    page: self.window.location.pathname,
                    virtualPageURL: self.window.location.pathname,
                    CD_Pagetype: pageType
                });
            }
        };
        /*End Search*/
        /***Utils***/
        SearchControllerBase.prototype.createNewCategoryFacet = function (id) {
            var _this = this;
            this.categoryPage = false;
            this.secondHandSearchPage = true;
            var qs = this.queryString.indexOf("?") > -1 ? this.queryString.substring(1) : this.queryString;
            this.HttpHelperService.httpGet("/search/facets?id=" + id + "&qs=" + encodeURIComponent(this.queryString) + "&" + qs, function (res) {
                var nakedHtml = _this.$sce.trustAsHtml(res);
                var nakedTrustedHtml = _this.$sce.valueOf(nakedHtml);
                var container = $("#ajax-categoryfacet-wrapper");
                $(nakedTrustedHtml).appendTo(container);
                _this.$compile($("#ajax-categoryfacet-wrapper"))(_this.$scope);
                _this.categoryFacetCount = $(".remove-filter-button").length;
            }, function () {
                console.log("error");
                _this.DialogService.warning({
                    error: "Bir hata oluştu lütfen tekrar deneyiniz"
                });
            }, {
                isNotLoading: false
            });
        };
        SearchControllerBase.prototype.callSubmitLater = function ($event) {
            var _this = this;
            $event.preventDefault();
            this.searchElement($event);
            this.$timeout(function () {
                _this.searchForms($event);
            });
        };
        /**
         * anahtar kelime araması için callback, anahtar kelime js değişkeni
         * olarak durduğu için farklı callback gerekliyor
         */
        SearchControllerBase.prototype.keywordSearchEnterCallback = function ($event, removedTag) {
            var _this = this;
            var self = this;
            if (self.keywordSearchValue.length > 10) {
                self.keywordSearchValue.splice(10);
            }
            if ($event) {
                $event.preventDefault();
                $event.target.style.opacity = "0";
                $event.target.value = self.keywordSearchValue;
                $event.target.name = "searchText";
                self.searchElement($event);
            }
            else {
                /** dışardan tetiklerken dummy bir event yollamamız gerekiyor */
                var dummyEvent = {
                    target: document.createElement("input")
                };
                dummyEvent.target.type = "text";
                /** tag kaldirilirken iceriye paramatre olarak gonderiliyor, pluginin kisitlamasi */
                if (removedTag) {
                    self.keywordSearchValue.splice(self.keywordSearchValue.indexOf(removedTag.text), 1);
                }
                dummyEvent.target.value = self.keywordSearchValue ? self.keywordSearchValue : "";
                dummyEvent.target.setAttribute("data-facetname", "Anahtar Kelime");
                dummyEvent.target.name = "searchText";
                dummyEvent.target.setAttribute("data-displayname", dummyEvent.target.value);
                self.searchElement(dummyEvent);
            }
            self.$timeout(function () {
                _this.searchForms($event);
            }, 0);
        };
        /**
         * kelime ile ara facetinde birseyler yazip seperator tuslarina (space, tab, virgul)
         * basilmadan cikildiginda (inputun disina tiklama) model guncellenmiyor, o durumu fixlemek
         * icin callback
         */
        SearchControllerBase.prototype.keywordSearchCallback = function () {
            var dummyEvent = {
                target: document.createElement("input")
            };
            dummyEvent.target.type = "text";
            dummyEvent.target.value = this.keywordSearchValue;
            dummyEvent.target.setAttribute("data-facetname", "Anahtar Kelime");
            dummyEvent.target.name = "searchText";
            dummyEvent.target.setAttribute("data-displayname", dummyEvent.target.value);
            this.searchElement(dummyEvent, true);
        };
        SearchControllerBase.prototype.saveUpdateQuery = function (formData, query, update) {
            var _this = this;
            if (formData.$invalid || !this.isUserLoggedIn) {
                return false;
            }
            var self = this;
            var isPanel = !!(window.location.pathname.indexOf("/panelim/") > -1);
            var reCaptchaCode = $(".g-recaptcha-response").val();
            var newPostObj = {};
            newPostObj = {
                SearchQuery: query,
                NotifyAccepted: !!self.saveSearchObj.NotifyAccepted,
                Name: self.saveSearchObj.Name,
                GRecaptcha: reCaptchaCode
            };
            if (!!self.saveSearchObj.NotifyAccepted && !!self.saveSearchObj.IntervalDay) {
                newPostObj.IntervalDay = self.saveSearchObj.IntervalDay;
            }
            if (self.isEmailRequired && !!self.saveSearchObj.NotifyAccepted && !!self.saveSearchObj.Email) {
                newPostObj.Email = self.saveSearchObj.Email;
            }
            var url = "/favorite/save-search";
            this.HttpHelperService.httpPost(url, newPostObj, function (res) {
                if (res.Success) {
                    _this.DialogService.success({
                        message: "Arama kriteriniz başarı ile kaydedilmiştir"
                    });
                    if (isPanel) {
                        window.location.href = window.location.href;
                    }
                }
                else {
                    _this.DialogService.warning(res.Message);
                }
            });
            return false;
        };
        SearchControllerBase.prototype.searchStringInUrl = function (url, value) {
            var urlArray = url.replace(" ", "-").split("-");
            if (urlArray.indexOf("yetkili") > -1 && urlArray.indexOf("bayiden") > -1 && value.replace(/ /g, "-") == "yetkili-bayiden") {
                return true;
            }
            if (urlArray.indexOf("rent") > -1 &&
                urlArray.indexOf("a") > -1 &&
                urlArray.indexOf("car") > -1 &&
                value.replace(/ /g, "-") == "rent-a-car") {
                return true;
            }
            if (urlArray.indexOf("yari") > -1 && value == "yari-otomatik") {
                return true;
            }
            if (urlArray.indexOf("yari") > -1 && value == "otomatik") {
                return false;
            }
            return urlArray.indexOf(value, 0) > -1;
        };
        SearchControllerBase.prototype.changeView = function (viewType) {
            this.CommonHelperService.setCookie("listingView", viewType, 365);
            return true;
        };
        SearchControllerBase.prototype.changeSort = function (sort) {
            var url = window.location.href;
            if (sort) {
                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
            }
            else {
                url = this.CommonHelperService.removeUrlParameter("sort");
            }
            url = this.CommonHelperService.removeUrlParameter("page", url);
            window.location.href = url;
        };
        SearchControllerBase.prototype.addSort = function (sort, ascSortable, descSortable) {
            if (ascSortable === void 0) { ascSortable = true; }
            if (descSortable === void 0) { descSortable = true; }
            var url = window.location.pathname + window.location.search;
            // sort = sort.toLowerCase();
            if (sort) {
                var existingSort = this.CommonHelperService.getParameterByName("sort");
                if (existingSort) {
                    var sortArray = existingSort.split(".");
                    var sortType = sortArray[sortArray.length - 1];
                    var sortAction = sortArray.splice(0, sortArray.length - 1).join(".");
                    /** farkli bir sort tipine gecmisse */
                    if (sortAction != sort.toLowerCase()) {
                        if (sort == "priceTl") {
                            if (ascSortable) {
                                sort = sort + ".asc";
                                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                            }
                        }
                        else {
                            if (descSortable) {
                                sortType = "desc";
                                sort = sort + "." + sortType;
                                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                            }
                            else if (ascSortable) {
                                sortType = "asc";
                                sort = sort + "." + sortType;
                                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                            }
                            else {
                                url = this.CommonHelperService.removeUrlParameter("sort");
                            }
                        }
                    }
                    else {
                        /** mevcutta desc ise */
                        if (sortType == "desc") {
                            if (ascSortable) {
                                sortType = "asc";
                                sort = sort + "." + sortType;
                                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                            }
                            else {
                                url = this.CommonHelperService.removeUrlParameter("sort");
                            }
                        }
                        else {
                            if (descSortable) {
                                sortType = "desc";
                                sort = sort + "." + sortType;
                                url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                            }
                            else {
                                url = this.CommonHelperService.removeUrlParameter("sort");
                            }
                        }
                    }
                }
                else {
                    /** hic sort yoksa */
                    if (sort == "priceTl") {
                        if (ascSortable) {
                            sort = sort + ".asc";
                            url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                        }
                    }
                    else {
                        if (descSortable) {
                            sort = sort + ".desc";
                            url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                        }
                        else if (ascSortable) {
                            sort = sort + ".asc";
                            url = this.CommonHelperService.updateQueryStringParameter(url, "sort", sort);
                        }
                        else {
                            url = this.CommonHelperService.removeUrlParameter("sort");
                        }
                    }
                }
                this.sorting = sort;
            }
            else {
                url = this.CommonHelperService.removeUrlParameter("sort");
            }
            url = this.CommonHelperService.removeUrlParameter("page", url);
            this.search(url, null);
        };
        SearchControllerBase.prototype.addSortToGa = function (sort) {
            var memType = this.CommonHelperService.getParameterByName("memberType");
            if (!memType) {
                memType = "List Title Sorting";
            }
            var category = this.firmDetailPage ? "Galeri Ilan Listeleme" : "Ilan Listeleme";
            this.AnalyticsService.setDataLayer(category, memType, sort, "gaEvent", true);
        };
        SearchControllerBase.prototype.selectSortClass = function (sort, sortType) {
            var existingSort = this.CommonHelperService.getParameterByName("sort");
            if (!existingSort) {
                if (!sortType) {
                    return "dib";
                }
                return "";
            }
            var sortArray = existingSort.split(".");
            var existingSortType = sortArray[sortArray.length - 1];
            var sortAction = sortArray.splice(0, sortArray.length - 1).join(",");
            if (sortAction.toLowerCase() == sort.toLowerCase()) {
                if (existingSortType == sortType) {
                    return "dib";
                }
                return "";
            }
            return sortType ? "" : "dib";
        };
        SearchControllerBase.prototype.getSortIconClass = function (sort) {
            sort = sort.toLowerCase();
            var existingSort = this.CommonHelperService.getParameterByName("sort");
            if (existingSort) {
                var sortArray = existingSort.split(".");
                var existingSortType = sortArray[0];
                if (existingSortType == sort) {
                    return "color-red2018";
                }
            }
            return "color-grey2";
        };
        SearchControllerBase.prototype.setCurrency = function (currencyRate) {
            if (!currencyRate) {
                currencyRate = "TL";
            }
            this.selectedFilters = this.selectedFilters || [];
            var exists = this.CommonHelperService.findInArray(this.selectedFilters, "PropertyName", "currency");
            if (exists == -1) {
                this.selectedFilters.push({
                    PropertyName: "currency",
                    Value: currencyRate,
                    Text: currencyRate,
                    Name: "Kur"
                });
            }
        };
        SearchControllerBase.prototype.changeCurrency = function (rate) {
            for (var i = 0; i < this.selectedFilters.length; i++) {
                var filter = this.selectedFilters[i];
                if (filter.PropertyName.toLowerCase() == "currency") {
                    this.selectedFilters[i].Value = rate;
                    this.selectedFilters[i].Text = rate;
                }
            }
        };
        SearchControllerBase.prototype.editSavedSearchQueryCallBack = function (data) {
            var self = this;
            var favoriteListingData = {
                SearchQuery: angular.fromJson(self.currentRequest),
                isMailApproved: this.$rootScope.Properties.IsMailApproved,
                isUserLoggedIn: this.$rootScope.Properties.IsUserLoggedIn,
                isTriggered: !!data && data.isTriggered
            };
            // self.currentRequest içindeki querystringde çoklu kategori kategoriID leri bulunmadığı için aşağıdaki gibi ezdim
            // favori kaydederken yanlış kaydediyordu
            if (favoriteListingData.SearchQuery) {
                favoriteListingData.SearchQuery.QueryString = self.$window.location.search;
            }
            if (favoriteListingData.SearchQuery) {
                favoriteListingData.SearchQuery.BreadCrumb = self.activeCategories;
            }
            if (!!data && data.goto) {
                favoriteListingData.goto = data.goto;
            }
            if (!!data && data.title) {
                favoriteListingData.title = data.title;
            }
            this.DialogService.editSavedAlert(favoriteListingData).then(function (ngDialogData) {
                if (data.isTriggered) {
                    self.AnalyticsService.setDataLayer("Ilan Listeleme", "Aramayı Kaydet Auto Trigger Popup", "Close", "gaEvent", true);
                }
                else {
                    self.AnalyticsService.setDataLayer("Ilan Listeleme", "Aramayı Kaydet User Triggered Popup", "Close", "gaEvent", true);
                }
            });
        };
        SearchControllerBase.prototype.callLoginDialog = function (callBack) {
            this.DialogService.closeAll();
            this.DialogService.callLogin({
                callBack: callBack
            });
        };
        SearchControllerBase.prototype.sendToRealForm = function () {
            this.closeListingsPopupDetail(false);
        };
        SearchControllerBase.prototype.closeListingsPopupDetail = function (boolOption) {
            this.showFilterPopupDetail = !!boolOption ? !!boolOption : !this.showFilterPopupDetail;
        };
        /** siralama tipi icin analytics custom dimension yollar */
        SearchControllerBase.prototype.sendSortingGACD = function (url) {
            var filter = this.CommonHelperService.getParameterByName("sort", url);
            var filterName = "Gelişmiş Sıralama";
            var gaFilter = filter;
            switch (filter) {
                case "pricetl.asc":
                    filterName = "Fiyata göre (Önce en ucuz)";
                    break;
                case "pricetl.desc":
                    filterName = "Fiyata göre (Önce en pahalı)";
                    break;
                case "year.asc":
                    filterName = "Model yılına göre (Önce en eski)";
                    break;
                case "year.desc":
                    filterName = "Model yılına göre (Önce en yeni)";
                    break;
                case "startedat.desc":
                    filterName = "Tarihe göre (Önce en yeni)";
                    break;
                case "startedat.asc":
                    filterName = "Tarihe göre (Önce en eski)";
                    break;
                case "kilometers.asc":
                    filterName = "Kilometreye göre (Önce en az)";
                    break;
                case "kilometers.desc":
                    filterName = "Kilometreye göre (Önce en çok)";
                    break;
                default:
                    gaFilter = "null";
                    break;
            }
        };
        SearchControllerBase.prototype.prepareSortFilter = function (querystring) {
            var _this = this;
            var urlAndQs = querystring.split("?");
            if (urlAndQs.length == 2) {
                var qsParts = urlAndQs[1].split("&");
                qsParts.map(function (qsPart) {
                    var keyval = qsPart.split("=");
                    if (keyval && keyval.length == 2 && keyval[0] == "sort" && keyval[1] != "advanced") {
                        _this.selectedFilters.push({
                            PropertyName: "sort",
                            Value: keyval[1],
                            HideFilter: true,
                            IsUrlFilter: false
                        });
                    }
                });
            }
        };
        SearchControllerBase.prototype.setFilters = function (arr) {
            this.tempFilters = [];
            if (!arr) {
                return;
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].Value) {
                    this.tempFilters.push(arr[i]);
                }
            }
        };
        SearchControllerBase.prototype.pushFilters = function () {
            if (!this.tempFilters) {
                return;
            }
            for (var i = 0; i < this.tempFilters.length; i++) {
                if (this.tempFilters[i].Value) {
                    this.selectedFilters.push(this.tempFilters[i]);
                }
            }
        };
        SearchControllerBase.prototype.getCategoryFacetCount = function () {
            var categoryFacetNewCount = 0;
            if (this.selectedFilters && this.selectedFilters.length > 0) {
                for (var index = this.selectedFilters.length - 1; index >= 0; index--) {
                    if (this.selectedFilters[index].PropertyName == "category") {
                        categoryFacetNewCount++;
                    }
                }
            }
            return categoryFacetNewCount;
        };
        SearchControllerBase.prototype.checkIfCategoryFacetExists = function (value) {
            if (this.selectedFilters && this.selectedFilters.length > 0) {
                for (var index = this.selectedFilters.length - 1; index >= 0; index--) {
                    if (this.selectedFilters[index].PropertyName == "category" &&
                        (this.selectedFilters[index].Value == value || this.selectedFilters[index].Id == value)) {
                        return true;
                    }
                }
            }
            return false;
        };
        SearchControllerBase.prototype.getIndexOfCompare = function (advertId) {
            var self = this;
            return self.CompareService.getIndex(advertId);
        };
        SearchControllerBase.prototype.toggleCompare = function (advert, $event) {
            if ($event) {
                $event.preventDefault();
            }
            var self = this;
            try {
                // eventler
                if (self.checkIfInCompare(advert.id)) {
                    // kaldir eventi
                    self.AnalyticsService.setDataLayer("Ilan Listeleme", "Karşılaştırmadan Çıkar", "Click", "gaEvent", true);
                }
                else {
                    // ekle eventi
                    self.AnalyticsService.setDataLayer("Ilan Listeleme", "Karşılaştırmaya Ekle", "Click", "gaEvent", true);
                }
                self.CompareService.toggle(advert);
            }
            catch (e) {
                if (self.isMobile) {
                    self.DialogService.warning({
                        error: "En fazla 3 adet ilan karşılaştırabilirsiniz. Dilerseniz karşılaştırma adımına devam edebilir ya da eklediğiniz ilanlardan birini çıkartıp yeni bir ilan ekleyebilirsiniz.",
                        title: "En Fazla 3 İlan Karşılaştırabilirsiniz"
                    });
                }
                self.AnalyticsService.setDataLayer("Ilan Karşılaştırma", "Ilan-Karsilastirma-Limit-Uyari", "Alertbox", "gaEvent", true);
            }
            this.comparables = self.CompareService.getCarList();
            this.prepareCompareListForSearch(self.CompareService.getCarList());
        };
        SearchControllerBase.prototype.checkIfInCompare = function (advertId) {
            var self = this;
            return self.CompareService.checkIfInCompare(advertId);
        };
        SearchControllerBase.prototype.removeFromCompare = function (advertId) {
            var self = this;
            self.CompareService.remove(advertId);
            this.comparables = self.CompareService.getCarList();
            self.prepareCompareListForSearch(self.CompareService.getCarList());
        };
        SearchControllerBase.prototype.prepareCompareListForSearch = function (adverts) {
            var self = this;
            self.dcomparables = [];
            adverts.forEach(function (advert) {
                self.dcomparables[advert.id] = true;
            });
        };
        SearchControllerBase.prototype.ensurePath = function (url) {
            url = url.replace(window.location.origin, "");
            return url;
        };
        SearchControllerBase.prototype.callImageLazyLoad = function () {
            if (window.myLazyLoad) {
                this.$timeout(function () {
                    window.myLazyLoad.update();
                }, 100);
            }
            else if (window.LazyLoad) {
                this.$timeout(function () {
                    var myLazyLoad = new window.LazyLoad(window.lazyLoadOptions);
                    myLazyLoad.update();
                }, 100);
            }
        };
        /** ilan goster gizle callback */
        SearchControllerBase.prototype.toggleShowHide = function (advertId, $event) {
            if ($event) {
                $event.stopPropagation();
                $event.preventDefault();
            }
            if (this.isHidden(advertId)) {
                this.AnalyticsService.setDataLayer("Ilan Listeleme", "Ilani goster", "", "gaEvent", true);
            }
            else {
                this.AnalyticsService.setDataLayer("Ilan Listeleme", "Ilani gizle", "", "gaEvent", true);
            }
            this.ShowHideListingService.toggle(advertId);
        };
        /** ilan gizli mi? */
        SearchControllerBase.prototype.isHidden = function (advertId) {
            return this.ShowHideListingService.isHidden(advertId);
        };
        /** ilan favoriye eklenmis mi */
        SearchControllerBase.prototype.isFavorited = function (advertId) {
            return this.FavoriteService.checkIfFavorited(advertId);
        };
        /** favoriye ekle kaldir */
        SearchControllerBase.prototype.toggleFavorite = function (advertId, $event) {
            if ($event) {
                $event.stopPropagation();
                $event.preventDefault();
            }
            if (this.isFavorited(advertId)) {
                this.AnalyticsService.setDataLayer("Ilan Listeleme", "Favoriden Cikar", "" + advertId, "gaEvent", true);
            }
            else {
                this.AnalyticsService.setDataLayer("Ilan Listeleme", "Favoriye Ekle", "" + advertId, "gaEvent", true);
            }
            this.FavoriteService.toggleFavorite(advertId);
        };
        /** donanim popupini gosterir */
        SearchControllerBase.prototype.openEquipmentPopup = function () {
            var self = this;
            self.DialogService.openEquipmentPopup(self.facetData.donanim).then(function (result) {
                if (result.value.Items) {
                    result.value.Items.map(function (facet) {
                        facet.Childs.map(function (item) {
                            var filter = {
                                Name: "eq",
                                DisplayName: item.Displayname,
                                IsUrlFilter: false,
                                Modified: true,
                                PropertyName: "eq",
                                Text: item.Value,
                                Value: item.Value
                            };
                            if (item.Selected) {
                                self.selectedFilters.push(filter);
                            }
                            else {
                                self.removeFilter(filter, false);
                            }
                        });
                    });
                }
                self.searchForms(null);
            });
        };
        /** facet kapatildiginda calisiyor, facetin en altini viewport icine scroll ediyor, footerda kalmayalim diye */
        SearchControllerBase.prototype.scrollBottomOfElementIntoViewport = function (selector) {
            var self = this;
            var element = document.getElementById(selector);
            if (element) {
                self.$timeout(function () {
                    element.scrollIntoView(false);
                }, 10);
            }
        };
        /** bi elementin en tepesi viewportun tepesine scroll etsin */
        SearchControllerBase.prototype.scrollTopOfElementIntoViewport = function (selector) {
            var element = typeof selector == "string" ? document.querySelector(selector) : selector;
            if (element) {
                $("html,body").animate({ scrollTop: $(element).offset().top - 40 }, 300);
            }
        };
        //#region city
        SearchControllerBase.prototype.checkCityChangedByClick = function (cityObj) {
            if (!!this.cities[cityObj.FriendlyUrl]) {
                this.cityChange(cityObj);
            }
            else {
                this.cityChangeRemove(cityObj);
            }
        };
        SearchControllerBase.prototype.checkTownChangedByClick = function (townObj) {
            if (!!this.towns[townObj.FriendlyUrl + townObj.Value]) {
                this.townChange(townObj);
            }
            else {
                this.townChangeRemove(townObj);
            }
            this.selectedCitiesAsPlaceholder("towns");
        };
        SearchControllerBase.prototype.selectedCitiesAsPlaceholder = function (isTown) {
            var self = this;
            var isTownSelected = !!(isTown == "towns");
            var tmpArr = [];
            var selectedCities = isTownSelected ? "İlçe" : " İl";
            var $inputField = isTownSelected ? $("#quick_search_ilce") : $("#quick_search_il");
            if (isTownSelected) {
                for (var i = 0; i < self.townsAvailable.length; i++) {
                    if (!!self.townsAvailable[i].Selected) {
                        tmpArr.push(self.townsAvailable[i].Name);
                    }
                }
            }
            else {
                for (var z = 0; z < self.citiesAvailable.length; z++) {
                    if (!!self.citiesAvailable[z].Selected) {
                        tmpArr.push(self.citiesAvailable[z].Name);
                    }
                }
            }
            if (tmpArr.length == 0) {
                $inputField.attr("placeholder", selectedCities);
                self[isTownSelected ? "showSubIlceText" : "showSubIlText"] = selectedCities;
                return;
            }
            selectedCities =
                tmpArr.length > 2
                    ? tmpArr.length + (isTownSelected ? " ilçe " : " il ") + "seçildi"
                    : tmpArr.length == 1
                        ? tmpArr[0]
                        : tmpArr[0] + ", " + tmpArr[1];
            $inputField.attr("placeholder", selectedCities);
            self[isTownSelected ? "showSubIlceText" : "showSubIlText"] = selectedCities;
        };
        SearchControllerBase.prototype.cityChangeRemove = function (cityObj, escapeIstanbulLoop) {
            cityObj.Selected = false;
            var townList = this.towns || null;
            if (!!townList) {
                for (var key in townList) {
                    if (townList.hasOwnProperty(key)) {
                        var townValue = townList[key];
                        var tmpCityName = key;
                        var regexNum = /(\d+)/g;
                        var hasDigitInString = !!tmpCityName.match(regexNum);
                        var cityK4y = hasDigitInString ? +tmpCityName.match(regexNum)[0] : tmpCityName;
                        if (!!townValue) {
                            var indice = this.CommonHelperService.findInArray(this.townsAvailable, hasDigitInString ? "Value" : "FriendlyUrl", cityK4y);
                            if (indice == -1) {
                                indice = this.CommonHelperService.findInArray(this.townsAvailable, hasDigitInString ? "Value" : "FriendlyUrl", "" + cityK4y);
                            }
                            if ((!!this.townsAvailable[indice] && this.townsAvailable[indice].ParentId + "") == cityObj.Value + "") {
                                delete townList[key];
                                delete this.towns[key];
                                var i = this.CommonHelperService.findInArray(this.selectedFilters, "Value", "" + this.townsAvailable[indice].Value);
                                if (i > -1) {
                                    this.selectedFilters.splice(i, 1);
                                }
                                // this.townChangeRemove(this.townsAvailable[indice])
                            }
                        }
                    }
                }
            }
            if (this.townsAvailable.length != 0) {
                for (var j = 0; j < this.townsAvailable.length; j++) {
                    if (+this.townsAvailable[j].ParentId == +cityObj.Value) {
                        this.townsAvailable.splice(j, 1);
                        j--;
                    }
                }
            }
            var indexString = this.CommonHelperService.findInArray(this.selectedFilters, "Value", cityObj.Value.toString());
            var index = this.CommonHelperService.findInArray(this.selectedFilters, "Value", cityObj.Value);
            if (index > -1 || indexString > -1) {
                var spliceIndex = !!(indexString > -1) ? indexString : index;
                this.selectedFilters.splice(spliceIndex, 1);
            }
            this.selectedCitiesAsPlaceholder();
            if (this.oneclick && !escapeIstanbulLoop) {
                this.searchForms(null);
                return;
            }
        };
        SearchControllerBase.prototype.cityChange = function (cityObj) {
            var _this = this;
            this.addSelected("city", cityObj, true);
            this.HttpHelperService.httpGet("/widget/counties?cityId=" + cityObj.Value, function (res) {
                _this.townsAvailable = _this.townsAvailable || [];
                for (var i = 0; i < res.Data.length; i++) {
                    var town = {
                        Name: res.Data[i].Name,
                        Value: "" + res.Data[i].Id,
                        Selected: false,
                        ParentName: _this.CommonHelperService.toFriendlyUrl(cityObj.Name),
                        FriendlyUrl: _this.CommonHelperService.toFriendlyUrl(res.Data[i].Name),
                        ParentId: cityObj.Value
                    };
                    _this.townsAvailable.push(town);
                }
                _this.selectedCitiesAsPlaceholder();
            }, function () {
                alert("Bir hata oluştu, lütfen tekrar deneyiniz");
            }, { isNotLoading: true });
        };
        SearchControllerBase.prototype.townChangeRemove = function (townObj) {
            var index = this.CommonHelperService.findInArray(this.selectedFilters, "Value", townObj.Value);
            if (index > -1) {
                this.selectedFilters.splice(index, 1);
            }
            this.selectedCitiesAsPlaceholder("towns");
            if (this.oneclick) {
                this.searchForms(null);
                return;
            }
        };
        SearchControllerBase.prototype.townChange = function (townObj) {
            this.selectedCitiesAsPlaceholder("towns");
            this.addSelected("town", townObj, false);
        };
        SearchControllerBase.prototype.addSelected = function (parameter, obj, isUrlFacet) {
            obj.Selected = true;
            this.selectedFilters.push({
                PropertyName: parameter,
                Value: obj.Value || obj.Id,
                IsUrlFilter: isUrlFacet,
                Text: obj.FriendlyUrl || this.CommonHelperService.toFriendlyUrl(obj.Name),
                Name: parameter == "city" ? "Il" : "Ilce",
                DisplayName: obj.Name,
                HideFilter: false
            });
            if (this.oneclick) {
                this.searchForms(null);
            }
        };
        SearchControllerBase.prototype.filterKeyToggleTown = function (event) {
            var self = this;
            if (event.keyCode == 27) {
                self.quickSearchIlce = "";
                self.dirtyCalcTown = !0;
                self.activeTown = 0;
                event.target.blur();
                event.preventDefault();
            }
            else if (event.keyCode == 38) {
                self.checkKeyTown("up");
            }
            else if (event.keyCode == 40) {
                self.checkKeyTown("down");
            }
            else if (event.keyCode == 13 || event.keyCode == 32) {
                event.preventDefault();
                self.checkKeyTown("enter");
            }
            else {
                self.dirtyCalcTown = !0;
                self.towns = self.towns || {};
                self.townsAvailable.forEach(function (elem) {
                    elem.Hovered = !!0;
                });
                self.activeTown = 0;
            }
        };
        SearchControllerBase.prototype.checkKeyTown = function (keyPressed) {
            var self = this;
            var newTownsAvailable = !!self.quickSearchIlce
                ? self.$filter("filter")(self.townsAvailable, self.quickSearchIlce)
                : self.townsAvailable;
            if (!newTownsAvailable) {
                return;
            }
            if (keyPressed == "enter") {
                var townFriendlyUrl = newTownsAvailable[self.activeTown].FriendlyUrl + newTownsAvailable[self.activeTown].Value;
                self.towns[townFriendlyUrl] = !self.towns[townFriendlyUrl];
                if (self.towns[townFriendlyUrl]) {
                    self.townChange(newTownsAvailable[self.activeTown]);
                }
                else {
                    self.townChangeRemove(newTownsAvailable[self.activeTown]);
                }
                return;
            }
            newTownsAvailable.forEach(function (elem) {
                elem.Hovered = false;
            });
            if (keyPressed == "up") {
                if (self.activeTown == 0) {
                    self.activeTown = +(newTownsAvailable.length - 1);
                }
                else {
                    self.activeTown--;
                }
                newTownsAvailable[self.activeTown].Hovered = true;
            }
            else if (keyPressed == "down") {
                if (self.activeTown == newTownsAvailable.length - 1) {
                    self.activeTown = 0;
                }
                else {
                    if (self.dirtyCalcTown) {
                        self.dirtyCalcTown = false;
                    }
                    else {
                        self.activeTown++;
                    }
                }
                newTownsAvailable[self.activeTown].Hovered = true;
            }
            $("#wBH_" + newTownsAvailable[self.activeTown].FriendlyUrl + newTownsAvailable[self.activeTown].Value).focus();
            $("#quick_search_ilce").focus();
        };
        SearchControllerBase.prototype.getCityNameWithKey = function (key) {
            var resolver = "";
            if (this.citiesAvailable) {
                var city = this.citiesAvailable.filter(function (cityItem) { return cityItem.FriendlyUrl == key; });
                if (city && city.length > 0) {
                    resolver = city[0].Name;
                }
            }
            return resolver;
        };
        SearchControllerBase.prototype.bindSegmentifyCallbacks = function () {
            var self = this;
            var segProducts = function (target, productList, wvCB) {
                if (wvCB) {
                    wvCB(jQuery("#no-result-segmentify"));
                }
                var doDigest = false;
                // productlist doluysa yedekle
                if (productList && productList.length > 0) {
                    window.recommendedAdverts = productList;
                    doDigest = true;
                }
                // produclist bossa yedektekini kullan
                if (!productList || productList.length == 0) {
                    productList = window.recommendedAdverts;
                }
                self.adverts = productList;
                // productlist doluysa segmentifydan gelmistir
                if (doDigest) {
                    self.$scope.$digest();
                }
            };
            window.segProducts = segProducts;
        };
        SearchControllerBase.prototype.bindSegmentifyCallbacksForLessTen = function () {
            var self = this;
            var segProducts = function (target, productList, wvCB) {
                if (wvCB) {
                    wvCB(jQuery("#less-ten-segmentify"));
                }
                var doDigest = false;
                // productlist doluysa yedekle
                if (productList && productList.length > 0) {
                    window.recommendedAdverts = productList;
                    doDigest = true;
                }
                // produclist bossa yedektekini kullan
                if (!productList || productList.length == 0) {
                    productList = window.recommendedAdverts;
                }
                self.advertsForLessTen = productList;
                // productlist doluysa segmentifydan gelmistir
                if (doDigest) {
                    self.$scope.$digest();
                }
            };
            window.listingComplementary = segProducts;
        };
        SearchControllerBase.prototype.dataLayerClick = function (index, rowNumber) {
            var self = this;
            var data = window.adverts[rowNumber];
            window.dataLayer.push({
                event: "productClick",
                ecommerce: {
                    click: {
                        actionField: { list: "Search Results" },
                        products: [
                            {
                                name: !!data.Id ? data.Id + " - " + data.CategoryName : data.CategoryName,
                                id: !!data.Id ? data.Id : null,
                                price: data.FormattedPrice,
                                brand: data.Brand,
                                category: data.CategoryName,
                                variant: data.Variant,
                                list: "Search Results",
                                position: parseInt(index) // ilanın kaçıncı sırada yer aldığı
                            }
                        ]
                    }
                }
            });
        };
        SearchControllerBase.prototype.ecommerceDataLayer = function () {
            var objs = {
                ecommerce: {
                    impressions: []
                }
            };
            if (window.adverts && window.adverts.length > 0) {
                for (var index = 0; index < window.adverts.length; index++) {
                    var element = window.adverts[index];
                    objs.ecommerce.impressions.push({
                        name: element.Id + " - " + element.CategoryName,
                        id: element.Id,
                        price: element.FormattedPrice,
                        brand: element.Brand,
                        category: element.CategoryName,
                        list: "Search Results",
                        position: element.Index
                    });
                }
            }
            window.dataLayer.push(objs);
        };
        SearchControllerBase.$inject = [
            "$scope",
            "CommonHelperService",
            "DialogService",
            "HttpHelperService",
            "$sce",
            "$compile",
            "$timeout",
            "$rootScope",
            "$filter",
            "CompareService",
            "$location",
            "$window",
            "$q",
            "LastSearchService",
            "SwapOpsService",
            "PrevNextService",
            "ShowHideListingService",
            "SearchService",
            "FavoriteService",
            "AnalyticsService"
        ];
        return SearchControllerBase;
    }());
    arabam.SearchControllerBase = SearchControllerBase;
    angular.module("arabam").controller("SearchControllerBase", SearchControllerBase);
})(arabam || (arabam = {}));
