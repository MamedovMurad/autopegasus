var arabam;
(function (arabam) {
    var FirmDetailController = /** @class */ (function () {
        function FirmDetailController(HttpHelperService, $compile, $scope, $timeout, ngDialog, DialogService, moment, AnalyticsService, $location) {
            this.HttpHelperService = HttpHelperService;
            this.$compile = $compile;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.ngDialog = ngDialog;
            this.DialogService = DialogService;
            this.moment = moment;
            this.AnalyticsService = AnalyticsService;
            this.$location = $location;
            this.followInProcess = false;
            this.visible = "search";
            this.showSearchLoading = false;
            this.isMobile = window.configuration.IsMobile;
            this.init();
        }
        FirmDetailController.prototype.follow = function () {
            var self = this;
            self.followInProcess = true;
            self.HttpHelperService.httpPost("/favoritefirm/add", {
                Id: self.galleryId
            }, function (res) {
                if (res.Success) {
                    self.firm.IsFavorited = true;
                    self.AnalyticsService.setDataLayer("Galeri Ilan Listeleme", "Takip Et", "Click", "gaEvent", true);
                    var el = document.getElementById("follower-count");
                    if (el) {
                        var count = parseInt(el.innerHTML);
                        count++;
                        el.innerHTML = count + "";
                    }
                }
                self.followInProcess = false;
            }, function (err) {
                self.followInProcess = false;
            }, { isNotLoading: true });
        };
        FirmDetailController.prototype.unfollow = function () {
            var self = this;
            self.followInProcess = true;
            self.HttpHelperService.httpDelete("/favoritefirm/delete?id=" + self.galleryId, function (res) {
                if (res.Success) {
                    self.firm.IsFavorited = false;
                    self.AnalyticsService.setDataLayer("Galeri Ilan Listeleme", "Takibi Bırak", "Click", "gaEvent", true);
                    var el = document.getElementById("follower-count");
                    if (el) {
                        var count = parseInt(el.innerHTML);
                        count--;
                        el.innerHTML = count + "";
                    }
                }
                self.followInProcess = false;
            }, function (err) {
                self.followInProcess = false;
            }, { isNotLoading: true });
        };
        FirmDetailController.prototype.goToAboutTabAndFocusMap = function () {
            this.visible = "about";
            this.AnalyticsService.setDataLayer("Galeri Ilan Listeleme", "Haritada Goster", "Click", "gaEvent", true);
            this.$timeout(function () {
                var el = document.getElementById("map");
                if (el) {
                    el.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    });
                }
            }, 100);
        };
        FirmDetailController.prototype.complaint = function (id) {
            var _this = this;
            var self = this;
            this.AnalyticsService.setDataLayer("Galeri Ilan Listeleme", "Yorumlar-Sikayet Et", "Click", "gaEvent", true);
            this.ngDialog
                .openConfirm({
                template: "complainModalTemplate.html",
                className: "ngdialog-theme-arabam2018",
                data: {
                    footerOptions: {
                        acceptLabel: "Gönder",
                        rejectLabel: "Vazgeç"
                    }
                }
            })
                .then(function (data) {
                if (data && data.length >= 10) {
                    return _this.HttpHelperService.httpPostWithPromise("/firmreview/PostFirmReviewComplaint", {
                        ReviewId: id,
                        Complaint: data
                    });
                }
                else {
                    self.DialogService.warning({
                        title: "Hata",
                        error: "Şikayet metni en az 10 karakter olmalıdır."
                    });
                }
            })
                .then(function (complaintResult) {
                if (complaintResult && complaintResult.Success) {
                    self.DialogService.warning({
                        title: "İşlem Başarılı",
                        error: "İşlem başarıyla tamamlanmıştır."
                    });
                }
            })
                .catch(function (error) {
                /*self.DialogService.warning({
                          title: "Hata",
                          error: error
                      });*/
            });
        };
        FirmDetailController.prototype.calculateMembershipDateSinceValue = function (date) {
            var formattedDate = this.moment(date);
            var now = this.moment();
            /** gun cinsinden hesapla, 30dan buyukse ay cinsine gec */
            var days = now.diff(formattedDate, "days");
            if (days <= 30) {
                return "(Yeni \u00FCye)";
            }
            else {
                var months = now.diff(formattedDate, "months");
                if (months <= 11) {
                    return "(" + months + " Ayd\u0131r \u00FCye)";
                }
                else {
                    var years = now.diff(formattedDate, "years");
                    return "(" + years + " Y\u0131ld\u0131r \u00FCye)";
                }
            }
        };
        FirmDetailController.prototype.calculateLastSeenValue = function (date) {
            var formattedDate = this.moment(date);
            var now = this.moment();
            /** dakika cinsinden hesapla */
            var minutes = now.diff(formattedDate, "minutes");
            if (minutes < 60) {
                return "1 saatten az";
            }
            else {
                /** saat cinsinden hesapla */
                var hours = now.diff(formattedDate, "hours");
                if (hours < 24) {
                    return hours + " saat \u00F6nce";
                }
                else {
                    /** gun cinsinden hesapla, 30dan buyukse ay cinsine gec */
                    var days = now.diff(formattedDate, "days");
                    if (days < 7) {
                        return days + " g\u00FCn \u00F6nce";
                    }
                    else {
                        var weeks = now.diff(formattedDate, "weeks");
                        if (weeks < 4) {
                            return weeks + " hafta \u00F6nce";
                        }
                        else {
                            return "1 aydan fazla";
                        }
                    }
                }
            }
        };
        FirmDetailController.prototype.setTabEvent = function (tabName) {
            var tabNameEvent = tabName == "search"
                ? "Ilanlar Tab"
                : tabName == "about"
                    ? "Firma Hakkinda Tab"
                    : "Yorumlar Tab";
            this.AnalyticsService.setDataLayer("Galeri Ilan Listeleme", tabNameEvent, "Click", "gaEvent", true);
        };
        FirmDetailController.prototype.startLoginProcess = function () {
            this.DialogService.callLogin();
        };
        FirmDetailController.prototype.scrollDown = function (selector) {
            this.$timeout(function () {
                var el = document.querySelectorAll(selector);
                if (el && el[0]) {
                    el[0].scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "start"
                    });
                }
            }, 100);
        };
        FirmDetailController.prototype.setTabHash = function (hash) {
            this.$location.hash(hash);
        };
        FirmDetailController.prototype.init = function () {
            var self = this;
            var hash = this.$location.hash();
            if (hash) {
                self.visible = hash;
            }
        };
        FirmDetailController.$inject = [
            "HttpHelperService",
            "$compile",
            "$scope",
            "$timeout",
            "ngDialog",
            "DialogService",
            "moment",
            "AnalyticsService",
            "$location"
        ];
        return FirmDetailController;
    }());
    angular
        .module("arabam")
        .controller("firmDetailController", FirmDetailController);
})(arabam || (arabam = {}));
