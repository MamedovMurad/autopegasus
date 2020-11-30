var arabam;
(function (arabam) {
    var SuggestToFriendController = /** @class */ (function () {
        function SuggestToFriendController($scope, $timeout, httpHelperService, CommonHelperService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.httpHelperService = httpHelperService;
            this.CommonHelperService = CommonHelperService;
            this.disableAppSendButton = false;
            this.isMobile = window.configuration.IsMobile;
            this.init();
        }
        SuggestToFriendController.prototype.init = function () {
            console.log('Initialized SuggestToFriendController');
        };
        SuggestToFriendController.prototype.checkIsNumber = function (event) {
            if (event.charCode >= 48 && event.charCode <= 57)
                return true;
            else
                event.preventDefault();
        };
        SuggestToFriendController.prototype.postLoginForm = function (formName) {
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
                    if (response.Success) {
                        _this.disableAppSendButton = false;
                        _this.formSuccessMessage = "Uygulamalarımızı indirebileceğiniz link telefonunuza SMS olarak gönderilmiştir.";
                    }
                    else {
                        _this.disableAppSendButton = false;
                        _this.formErrorMessage = response.Message;
                    }
                })
                    .catch(function (error) {
                    _this.formErrorMessage = error.message;
                });
            }
            else {
                this.formErrorMessage = "Telefon numaranızı doğru girdiğinizden emin olunuz!";
                this.disableAppSendButton = false;
            }
        };
        SuggestToFriendController.prototype.suggestToFriendSetDataLayer = function () {
            var self = this;
            self.CommonHelperService.setDataLayer('Arkadasına Oner', 'Uygulama linkini gönder', 'Click', 'gaEvent', true);
        };
        SuggestToFriendController.$inject = ["$scope", "$timeout", "HttpHelperService", "CommonHelperService"];
        return SuggestToFriendController;
    }());
    angular
        .module("arabam")
        .controller("SuggestToFriendController", SuggestToFriendController);
})(arabam || (arabam = {}));
