var arabam;
(function (arabam) {
    var WizardResultController = /** @class */ (function () {
        function WizardResultController($state, $stateParams, DialogService, $timeout, $q, WizardService, $rootScope, CommonHelperService, arabamConfigFactory) {
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.DialogService = DialogService;
            this.$timeout = $timeout;
            this.$q = $q;
            this.WizardService = WizardService;
            this.$rootScope = $rootScope;
            this.CommonHelperService = CommonHelperService;
            this.arabamConfigFactory = arabamConfigFactory;
            this.isMobile = window.configuration.IsMobile;
            this.isWideScreen = window.isWideScreen;
            this.resultObj = {};
            this.imagePath = this.arabamConfigFactory.AssetBasePath;
            this.init();
        }
        WizardResultController.prototype.init = function () {
            this.renderResultPage();
        };
        WizardResultController.prototype.restartPoll = function () {
            this.$rootScope.$broadcast("changedState", {});
            this.$state.go(this.$state.$current.parent.name + ".poll", {
                adim: "1",
                stepData: null
            }, { reload: true });
        };
        WizardResultController.prototype.clickBrandCb = function (yetAnotherBrand) {
            var lab3l = yetAnotherBrand.Name + " / " + yetAnotherBrand.ParentCategoryName;
            this.CommonHelperService.setDataLayer("Arama Sihirbazi", "Success / Brand Click", lab3l, "", true);
        };
        WizardResultController.prototype.visited = function (yetAnotherModel, brandName, parentCategoryName) {
            yetAnotherModel.visited = true;
            var lab3l = brandName + " / " + parentCategoryName + " / " + yetAnotherModel.Name;
            this.CommonHelperService.setDataLayer("Arama Sihirbazi", "Success / Model Click", lab3l, null, true);
            window.open(yetAnotherModel.Url, "_blank");
        };
        WizardResultController.prototype.renderResultPage = function () {
            var _this = this;
            var wizardSessionId = this.$stateParams.session;
            this.resultObj = this.$stateParams.result;
            if (!this.resultObj && wizardSessionId) {
                this.WizardService.getResultPage(wizardSessionId).then(function (result) {
                    _this.resultObj = result.Data;
                });
            }
            this.CommonHelperService.setDataLayerVp("/vp/AramaSihirbazi/Success/" + wizardSessionId, "virtualPageView", true);
        };
        WizardResultController.$inject = [
            "$state",
            "$stateParams",
            "DialogService",
            "$timeout",
            "$q",
            "WizardService",
            "$rootScope",
            "CommonHelperService",
            "arabamConfigFactory"
        ];
        return WizardResultController;
    }());
    arabam.WizardResultController = WizardResultController;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).controller("wizardResultController", WizardResultController);
})(arabam || (arabam = {}));
