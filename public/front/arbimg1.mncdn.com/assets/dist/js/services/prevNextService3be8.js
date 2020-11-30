var arabam;
(function (arabam) {
    var PrevNextService = /** @class */ (function () {
        function PrevNextService($rootScope, $window) {
            this.$rootScope = $rootScope;
            this.$window = $window;
            this.advertDetailPopupHidden = true;
            this.showAdvertDetailBackdrop = false;
            this.travelSize = 0;
            var self = this;
            this.rootScope = $rootScope;
            this.window = $window;
            self.adverts = [];
            self.advertId = "";
            self.currentAdvert = "";
        }
        /**
         *
         * localstorage oku ve listeyi doldur
         */
        PrevNextService.prototype.init = function () {
            var self = this;
            if (self.isBrowserCompatible()) {
                self.readLocalStorage();
            }
            return self.isBrowserCompatible();
        };
        PrevNextService.prototype.setCurrentAdvert = function (advertId) {
            var self = this;
            self.currentAdvert = advertId;
            return true;
        };
        PrevNextService.prototype.getCurrentAdvert = function () {
            var self = this;
            return self.currentAdvert;
        };
        PrevNextService.prototype.findIndexOfCurrentItem = function (idToCheck) {
            var self = this;
            if (self.adverts) {
                for (var index = 0; index < self.adverts.length; index++) {
                    var element = self.adverts[index];
                    if (element.advertId == (idToCheck || this.currentAdvert)) {
                        return index;
                    }
                }
                // bulamazsa -1 dön
                return -1;
            }
            else {
                return null;
            }
        };
        PrevNextService.prototype.getPreviousAdvertData = function (idToCheck) {
            var self = this;
            var index = self.findIndexOfCurrentItem(idToCheck);
            if (index < 0) {
                return self.adverts[self.adverts.length - 1];
            }
            else if (
            // 0. indexte değilsem
            index > 0 &&
                // en az iki ilan varsa
                self.adverts.length > 1) {
                return self.adverts[index - 1];
            }
            else {
                return null;
            }
        };
        PrevNextService.prototype.getNextAdvertData = function (idToCheck) {
            var self = this;
            var index = self.findIndexOfCurrentItem(idToCheck);
            if (
            // eger index toplam ilan sayisindan kucukse
            index < self.adverts.length) {
                return self.adverts[index + 1];
            }
            else {
                return null;
            }
        };
        PrevNextService.prototype.add = function (data) {
            var self = this;
            self.adverts = data.adverts;
            self.advertId = data.advertId;
            self.currentPage = data.currentPage;
            self.totalPage = data.totalPage;
            self.searchUrl = data.searchUrl;
            self.writeLocalStorage();
            return true;
        };
        PrevNextService.prototype.get = function () {
            var self = this;
            self.readLocalStorage();
            return {
                adverts: self.adverts,
                advertId: self.advertId,
                currentPage: self.currentPage,
                totalPage: self.totalPage,
                searchUrl: self.searchUrl
            };
        };
        /**
         * servisi temizler
         */
        PrevNextService.prototype.empty = function () {
            var self = this;
            self.adverts = [];
            self.advertId = "";
            self.writeLocalStorage();
            return true;
        };
        /**
         * listeyi local storage'a yaz
         */
        PrevNextService.prototype.writeLocalStorage = function () {
            var self = this;
            try {
                localStorage.setItem("prevNextAdverts", JSON.stringify({
                    advertId: self.advertId,
                    adverts: self.adverts,
                    currentPage: self.currentPage,
                    totalPage: self.totalPage,
                    searchUrl: self.searchUrl
                }));
            }
            catch (e) {
                return false;
            }
            return true;
        };
        /**
         * local storage'dan listeyi oku
         */
        PrevNextService.prototype.readLocalStorage = function () {
            var self = this;
            try {
                var temp = localStorage.getItem("prevNextAdverts");
                if (temp) {
                    var jsonTemp = JSON.parse(temp);
                    self.advertId = jsonTemp.advertId;
                    self.adverts = jsonTemp.adverts;
                    // tslint:disable-next-line:ban-comma-operator
                    (self.currentPage = jsonTemp.currentPage),
                        (self.totalPage = jsonTemp.totalPage),
                        (self.searchUrl = jsonTemp.searchUrl);
                }
            }
            catch (e) {
                return false;
            }
            return true;
        };
        /**
         * storage tipi mevcut mu
         * @param type
         */
        PrevNextService.prototype.storageAvailable = function (type) {
            try {
                var storage = this.$window[type];
                var x = "__storage_test__";
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        PrevNextService.prototype.isBrowserCompatible = function () {
            var self = this;
            var result = false;
            result = self.storageAvailable("localStorage");
            if (!result) {
                result = self.storageAvailable("sessionStorage");
            }
            return result;
        };
        PrevNextService.factory = function () {
            var instance = function ($rootScope, $window) { return new PrevNextService($rootScope, $window); };
            return instance;
        };
        PrevNextService.$inject = ["$rootScope", "$window"];
        return PrevNextService;
    }());
    arabam.PrevNextService = PrevNextService;
    angular
        .module("arabam")
        .factory("PrevNextService", [
        "$rootScope",
        "$window",
        PrevNextService.factory()
    ]);
})(arabam || (arabam = {}));
