var arabam;
(function (arabam) {
    var RegisterIndividualController = /** @class */ (function () {
        function RegisterIndividualController(httpHelperService, $location, AuthenticationService, DialogService, CommonHelperService, $templateCache, $window, ngDialog, arabamConfigFactory, $scope, $q, FB) {
            this.httpHelperService = httpHelperService;
            this.$location = $location;
            this.AuthenticationService = AuthenticationService;
            this.DialogService = DialogService;
            this.CommonHelperService = CommonHelperService;
            this.$templateCache = $templateCache;
            this.$window = $window;
            this.ngDialog = ngDialog;
            this.arabamConfigFactory = arabamConfigFactory;
            this.$scope = $scope;
            this.$q = $q;
            this.FB = FB;
            this.inputNumber = false;
            this.tokenAndGo = false;
            this.googleAvailable = false;
            this.isSpaceTriggeredWrapper = {};
            this.blurred = false;
            // form dolduruldugunda bu obje de doluyor.
            this.individualUserRegisterRequest = {};
            /*
                    private SozlesmeyiGoster(): void {
                        this.DialogService.textPopup({
                            title: "arabam.com Son Kullanıcı Üyelik Sözleşmesi",
                            content: document.getElementById("sonKullaniciUyelikSozlesmesi").innerHTML
                        });
                    }
            
                    private GizlilikPolitikasiGoster(): void {
                        this.DialogService.textPopup({
                            title: "Gizlilik Politikası",
                            content: document.getElementById("gizlilikPolitikasi").innerHTML
                        });
                    }*/
            this.pathTogo = "/";
            this.init();
        }
        RegisterIndividualController.prototype.postRegisterForm = function (formName) {
            if (formName.$valid) {
                var self_1 = this;
                self_1.individualUserRegisterRequest.grecaptcha = $("#g-recaptcha-response").val();
                if (self_1.individualUserRegisterRequest.grecaptcha != null &&
                    self_1.individualUserRegisterRequest.grecaptcha != "") {
                    var emailSuccessCb_1 = function (mail) {
                        if (!!mail) {
                            self_1.individualUserRegisterRequest.email = mail;
                        }
                        self_1.DialogService.closeAll();
                        self_1.postRegisterOps();
                    };
                    if (this.inputNumber) {
                        self_1.postRegisterOps();
                    }
                    else {
                        this.DialogService.titleContentConfirm(function () { }, {
                            title: "E-posta doğrulama",
                            message: '<p class="pb10">E-posta adresini doğrulayarak hesabını aktif hale getirebilmek için bu adrese bir e-posta göndereceğiz. E-postadaki linke tıklayarak hesabını aktif hale getirebilirsin.</p><p class="pb10">E-posta adresin doğru mu? Değilse düzeltebilirsin.</p>',
                            mail: this.individualUserRegisterRequest.email,
                            confirm: "Doğrulama Linki Gönder",
                            bindModelInput: true,
                            overrideTemplate: "/dist/js/dialogs/emailConfirm.html",
                            showClose: false,
                            closeByEscape: false,
                            closeByDocument: false,
                            customCb: function () {
                                emailSuccessCb_1(this.mail);
                            }
                        }, function () { });
                    }
                }
            }
            else {
                $(".tabletScroll").animate({ scrollTop: 0 }, 0);
                this.CommonHelperService.logFormErrorsToDataLayer(formName, "Bireysel Üyelik");
            }
        };
        RegisterIndividualController.prototype.showPersonalAggreement = function () {
            var rawTemplate = this.$templateCache.get("kisisel-veri-sozlesmesi.html");
            this.DialogService.textPopup({
                className: "personalAggreement",
                // title: "Kişisel Veri Onayı",
                content: rawTemplate
            });
        };
        RegisterIndividualController.prototype.postRegisterOps = function () {
            var self = this;
            if (self.inputNumber) {
                self.individualUserRegisterRequest.email = self.inputNumberValidated;
            }
            self.httpHelperService
                .httpPostWithPromise("/authentication/registerindividualv2/", self.individualUserRegisterRequest)
                .then(function (res) {
                var cbSuccess = function () {
                    // self.campaignResultOps(campaignResult, res);
                    self.CommonHelperService.setDataLayerVp("/vp/bireyselUyelikBasarili", "virtualPageView", true);
                    self.postSuccessRegisterOps(res);
                    self.callSegmentifyLoginOps(res);
                };
                // missing telephone verify
                if (res.Data && res.Data.Code == 914) {
                    self.DialogService.updatePhone({
                        callBack: cbSuccess,
                        validationNumber: self.individualUserRegisterRequest.email,
                        UId: res.Data.UId
                    });
                    return false;
                }
                else if (res.Code == 600) {
                    self.DialogService.closeAll();
                    self.DialogService.openConfirm(function () {
                        self.DialogService.closeAll();
                        self.DialogService.callLogin({
                            callBack: function () {
                                window.location.href = self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                            },
                            hasPreFilledEmail: self.individualUserRegisterRequest.email
                        });
                    }, {
                        headerOptions: {
                            title: "Hata!"
                        },
                        bodyOptions: {
                            message: "Bu " + (self.inputNumber ? "telefon numarası" : "e-posta adresi") + " ile daha \u00F6nce kay\u0131t olu\u015Fturuldu. Size ait ise \u201C\u00DCye giri\u015Fi yap\u201D ile devam edebilirsiniz."
                        },
                        footerOptions: {
                            rejectLabel: "Vazgeç",
                            acceptLabel: "Üye Girişi Yap"
                        }
                    }, function () {
                        self.DialogService.closeAll();
                    });
                    return;
                }
                if (res.Success) {
                    cbSuccess();
                    // this.postSuccessRegisterOps(res);
                }
                else {
                    self.DialogService.warning({
                        error: res.Message
                    });
                }
            })
                .catch(function (err) {
                self.DialogService.warning({
                    error: err.Message
                });
            });
        };
        RegisterIndividualController.prototype.callSegmentifyLoginOps = function (res) {
            if (!res.Data || !res.Data.UId) {
                return;
            }
            var userId = res.Data.UId;
            this.CommonHelperService.setSegmentifyLoginOps("signup", userId);
        };
        RegisterIndividualController.prototype.postSuccessRegisterOps = function (res) {
            var self = this;
            self.AuthenticationService.httpGet("/campaign/loginCampaign", function (campaignResult) {
                // let cbSuccess = function(){
                //     self.campaignResultOps(campaignResult, res);
                // }
                // // missing telephone verify
                // if (res && res.Code == 914) {
                //     self.DialogService.updatePhone({
                //         callBack: cbSuccess,
                //         validationNumber: self.individualUserRegisterRequest.email
                //     });
                //     return false;
                // }
                if (res.Success) {
                    // cbSuccess();
                    self.CommonHelperService.setDataLayerVp("/vp/bireyselUyelikBasarili", "virtualPageView", true);
                    self.campaignResultOps(campaignResult, res);
                }
            }, function (err) {
                // (<any>self).pathTogo = window.location.origin + self.CommonHelperService.getParameterByNameWithSlash('returnUrl');
                self.DialogService.warning({ error: err.Message });
            });
        };
        RegisterIndividualController.prototype.campaignResultOps = function (campaignResult, res) {
            var self = this;
            if (res.Success) {
                if (campaignResult.Data != null && campaignResult.Data.Url) {
                    var retUrl = self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                    var campUrl = self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                    if (retUrl != campUrl) {
                        self.pathTogo =
                            window.location.origin +
                                self.CommonHelperService.getWithSlash(campaignResult.Data.Url) +
                                window.location.search;
                    }
                    else {
                        self.pathTogo =
                            window.location.origin +
                                self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                    }
                }
                else {
                    self.pathTogo =
                        window.location.origin +
                            self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                }
                if (self.inputNumber) {
                    self.DialogService.success({
                        // template: "/dist/js/dialogs/checkYourEmail.html",
                        title: "Aramıza Hoş Geldin!",
                        confirm: "Kaldığın Yerden Devam Et",
                        iconClass: "fa fa-check-circle color-red4 tac icon-size-64",
                        message: "<p class='tac pt20 font-default-plus'>Artık üyeliğin aktif, arabam.com’daki binlerce ilanı keşfetmeye başlayabilir, <br> ilan sahipleri ile iletişime geçebilir ya da ilan verebilirsin.</p>" ||
                            "Kayıt olma işleminiz başarıyla gerçekleşti.",
                        path: self.pathTogo || "/"
                    });
                }
                else {
                    self.DialogService.success({
                        // template: "/dist/js/dialogs/checkYourEmail.html",
                        title: "E-postanı Kontrol Et!",
                        iconClass: "fa fa-check-circle color-red4 tac icon-size-64",
                        confirm: "Kaldığın Yerden Devam Et",
                        message: "<p class='tac pt20 font-default-plus'>arabam.com hesabını oluşturduk! </p><p class='tac'>Hesabını aktif hale getirmek için e-posta adresine gelen linke tıklaman gerekiyor. </p><p class='font-11 color-grey5 tac mt20 pt4'>*E-postayı gelen kutunda göremiyorsan önemsiz / junk / spam klasörlerini kontrol edebilirsin. </p>" ||
                            "Kayıt olma işleminiz başarıyla gerçekleşti.",
                        path: self.pathTogo || "/"
                    });
                }
            }
            else {
                self.DialogService.warning({ error: res.Message });
            }
        };
        RegisterIndividualController.prototype.init = function () {
            var self = this;
            self.checkSpace();
            self.initializeGoogleLogin();
            self.isRegister = false;
            $(function () {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: "19995709208",
                        // cookie: true, // enable cookies to allow the server to access
                        // status: false, // the session
                        // xfbml: true, // parse social plugins on this page
                        version: "v3.0" // use graph api version 2.5
                    });
                };
            });
            self.getkvkkAgreementText();
        };
        RegisterIndividualController.prototype.getkvkkAgreementText = function () {
            var self = this;
            self.httpHelperService.httpGet("/help/kvkkAgreement", function (data) {
                self.kvkkAgreementText = data;
            });
        };
        RegisterIndividualController.prototype.checkInputNumber = function (input) {
            var self = this;
            var isDigit = !isNaN(parseFloat(input)) && isFinite(input);
            this.inputNumber = isDigit;
            this.blurred = true;
            if (isDigit && input.length >= 10) {
                input = input.substr(-10);
                self.inputNumberValidated = input;
            }
        };
        RegisterIndividualController.prototype.checkLoginState = function () {
            var _this = this;
            var self = this;
            FB.login(function (res) {
                if (res.authResponse) {
                    self.fblogin(res.authResponse.accessToken);
                }
                else {
                    if (res.status === "not_authorized") {
                        _this.DialogService.openConfirm(function () {
                            self.checkLoginState();
                        }, {
                            headerOptions: {
                                title: "Facebook ile giriş yapılamadı"
                            },
                            bodyOptions: {
                                message: "arabam.com'a giriş yapmak için facebook üzerinden izin vermediniz. Tekrar denemek ister misiniz?"
                            }
                        });
                    }
                }
            }, { scope: "public_profile,email" });
        };
        RegisterIndividualController.prototype.fblogin = function (accessTokenStr) {
            var _this = this;
            var data = { accessToken: accessTokenStr };
            var self = this;
            self.httpHelperService.httpPost("/authentication/facebook-check-register", data, function (res) {
                if (res.Data.IsExist == true) {
                    _this.httpHelperService.httpPost("/authentication/facebook", data, function (fbResult) {
                        var _this = this;
                        self.AuthenticationService.httpGet("/campaign/loginCampaign", function (campaignResult) {
                            var retUrl = self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                            _this.pathToGo = retUrl;
                            if (campaignResult.Data != null &&
                                campaignResult.Data.Url) {
                                var campUrl = self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                                if (retUrl != campUrl) {
                                    _this.pathToGo =
                                        window.location.origin +
                                            self.CommonHelperService.getWithSlash(campaignResult.Data.Url) +
                                            window.location.search;
                                }
                                else {
                                    _this.pathToGo =
                                        window.location.origin +
                                            self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                                }
                            }
                            // let name = fbResult.Data.MemberInfo.Name + " " + fbResult.Data.MemberInfo.Surname,
                            //    message = "arabam.com'a hoşgeldiniz, " + name;
                            // self.DialogService.closeAll();
                            // self.DialogService.success({
                            //    path: this.pathToGo, message: message
                            // });
                            window.location = _this.pathToGo;
                        }, function (resInside) {
                            // let name = fbResult.Data.MemberInfo.Name + " " + fbResult.Data.MemberInfo.Surname,
                            //    message = "arabam.com'a hoşgeldiniz, " + name;
                            // self.DialogService.closeAll();
                            // self.DialogService.success({
                            //    path: "/", message: message
                            // });
                            window.location = _this.pathToGo;
                        });
                        if (fbResult.Data && fbResult.Data.Register) {
                            self.CommonHelperService.setDataLayerVp("/vp/FacebookIleUyelikBasarili ", "virtualPageView", true);
                        }
                        else {
                            self.CommonHelperService.setDataLayerVp("/vp/FacebookIleGirisBasarili", "virtualPageView", true);
                        }
                    }, { isNotLoading: true });
                }
                else {
                    self.ngDialog
                        .openConfirm({
                        template: self.arabamConfigFactory.AssetBasePath +
                            "/dist/js/dialogs/kvkkApproveFacebook.html" +
                            self.arabamConfigFactory.AssetVersion,
                        data: {
                            headerOptions: {
                                title: "Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni"
                            }
                        },
                        className: "ngdialog-theme-arabam2018",
                        closeByEscape: false,
                        closeByDocument: false,
                        showClose: true,
                        disableAnimation: true,
                        cache: false,
                        controller: "KvkkController",
                        controllerAs: "self"
                    })
                        .then(function () {
                        window.location.reload();
                    });
                }
            }, { isNotLoading: true });
        };
        RegisterIndividualController.prototype.initializeGoogleLogin = function () {
            var self = this;
            if (!!self.$window.gapi) {
                self.googleAvailable = true;
                return;
            }
            self.$window.loadScriptsWithCb("//apis.google.com/js/platform.js", function () {
                self.$window.gapi.load("auth2", function () {
                    self.$window.gapi.auth2
                        .init({
                        client_id: "367643905852-07s0ososvojhb3taulo9av0i41ilv8f1.apps.googleusercontent.com"
                    })
                        .then(function () {
                        self.$scope.$apply(function () {
                            self.googleAvailable = true;
                        });
                    });
                });
            });
        };
        RegisterIndividualController.prototype.googleLogin = function () {
            var self = this;
            if (self.googleAvailable &&
                self.$window.gapi &&
                self.$window.gapi.auth2) {
                var data_1;
                self
                    .doGoogleLogin()
                    .then(function (result) {
                    // google login result ile bizim serverlara gonderilecek data olustur
                    data_1 = { AccessToken: result.wc.id_token };
                    return self.checkGoogleRegister(data_1);
                })
                    .then(function (googleRegisterCheckResult) {
                    // kvkk dialog acmak gerekiyor mu?
                    if (googleRegisterCheckResult.Data.IsExist == false) {
                        return self.ngDialog.openConfirm({
                            template: self.arabamConfigFactory.AssetBasePath +
                                "/dist/js/dialogs/kvkkApproveGoogle.html" +
                                self.arabamConfigFactory.AssetVersion,
                            data: {
                                headerOptions: {
                                    title: "Üyeliğiniz Tamamlanmak Üzere"
                                }
                            },
                            className: "ngdialog-theme-arabam2018",
                            closeByEscape: false,
                            closeByDocument: false,
                            showClose: true,
                            disableAnimation: true,
                            cache: false
                        });
                    }
                    else {
                        return self.$q.defer();
                    }
                })
                    // tslint:disable-next-line:arrow-return-shorthand
                    .then(function (isUserAcceptedKvkk) {
                    console.log("kvkk modal result", isUserAcceptedKvkk);
                    // google ile gelen useri arabam'a kaydet
                    return self.registerWithGoogle(data_1);
                })
                    .then(function (googleRegisterResult) {
                    // welcome mesaji goster, iceri postala
                    var returnUrl = self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                    var name = googleRegisterResult.Data.UserWorkContext.Name +
                        " " +
                        googleRegisterResult.Data.UserWorkContext.Surname;
                    var message = "arabam.com'a hoşgeldiniz, " + name;
                    if (!returnUrl) {
                        returnUrl = "/";
                    }
                    self.DialogService.closeAll();
                    self.DialogService.success({
                        path: returnUrl,
                        message: message
                    }).then(function () {
                        window.location.href = returnUrl;
                    });
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
        };
        /**
         * google login api icin wrapper
         */
        RegisterIndividualController.prototype.doGoogleLogin = function () {
            var self = this;
            var GoogleAuth = self.$window.gapi.auth2.getAuthInstance();
            return GoogleAuth.signIn();
        };
        RegisterIndividualController.prototype.checkGoogleRegister = function (data) {
            var self = this;
            return self.httpHelperService.httpPostWithPromise("/authentication/google-check-register", data);
        };
        RegisterIndividualController.prototype.registerWithGoogle = function (data) {
            var self = this;
            return self.httpHelperService.httpPostWithPromise("/authentication/google", data);
        };
        /* password show hide */
        RegisterIndividualController.prototype.hideShowPassword = function () {
            this.inputType = this.inputType == "password" ? "text" : "password";
        };
        RegisterIndividualController.prototype.changeHeader = function () {
            var self = this;
            var bannerHeader = [
                "Anında milyonlara ulaş!",
                "2 dakikada ücretsiz ilan ver"
            ];
            var counter = 0;
            var elem = document.getElementById("changeText");
            elem.innerHTML = "2 dakikada ücretsiz ilan ver";
            setInterval(function () {
                elem.innerHTML = bannerHeader[counter];
                counter++;
                if (counter >= bannerHeader.length) {
                    counter = 0;
                }
            }, 3000);
        };
        RegisterIndividualController.prototype.kvkkOpen = function (formName) {
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
                        self.individualUserRegisterRequest.cookieDisclaimer = true;
                    }
                });
            }
            else {
                self.individualUserRegisterRequest.cookieDisclaimer = false;
            }
        };
        RegisterIndividualController.prototype.checkSpace = function () {
            var self = this;
            var inputArray = ["password", "confirmPassword"];
            inputArray.forEach(function (inputId) {
                var domEl = document.getElementById(inputId);
                domEl.addEventListener("keyup", function () {
                    var hasSpace = !!domEl.value.match(/[\s]+/g);
                    domEl.value = domEl.value.replace(/[\s]+/g, "");
                    domEl.dispatchEvent(new Event("input", { bubbles: true }));
                    self.$scope.$apply(function () {
                        self.isSpaceTriggeredWrapper[inputId] = hasSpace;
                    });
                });
            });
        };
        RegisterIndividualController.$inject = [
            "HttpHelperService",
            "$location",
            "AuthenticationService",
            "DialogService",
            "CommonHelperService",
            "$templateCache",
            "$window",
            "ngDialog",
            "arabamConfigFactory",
            "$scope",
            "$q"
        ];
        return RegisterIndividualController;
    }());
    // password compare directive
    angular
        .module("arabam")
        .controller("RegisterIndividualController", RegisterIndividualController);
})(arabam || (arabam = {}));
