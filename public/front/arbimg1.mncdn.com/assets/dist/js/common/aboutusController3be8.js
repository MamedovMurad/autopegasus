var arabam;
(function (arabam) {
    var AaboutUsController = /** @class */ (function () {
        function AaboutUsController(HttpHelperService, $rootScope) {
            this.HttpHelperService = HttpHelperService;
            this.$rootScope = $rootScope;
            this.msgSuccess = "";
            this.msgError = "";
            this.isMenuVisible = false;
        }
        AaboutUsController.prototype.sendApp = function () {
            var self = this;
            self.$rootScope.Properties.isLoadingVisible = true;
            self.HttpHelperService.httpPost("help/SendAppUrl", { PhoneNumber: self.phoneNumber }, function (res) {
                if (res.Success) {
                    self.msgSuccess = res;
                    self.$rootScope.Properties.isLoadingVisible = false;
                }
            }, function (err) {
                self.msgError = err;
                self.$rootScope.Properties.isLoadingVisible = false;
            });
        };
        /* help/GetNewsAboutUs?page=1 */
        AaboutUsController.$inject = ["HttpHelperService", "$rootScope"];
        return AaboutUsController;
    }());
    angular.module("arabam").controller("aboutusController", AaboutUsController);
})(arabam || (arabam = {}));
