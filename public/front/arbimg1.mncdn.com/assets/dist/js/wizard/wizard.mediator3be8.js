var arabam;
(function (arabam) {
    var WizardMediator = /** @class */ (function () {
        function WizardMediator($scope, $timeout, $state) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$state = $state;
            this.isMobile = window.configuration.IsMobile;
            this.counter = {
                brandCount: 99,
                modelCount: 999,
                advertCount: 99999
            };
            this.init();
        }
        WizardMediator.prototype.init = function () {
            var self = this;
            self.oldCounter = angular.copy(self.counter);
            self.$scope.$on("changedState", function (ev, args) {
                self.stateChanged(ev, args);
            });
        };
        WizardMediator.prototype.stateChanged = function (ev, args) {
            var _this = this;
            if (!args) {
                return;
            }
            this.smoothAnimate = true;
            this.isResultPage = !args.brandCount && !args.modelCount;
            this.oldCounter = angular.copy(this.counter);
            this.$timeout(function () {
                _this.counter = {
                    brandCount: args.brandCount,
                    modelCount: args.modelCount,
                    advertCount: args.advertCount
                };
                _this.domShowTime();
            }, 800);
        };
        WizardMediator.prototype.domShowTime = function () {
            var brandDom = document.getElementById("js-hook-brandCount");
            var modelDom = document.getElementById("js-hook-modelCount");
            var advertDom = document.getElementById("js-hook-advertCount");
            if (!advertDom) {
                return;
            }
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ".",
                decimal: ""
            };
            var advertShow = new CountUp(advertDom, this.oldCounter.advertCount, this.counter.advertCount || 99999, 0, 1.6, options);
            if (!advertShow.error) {
                advertShow.start();
            }
            else {
                console.info(advertShow.error);
            }
            if (!this.isResultPage) {
                var brandShow = new CountUp(brandDom, this.oldCounter.brandCount, this.counter.brandCount, 0, 0.8, options);
                var modelShow = new CountUp(modelDom, this.oldCounter.modelCount, this.counter.modelCount, 0, 1.2, options);
                if (!brandShow.error) {
                    brandShow.start();
                }
                else {
                    console.error(brandShow.error);
                }
                if (!modelShow.error) {
                    modelShow.start();
                }
                else {
                    console.error(modelShow.error);
                }
            }
        };
        WizardMediator.$inject = ["$scope", "$timeout", "$state"];
        return WizardMediator;
    }());
    arabam.WizardMediator = WizardMediator;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).controller("wizardMediator", WizardMediator);
})(arabam || (arabam = {}));
