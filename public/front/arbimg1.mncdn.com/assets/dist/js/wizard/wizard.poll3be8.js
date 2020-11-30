var arabam;
(function (arabam) {
    var WizardPollController = /** @class */ (function () {
        function WizardPollController($state, $stateParams, DialogService, $timeout, $q, WizardService, $rootScope, CommonHelperService) {
            this.$state = $state;
            this.$stateParams = $stateParams;
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
            this.showMobilePopup = false;
            this.sideBtnClasses = {};
            this.answerObj = {};
            this.priceObj = {};
            this.resultObj = {};
            this.init();
        }
        WizardPollController.prototype.init = function () {
            this.stepData = !this.$stateParams.stepData
                ? {
                    StepId: 0,
                    SelectedOptions: []
                }
                : this.$stateParams.stepData;
            if (!!this.$stateParams.adim) {
                if (!!this.$stateParams.stepData) {
                    this.startDomOps();
                }
                else {
                    this.startPoll();
                    // this.$state.go(this.$state.$current.parent.name + ".welcome");
                }
            }
            else {
                this.startPoll();
                this.sideBtnClasses = { next: true, prev: false };
            }
        };
        WizardPollController.prototype.startPoll = function () {
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
        WizardPollController.prototype.pulseClickCb = function (n) {
            if (this.isMobile) {
                this.popupIsVisible("true");
            }
            else {
                this.manageLink(n, true);
            }
        };
        WizardPollController.prototype.startDomOps = function () {
            var _this = this;
            window.onpopstate = function (event) {
                _this.goBackCb(document.location.search);
            };
            this.answerObj = {};
            this.$timeout(function () {
                var liElem = document.getElementById("jsh" + _this.$stateParams.adim);
                var el = document.getElementById("js-hook-for-scroll-progress-bar");
                var childEl = document.getElementById("js-hook-for-calculate-child");
                var oneStickWidth = _this.isMobile ? 48 : _this.isWideScreen ? 144 : 124;
                var stickPadding = _this.isMobile ? 96 : _this.isWideScreen ? 72 : 188;
                if (!!_this.stepData && _this.stepData.TotalStep > 0) {
                    var totalWidth = _this.stepData.TotalStep * oneStickWidth + stickPadding;
                    childEl.style.width = totalWidth + "px";
                }
                if (!liElem) {
                    if (!!childEl) {
                        $(el).animate({ scrollLeft: childEl.offsetWidth }, 0);
                    }
                    _this.prevNextClassResolver({ next: false, prev: true });
                    return;
                }
                var bufferWidth = _this.isMobile ? 48 : 240;
                var needsScroll = liElem.offsetLeft - bufferWidth > el.offsetWidth;
                if (needsScroll) {
                    $(el).animate({ scrollLeft: liElem.offsetLeft - el.offsetWidth }, 0);
                    _this.prevNextClassResolver({ next: false, prev: false });
                }
                else {
                    _this.prevNextClassResolver({ next: true, prev: false });
                }
            }, 0);
        };
        WizardPollController.prototype.goBackCb = function (searchStr) {
            var stepId = searchStr.replace("?adim=", "");
            var backObjIndice = this.CommonHelperService.findInArray(this.stepData.SelectedAnswersList, "QuestionDisplayOrder", +stepId);
            if (backObjIndice != -1) {
                this.revertInProgress = true;
                this.manageLink(backObjIndice);
            }
        };
        WizardPollController.prototype.scrollX = function (type) {
            var el = document.getElementById("js-hook-for-scroll-progress-bar");
            var childEl = document.getElementById("js-hook-for-calculate-child");
            var isNext = type == "next";
            var calculatedLeft = isNext ? childEl.offsetWidth : 0;
            $(el).animate({ scrollLeft: calculatedLeft }, 400);
            this.prevNextClassResolver({ next: !isNext, prev: isNext });
        };
        WizardPollController.prototype.popupIsVisible = function (visibility) {
            this.showMobilePopup = visibility == "true";
        };
        WizardPollController.prototype.prevNextClassResolver = function (prevNextObj) {
            this.sideBtnClasses.prev = prevNextObj.prev;
            this.sideBtnClasses.next = prevNextObj.next;
        };
        WizardPollController.prototype.endPoll = function () {
            var endPollData = {};
            var priceForEndPoll = {};
            var selectedOpts = this.mapSelectedOptions();
            priceForEndPoll = Object.assign({}, this.priceObj);
            Object.keys(priceForEndPoll).forEach(function (key, index) {
                var stringToNumber = +priceForEndPoll[key];
                priceForEndPoll[key] = stringToNumber;
            });
            endPollData.SelectedOptions = selectedOpts;
            endPollData = Object.assign(priceForEndPoll, endPollData);
            this.finalizePoll(endPollData);
        };
        WizardPollController.prototype.stateChanger = function (prom1se) {
            var self = this;
            var timeOutDelay = 0;
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
        WizardPollController.prototype.manageLink = function (n, stateBackTriggeredFromTimeline) {
            if (n >= this.stepData.Index) {
                return;
            }
            if (this.isMobile) {
                this.popupIsVisible("false");
            }
            this.stateBackTriggeredFromTimeline = stateBackTriggeredFromTimeline;
            this.submitAndswerAndProceed(n);
        };
        WizardPollController.prototype.resolveText = function (n, isMobile) {
            var num = this.isMobile ? n + 1 : n;
            return !!this.stepData.SelectedAnswersList[num]
                ? this.stepData.SelectedAnswersList[num].Text
                : !!isMobile
                    ? "Cevaplanmadı"
                    : n + 1 + ". Soru";
        };
        WizardPollController.prototype.mapSelectedOptions = function (stepBackTo) {
            if (!this.stepData ||
                !this.stepData.SelectedAnswersList ||
                this.stepData.SelectedAnswersList.length < 1 ||
                stepBackTo == 0) {
                return [];
            }
            var tmpArr = [];
            var forArr = !!stepBackTo || stepBackTo != undefined
                ? this.stepData.SelectedAnswersList.slice(0, stepBackTo)
                : this.stepData.SelectedAnswersList;
            forArr.map(function (selectedAnswer) {
                tmpArr.push(selectedAnswer.Id);
            });
            this.stepData.SelectedAnswersList = forArr;
            return tmpArr;
        };
        WizardPollController.prototype.submitAnswer = function (answer) {
            this.stepData.SelectedAnswersList.push(answer);
            this.submitAndswerAndProceed();
        };
        WizardPollController.prototype.submitAndswerAndProceed = function (stepBackTo) {
            var currentStep = +this.$stateParams.adim;
            var pollData = {};
            var reverting = !!stepBackTo || stepBackTo != undefined;
            this.revertInProgress = reverting;
            pollData.StepId = currentStep;
            if (reverting) {
                pollData.StepId =
                    stepBackTo < 1
                        ? 0
                        : this.stepData.SelectedAnswersList[stepBackTo - 1]
                            .QuestionDisplayOrder;
            }
            pollData.SelectedOptions = reverting
                ? this.mapSelectedOptions(stepBackTo)
                : this.mapSelectedOptions();
            if (this.stepData.LastQuestion && !this.stepData.AskPrice) {
                delete pollData.StepId;
                this.finalizePoll(pollData);
            }
            else {
                this.postCurrentGetNext(pollData);
            }
        };
        WizardPollController.prototype.postCurrentGetNext = function (data) {
            var _this = this;
            var prom1se = this.$q.defer();
            this.WizardService.postCurrentGetNextStep(data)
                .then(function (res) {
                if (res.Success) {
                    if (res.Data.Advert == 0) {
                        return _this.DialogService.warning({
                            error: "Sonuç bulamadık. Seçimini değiştirerek tekrar dene!",
                            title: "Sonuç Bulunamadı"
                        }).then(function () {
                            _this.manageLink(res.Data.Index - 2, true);
                        });
                    }
                    var wizardSessionId = res.Data.WizardSessionId;
                    var questionIndex = res.Data.Index;
                    var dontAskPrice = res.Data.Model < 10 || !res.Data.AskPrice;
                    _this.CommonHelperService.setDataLayerVp("/vp/AramaSihirbazi/Step" + questionIndex + "/" + wizardSessionId, "virtualPageView", true);
                    _this.stepData = res.Data;
                    if (_this.stepData.LastQuestion && dontAskPrice) {
                        _this.stepData.AskPrice = false;
                        _this.submitAndswerAndProceed();
                    }
                    prom1se.resolve(res.Data);
                }
                else {
                    _this.DialogService.warning({
                        error: res.Message
                    });
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
        WizardPollController.prototype.finalizePoll = function (data) {
            var _this = this;
            this.WizardService.finalizePoll(data)
                .then(function (res) {
                if (res.Success) {
                    if (res.Data.AdvertCount == 0) {
                        return _this.DialogService.warning({
                            error: "Sonuç bulamadık. Seçimini değiştirerek tekrar dene!",
                            title: "Sonuç Bulunamadı"
                        });
                    }
                    _this.$rootScope.$broadcast("changedState", {
                        brandCount: null,
                        modelCount: null,
                        advertCount: res.Data.AdvertCount
                    });
                    _this.$state.go(_this.$state.$current.parent.name + ".result", {
                        session: res.Data.WizardSessionId,
                        result: res.Data
                    });
                }
                else {
                    console.warn("fail", res);
                }
            })
                .catch(function (err) {
                _this.DialogService.warning({
                    error: err.Message
                });
            });
        };
        WizardPollController.$inject = [
            "$state",
            "$stateParams",
            "DialogService",
            "$timeout",
            "$q",
            "WizardService",
            "$rootScope",
            "CommonHelperService"
        ];
        return WizardPollController;
    }());
    arabam.WizardPollController = WizardPollController;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).controller("wizardPollController", WizardPollController);
})(arabam || (arabam = {}));
