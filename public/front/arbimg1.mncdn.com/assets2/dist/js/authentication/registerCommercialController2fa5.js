var arabam;
(function (arabam) {
    var RegisterCommercialController = /** @class */ (function () {
        function RegisterCommercialController(AuthenticationService, CityCountyService, DialogService, $http, CommonHelperService, HttpHelperService, ngDialog, arabamConfigFactory) {
            this.AuthenticationService = AuthenticationService;
            this.CityCountyService = CityCountyService;
            this.DialogService = DialogService;
            this.$http = $http;
            this.CommonHelperService = CommonHelperService;
            this.HttpHelperService = HttpHelperService;
            this.ngDialog = ngDialog;
            this.arabamConfigFactory = arabamConfigFactory;
            this.commercialUserRegisterRequest = {};
            this.registerSuccess = false;
            this.kvkkAgreementText = "";
            this.init();
        }
        RegisterCommercialController.prototype.init = function () {
            var _this = this;
            this.CityCountyService.getCityList(function (res) {
                _this.citySelect = res.Data;
            }, function () {
                console.error("/// CityCountyService getCityList metodunu kontrol edin E.C ///");
            });
            this.getkvkkAgreementText();
        };
        RegisterCommercialController.prototype.getkvkkAgreementText = function () {
            var self = this;
            self.HttpHelperService.httpGet("/help/kvkkAgreement", function (data) {
                self.kvkkAgreementText = data;
            });
        };
        RegisterCommercialController.prototype.cityChangeCallback = function (cityObj) {
            var _this = this;
            this.CityCountyService.getCountyList(cityObj, function (res) {
                _this.countySelect = res.Data;
            }, function () {
                console.error("/// CityCountyService getCountyList metodunu kontrol edin E.C ///");
            });
            this.commercialUserRegisterRequest = !!this.commercialUserRegisterRequest
                ? this.commercialUserRegisterRequest
                : {};
            this.commercialUserRegisterRequest.cityId = cityObj.Id;
            this.taxDepartment(cityObj);
        };
        RegisterCommercialController.prototype.countyChangeCallback = function (countyObj) {
            this.commercialUserRegisterRequest.countyId = countyObj.Id;
        };
        RegisterCommercialController.prototype.taxDepartment = function (cityObj) {
            var self = this;
            self.HttpHelperService.httpGet("/widget/taxdepartment?cityId=" + cityObj.Id, function (res) {
                if (res) {
                    self.taxDepartmentSelect = res.Data;
                }
            });
        };
        RegisterCommercialController.prototype.postRegisterForm = function (formName) {
            var self = this;
            if (formName.$valid) {
                var request = angular.copy(self.commercialUserRegisterRequest);
                request.firmCompanyType = parseInt(request.firmCompanyType);
                self.AuthenticationService.httpPost("/authentication/registercommercial/", request, function (res) {
                    self.registerSuccess = true;
                    self.CommonHelperService.setDataLayerVp("/vp/ticariUyelikBasarili", "virtualPageView", true);
                    window.scrollTo(0, 0);
                });
            }
            else {
                self.CommonHelperService.logFormErrorsToDataLayer(formName, "Ticari Üyelik");
            }
        };
        RegisterCommercialController.prototype.openPopVideo = function (index) {
            var self = this;
            var selectedVideo = index;
            var dialog = self.ngDialog.openConfirm({
                template: "videoPop",
                className: "ngdialog-theme-arabam2018 lg",
                data: { index: selectedVideo }
            });
        };
        RegisterCommercialController.prototype.imageSlider = function () {
            var self = this;
            $(document).ready(function () {
                $("#imageSlider").slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    arrows: true
                });
            });
        };
        RegisterCommercialController.prototype.changeHeader = function () {
            var self = this;
            var bannerHeader = ["Anında milyonlara katıl!", "2 dakikada ilan ver"];
            var counter = 0;
            var elem = document.getElementById("changeText");
            elem.innerHTML = "2 dakikada ilan ver";
            setInterval(function () {
                elem.innerHTML = bannerHeader[counter];
                counter++;
                if (counter >= bannerHeader.length) {
                    counter = 0;
                }
            }, 3000);
        };
        RegisterCommercialController.prototype.kvkkOpen = function (formName) {
            var self = this;
            var checkbox = document.getElementById("cookieDisclaimer");
            if (!checkbox.checked) {
                self.ngDialog
                    .openConfirm({
                    template: this.arabamConfigFactory.AssetBasePath +
                        "/dist/js/dialogs/kvkk.html" +
                        this.arabamConfigFactory.AssetVersion,
                    data: {
                        headerOptions: {
                            title: "Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni"
                        },
                        footerOptions: {
                            acceptLabel: "Kabul Ediyorum"
                        },
                        kvkkText: self.kvkkAgreementText
                    },
                    className: "ngdialog-theme-arabam2018",
                    closeByEscape: false,
                    closeByDocument: false,
                    showClose: true,
                    disableAnimation: true,
                    cache: false
                })
                    .then(function () {
                    if (!checkbox.checked) {
                        self.commercialUserRegisterRequest.cookieDisclaimer = true;
                    }
                });
            }
            else {
                self.commercialUserRegisterRequest.cookieDisclaimer = false;
            }
        };
        return RegisterCommercialController;
    }());
    angular
        .module("arabam")
        .controller("RegisterCommercialController", RegisterCommercialController);
})(arabam || (arabam = {}));
