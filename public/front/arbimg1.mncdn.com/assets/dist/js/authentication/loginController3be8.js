var arabam;
(function (arabam) {
    var LoginRequest = /** @class */ (function () {
        function LoginRequest() {
        }
        return LoginRequest;
    }());
    arabam.LoginRequest = LoginRequest;
    var LoginController = /** @class */ (function () {
        function LoginController(httpHelperService, AuthenticationService, DialogService, CommonHelperService, $window, $scope, ngDialog, arabamConfigFactory, $q, FB, $sce) {
            this.httpHelperService = httpHelperService;
            this.AuthenticationService = AuthenticationService;
            this.DialogService = DialogService;
            this.CommonHelperService = CommonHelperService;
            this.$window = $window;
            this.$scope = $scope;
            this.ngDialog = ngDialog;
            this.arabamConfigFactory = arabamConfigFactory;
            this.$q = $q;
            this.FB = FB;
            this.$sce = $sce;
            this.inputNumber = false;
            this.googleAvailable = false;
            this.blurred = false;
            this.disableAppSendButton = false;
            this.validatedFromJquery = false;
            this.memberShipIsNotActive = false;
            this.init();
        }
        LoginController.prototype.postLoginForm = function (formName) {
            var _this = this;
            var self = this;
            var reCaptchaCode = $(".g-recaptcha-response").val();
            if (reCaptchaCode == null || reCaptchaCode == "") {
                $(".g-recaptcha").addClass("not-validation");
                setTimeout(function () {
                    $(".g-recaptcha").removeClass("not-validation");
                }, 2000);
                return false;
            }
            else {
                this.loginRequest.GRecaptcha = reCaptchaCode;
            }
            if (formName.$valid) {
                if (self.inputNumber) {
                    self.loginRequest.userName = self.inputNumberValidated;
                }
                this.AuthenticationService.httpPost("/authentication/login/", this.loginRequest, function (res) {
                    grecaptcha.reset();
                    var cbSuccess = function () {
                        // self.campaignResultOps(campaignResult, res);
                        self.delegateToFirebase();
                        self.callSegmentifyLoginOps(res);
                        self.postSuccessLoginOps(res);
                    };
                    if (res.Data && res.Data.Code === 903) {
                        var UserWorkContext = res.Data.UserWorkContext;
                        if (UserWorkContext.Type == 1 &&
                            !!UserWorkContext.IndividualMember &&
                            UserWorkContext.IndividualMember.AgreementAccepted == 2) {
                            //ASD-5683
                            _this.DialogService.confirmAgreement({}).then(function (popupResponse) {
                                if (typeof popupResponse == "string") {
                                    cbSuccess();
                                    return;
                                }
                                _this.httpHelperService
                                    .httpPostWithPromise("/panelim/api/agreementIndividual", {
                                    memberHasAgreed: popupResponse.triggered
                                })
                                    .then(function (data) {
                                    if (!data.Success) {
                                        _this.DialogService.warning({ error: data.Message });
                                    }
                                    else {
                                        cbSuccess();
                                    }
                                })
                                    .catch(function (err) {
                                    _this.DialogService.warning({ error: err.Message });
                                });
                            });
                            return;
                        }
                        else if (UserWorkContext.Type == 2) {
                            window.location.href = "/Membership/MembershipAgreement";
                            return;
                        }
                    }
                    // missing telephone verify
                    if (res.Data && res.Data.Code == 914) {
                        self.DialogService.updatePhone({
                            callBack: cbSuccess,
                            validationNumber: self.loginRequest.userName,
                            UId: res.Data.UId
                        });
                        return false;
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
                }, function (res) {
                    // goog face login
                    grecaptcha.reset();
                    if (res.Code === 975) {
                        return self.DialogService.openConfirm(function () {
                            self.googleLogin();
                        }, {
                            headerOptions: {
                                title: "Hoşgeldiniz!"
                            },
                            bodyOptions: {
                                message: res.Message,
                                alignCenter: true,
                                centerIcon: "w100 ma tac mb16 pb16 icon-arabam-info fz60 color-red4 "
                            },
                            footerOptions: {
                                acceptLabel: "Google ile giriş yap",
                                acceptClass: "btn btn-lightgray20182",
                                acceptIconClass: "fa fa-google-plus font-default-plusmore pr8",
                                rejectLabel: "Facebook ile giriş yap",
                                rejectClass: "btn btn-lightgray20182",
                                rejectIconClass: "fa fa-facebook-f font-default-plusmore pr8",
                                showClose: true
                            }
                        }, function (quitArgs) {
                            if (typeof quitArgs == "string") {
                                return;
                            }
                            self.checkLoginState();
                        });
                    }
                    if (res.Code === 403) {
                        self.memberShipIsNotActive = true;
                    }
                    else {
                        _this.DialogService.warning({ error: res.Message });
                    }
                });
            }
            else {
                self.CommonHelperService.logFormErrorsToDataLayer(formName, "Üye Girişi");
            }
        };
        LoginController.prototype.callSegmentifyLoginOps = function (res) {
            var userId = res.Data.UserWorkContext.UserId;
            this.CommonHelperService.setSegmentifyLoginOps("signin", userId);
        };
        LoginController.prototype.delegateToFirebase = function () {
            var self = this;
            if (!window.messaging) {
                return;
            }
            window.messaging.getToken().then(function (fbToken) {
                self.CommonHelperService.registerFirebaseToken(fbToken, function (res) {
                    self.CommonHelperService.setCookie("firebaseToken", fbToken, 365);
                }, function (err) {
                    console.info("token register/unregister fail", err);
                }, {
                    isNotLoading: true
                });
            });
        };
        LoginController.prototype.postSuccessLoginOps = function (res) {
            var _this = this;
            var self = this;
            self.CommonHelperService.setDataLayerVp("/vp/UyeGirisiBasarili", "virtualPageView", true);
            self.AuthenticationService.httpGet("/campaign/loginCampaign", function (resp) {
                sessionStorage.removeItem("bidToken");
                if (resp.Data != null && resp.Data.Url) {
                    var retUrl = self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                    var campUrl = self.CommonHelperService.getWithSlash(resp.Data.Url);
                    if (retUrl != campUrl) {
                        window.location.href =
                            window.location.origin + self.CommonHelperService.getWithSlash(resp.Data.Url) + window.location.search;
                    }
                    else {
                        window.location.href = window.location.origin + self.CommonHelperService.getWithSlash(resp.Data.Url);
                    }
                }
                else {
                    window.location.href = window.location.origin + self.CommonHelperService.getParameterByNameWithSlash("returnUrl");
                }
            }, function () {
                window.location.href = window.location.origin + _this.CommonHelperService.getParameterByNameWithSlash("returnUrl");
            });
        };
        LoginController.prototype.checkInputNumber = function (input) {
            var self = this;
            var isDigit = !isNaN(parseFloat(input)) && isFinite(input);
            this.inputNumber = isDigit;
            this.blurred = true;
            if (isDigit && input.length >= 10) {
                input = input.substr(-10);
                self.inputNumberValidated = input;
            }
        };
        LoginController.prototype.resendActivationCode = function () {
            var _this = this;
            this.AuthenticationService.httpPost("/authentication/sendActivation/", { email: this.loginRequest.userName }, function (res) {
                _this.DialogService.success({ message: res.Message });
                _this.memberShipIsNotActive = false;
            });
        };
        LoginController.prototype.individualActivation = function (formName) {
            var _this = this;
            var formMail = $("input[name='email']").val();
            if (formName.$valid) {
                this.AuthenticationService.httpPost("/authentication/sendActivation/", { email: formMail }, function (res) {
                    _this.DialogService.success({ message: res.Message });
                });
            }
        };
        LoginController.prototype.init = function () {
            var _this = this;
            var self = this;
            self.loginRequest = new LoginRequest();
            self.loginRequest.rememberMe = true;
            self.initializeGoogleLogin();
            setTimeout(function () {
                _this.$scope.$apply(function () {
                    $("input[ng-model]").trigger("change");
                });
            }, 1500);
        };
        LoginController.prototype.checkLoginState = function () {
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
        LoginController.prototype.fblogin = function (accessTokenStr) {
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
                            if (campaignResult.Data != null && campaignResult.Data.Url) {
                                var campUrl = self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                                if (retUrl != campUrl) {
                                    _this.pathToGo =
                                        window.location.origin +
                                            self.CommonHelperService.getWithSlash(campaignResult.Data.Url) +
                                            window.location.search;
                                }
                                else {
                                    _this.pathToGo = window.location.origin + self.CommonHelperService.getWithSlash(campaignResult.Data.Url);
                                }
                            }
                            window.location = _this.pathToGo;
                        }, function () {
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
                    self.ngDialog.openConfirm({
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
                    });
                }
            }, function (err) {
                self.DialogService.warning({
                    error: err.Message
                });
            }, { isNotLoading: true });
        };
        LoginController.prototype.initializeGoogleLogin = function () {
            var self = this;
            if (!!self.$window.gapi) {
                self.googleAvailable = true;
                return;
            }
            if (self.$window.loadScriptsWithCb) {
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
            }
        };
        LoginController.prototype.googleLogin = function () {
            var self = this;
            if (self.googleAvailable && self.$window.gapi && self.$window.gapi.auth2) {
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
                            cache: false,
                            controller: "KvkkController",
                            controllerAs: "self"
                        });
                    }
                    else {
                        self.CommonHelperService.setDataLayerVp("/vp/GoogleIleGirisBasarili", "virtualPageView", true);
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
                    var name = googleRegisterResult.Data.UserWorkContext.Name + " " + googleRegisterResult.Data.UserWorkContext.Surname;
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
        LoginController.prototype.doGoogleLogin = function () {
            var self = this;
            var GoogleAuth = self.$window.gapi.auth2.getAuthInstance();
            return GoogleAuth.signIn();
        };
        LoginController.prototype.checkGoogleRegister = function (data) {
            var self = this;
            return self.httpHelperService.httpPostWithPromise("/authentication/google-check-register", data);
        };
        LoginController.prototype.registerWithGoogle = function (data) {
            var self = this;
            return self.httpHelperService.httpPostWithPromise("/authentication/google", data);
        };
        /* password show hide */
        LoginController.prototype.hideShowPassword = function () {
            this.inputType = this.inputType == "password" ? "text" : "password";
        };
        /* password show hide */
        LoginController.prototype.capslockOnOff = function () {
            $("input[type='password']").keypress(function (e) {
                var s = String.fromCharCode(e.which);
                if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
                    alert("caps is on");
                }
            });
        };
        LoginController.prototype.sendActivationEvent = function () {
            var self = this;
            self.CommonHelperService.setDataLayerVp("/vp/bireyselAktivasyonBasarili", "virtualPageView", true);
        };
        LoginController.prototype.sendAppUrlToPhoneWithSMS = function (formName) {
            var _this = this;
            this.formErrorMessage = null;
            this.formSuccessMessage = null;
            this.disableAppSendButton = true;
            if (formName.$valid) {
                this.httpHelperService
                    .httpPostWithPromise("/help/SendAppUrl", {
                    phoneNumber: this.mobilePhoneNumber
                })
                    .then(function (response) {
                    _this.disableAppSendButton = false;
                    _this.formSuccessMessage = "Uygulamalarımızı indirebileceğiniz link telefonunuza SMS olarak gönderilmiştir.";
                })
                    .catch(function (error) { return (_this.formErrorMessage = error.message); });
            }
            else {
                this.formErrorMessage = "Telefon numaranızı doğru girdiğinizden emin olunuz!";
                this.disableAppSendButton = false;
            }
        };
        LoginController.$inject = [
            "HttpHelperService",
            "AuthenticationService",
            "DialogService",
            "CommonHelperService",
            "$window",
            "$scope",
            "ngDialog",
            "arabamConfigFactory",
            "$q",
            "$sce"
        ];
        return LoginController;
    }());
    angular.module("arabam").controller("LoginController", LoginController);
})(arabam || (arabam = {}));
