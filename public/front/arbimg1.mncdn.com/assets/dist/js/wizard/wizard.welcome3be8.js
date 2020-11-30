var arabam;
(function (arabam) {
    var WizardWelcomeController = /** @class */ (function () {
        function WizardWelcomeController($state, DialogService, $timeout, $q, WizardService, $rootScope, CommonHelperService) {
            this.$state = $state;
            this.DialogService = DialogService;
            this.$timeout = $timeout;
            this.$q = $q;
            this.WizardService = WizardService;
            this.$rootScope = $rootScope;
            this.CommonHelperService = CommonHelperService;
            this.isMobile = window.configuration.IsMobile;
            this.isWideScreen = window.isWideScreen;
            this.revertInProgress = false;
            this.stateBackTriggeredFromTimeline = false;
            this.answerObj = {};
            this.welcomeImg = window.AssetRoute("/dist/img/wizard/wizard-welcome.svg");
            this.init();
        }
        WizardWelcomeController.prototype.init = function () {
            angular.noop();
        };
        WizardWelcomeController.prototype.startPoll = function () {
            var _this = this;
            var el = document.getElementById("js-hook-for-smooth-title");
            var prom1se = this.$q.defer();
            var animateLeftTo = this.isMobile ? "l20" : "l100";
            el.classList.add(animateLeftTo);
            this.WizardService.postCurrentGetNextStep(this.stepData)
                .then(function (res) {
                if (res.Success) {
                    var wizardSessionId = res.Data.WizardSessionId;
                    var questionIndex = res.Data.Index;
                    _this.CommonHelperService.setDataLayerVp("/vp/AramaSihirbazi/Start/" + wizardSessionId, "virtualPageView", true);
                    _this.CommonHelperService.setDataLayerVp("/vp/AramaSihirbazi/Step" + questionIndex + "/" + wizardSessionId, "virtualPageView", true);
                    _this.stepData = res.Data;
                    prom1se.resolve(res.Data);
                }
                else {
                    prom1se.reject(null);
                    console.warn("fail", res);
                }
            })
                .catch(function (err) {
                prom1se.reject(null);
                _this.DialogService.warning({
                    error: err.Message
                });
            });
            this.stateChanger(prom1se.promise);
        };
        WizardWelcomeController.prototype.stateChanger = function (prom1se) {
            var self = this;
            var timeOutDelay = 800;
            self.$timeout(function () {
                prom1se
                    .then(function (response) {
                    var selectedAnswerLength = response.SelectedAnswersList.length;
                    var realStep = selectedAnswerLength > 0 && this.revertInProgress
                        ? response.SelectedAnswersList[selectedAnswerLength - 1]
                            .QuestionDisplayOrder
                        : response.Step;
                    self.$rootScope.$broadcast("changedState", {
                        brandCount: response.Brand,
                        modelCount: response.Model,
                        advertCount: response.Advert
                    });
                    self.$state.go(self.$state.$current.parent.name + ".poll", {
                        adim: realStep,
                        stepData: response
                    }, {
                        notify: !self.revertInProgress || self.stateBackTriggeredFromTimeline
                    });
                })
                    .catch(function (err) {
                    console.warn(err);
                });
            }, timeOutDelay);
        };
        WizardWelcomeController.$inject = [
            "$state",
            "DialogService",
            "$timeout",
            "$q",
            "WizardService",
            "$rootScope",
            "CommonHelperService"
        ];
        return WizardWelcomeController;
    }());
    arabam.WizardWelcomeController = WizardWelcomeController;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).controller("wizardWelcomeController", WizardWelcomeController);
})(arabam || (arabam = {}));
