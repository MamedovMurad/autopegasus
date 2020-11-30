var arabam;
(function (arabam) {
    var HttpHelperService = /** @class */ (function () {
        function HttpHelperService($http, DialogService) {
            this.$http = $http;
            this.DialogService = DialogService;
            this.defaultMessage = "İşleminiz şu anda gerçekleştirilemiyor, lütfen daha sonra tekrar deneyiniz. Hata kodu: fe500";
            this.defaultNoConnectionMessage = "Internet bağlantınız koptuğu için işleminiz gerçekleştirilemedi. Lütfen bağlantınızı kontrol ediniz";
        }
        HttpHelperService.prototype.httpGet = function (url, successCallback, errorCallback, headers, params) {
            // if (url.indexOf("?") > -1) {
            //     url += "&random=" + new Date().getTime();
            // } else {
            //     url += "?random=" + new Date().getTime();
            // }
            var _this = this;
            return this.$http
                .get(url, { "headers": headers, "params": params })
                .success(successCallback)
                .error(function (res) {
                var online = window.navigator.onLine;
                if (!res && (online === false || online === "false")) {
                    alert(_this.defaultNoConnectionMessage);
                    return;
                }
                if (!errorCallback) {
                    _this.DialogService.warning({
                        error: res && res.Message ? res.Message : _this.defaultMessage
                    });
                }
                else {
                    errorCallback(res);
                }
            });
        };
        HttpHelperService.prototype.httpGetWithData = function (url, data, successCallback, errorCallback, headers) {
            var _this = this;
            return this.$http({
                method: "GET",
                url: url,
                params: data,
                headers: { "Content-type": "text/html" }
            })
                .success(successCallback)
                .error(function (res) {
                var online = window.navigator.onLine;
                if (!res && (online === false || online === "false")) {
                    alert(_this.defaultNoConnectionMessage);
                    return;
                }
                if (!errorCallback) {
                    _this.DialogService.warning({
                        error: res && res.Message ? res.Message : _this.defaultMessage
                    });
                }
                else {
                    errorCallback(res);
                }
            });
        };
        HttpHelperService.prototype.httpPost = function (url, data, successCallback, errorCallback, headers) {
            var self = this;
            return this.$http
                .post(url, data, { headers: headers })
                .success(function (res) {
                if (res && res.Success) {
                    successCallback(res);
                }
                else {
                    if (res && res.Code === 401) {
                        window.location.href =
                            "/uyelik?returnUrl=" +
                                window.location.pathname +
                                window.location.search;
                    }
                    if (res && res.Code === 913) {
                        self.DialogService.titleContentConfirm(function () {
                            return self.$http
                                .post("/Authentication/SendActivation", {})
                                .success(function (response) {
                                if (response && response.Success) {
                                    self.DialogService.success({
                                        message: response.Message,
                                        closeAllDialogs: true
                                    });
                                }
                            })
                                .error(function (response) {
                                self.DialogService.warning({ error: response.Message });
                            });
                        }, {
                            message: "E-Posta Adresi Doğrulama",
                            mail: res.Message,
                            confirm: "Tekrar Gönder",
                            cancel: "Vazgeç"
                        }, function () {
                            self.DialogService.closeAll();
                        });
                        return false;
                    }
                    // todo: telefon valide degilse
                    if (res && res.Code === 914) {
                        successCallback(res);
                        return false;
                    }
                    if (res && res.Code === 903) {
                        window.location.href = "/Membership/MembershipAgreement";
                    }
                    // todo: telefon valide ve eposta yoksa
                    // if (res && res.Code === 906) {
                    //     successCallback(res);
                    //     return false;
                    // }
                    if (!errorCallback) {
                        self.DialogService.warning({
                            error: res && res.Message ? res.Message : self.defaultMessage
                        });
                    }
                    else {
                        errorCallback(res);
                    }
                }
            })
                .error(function (res) {
                var online = window.navigator.onLine;
                if (!res && (online === false || online === "false")) {
                    alert(self.defaultNoConnectionMessage);
                    return;
                }
                if (!errorCallback) {
                    self.DialogService.warning({
                        error: res && res.Message ? res.Message : self.defaultMessage
                    });
                }
                else {
                    errorCallback(res);
                }
            });
        };
        HttpHelperService.prototype.httpPut = function (url, data, successCallback, errorCallback, headers) {
            var self = this;
            return this.$http
                .put(url, data, { headers: headers })
                .success(function (res) {
                if (res.Success) {
                    successCallback(res);
                }
                else {
                    if (res.Code === 401) {
                        window.location.href =
                            "/uyelik?returnUrl=" +
                                window.location.pathname +
                                window.location.search;
                    }
                    if (!errorCallback) {
                        self.DialogService.warning({
                            error: res && res.Message ? res.Message : self.defaultMessage
                        });
                    }
                    else {
                        errorCallback(res);
                    }
                }
            })
                .error(function (res) {
                var online = window.navigator.onLine;
                if (!res && (online === false || online === "false")) {
                    alert(self.defaultNoConnectionMessage);
                    return;
                }
                if (!errorCallback) {
                    self.DialogService.warning({
                        error: res && res.Message ? res.Message : self.defaultMessage
                    });
                }
                else {
                    errorCallback(res);
                }
            });
        };
        HttpHelperService.prototype.httpDelete = function (url, successCallback, errorCallback, headers) {
            var self = this;
            return this.$http
                .delete(url, { headers: headers })
                .success(function (res) {
                if (res.Success) {
                    successCallback(res);
                }
                else {
                    if (res.Code === 401) {
                        window.location.href =
                            "/uyelik?returnUrl=" +
                                window.location.pathname +
                                window.location.search;
                    }
                    if (!errorCallback) {
                        self.DialogService.warning({
                            error: res && res.Message ? res.Message : self.defaultMessage
                        });
                    }
                    else {
                        errorCallback(res);
                    }
                }
            })
                .error(function (res) {
                var online = window.navigator.onLine;
                if (!res && (online === false || online === "false")) {
                    alert(self.defaultNoConnectionMessage);
                    return;
                }
                if (!errorCallback) {
                    self.DialogService.warning({
                        error: res && res.Message ? res.Message : self.defaultMessage
                    });
                }
                else {
                    errorCallback(res);
                }
            });
        };
        HttpHelperService.prototype.httpFilePost = function (url, data, successCallback, errorCallback, headers) {
            // noinspection JSUnusedLocalSymbols
            var self = this;
        };
        HttpHelperService.prototype.httpGetWithPromise = function (url, headers, params) {
            return this.$http.get(url, {
                "params": params,
                "headers": headers
            }).then(function (result) { return result.data; });
        };
        HttpHelperService.prototype.httpPostWithPromise = function (url, data, headers) {
            return this.$http
                .post(url, data, { headers: headers })
                .then(function (result) { return result.data; });
        };
        HttpHelperService.$inject = ["$http", "DialogService"];
        return HttpHelperService;
    }());
    arabam.HttpHelperService = HttpHelperService;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).service("HttpHelperService", HttpHelperService);
})(arabam || (arabam = {}));
