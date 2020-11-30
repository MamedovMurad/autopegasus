var arabam;
(function (arabam) {
    var autoClubController = /** @class */ (function () {
        function autoClubController(HttpHelperService, $window, CommonHelperService) {
            this.HttpHelperService = HttpHelperService;
            this.$window = $window;
            this.CommonHelperService = CommonHelperService;
            this.campaignCode1 = null;
            this.campaignCode2 = null;
            this.init();
        }
        autoClubController.prototype.init = function () {
            this.bindClickToFaq();
        };
        autoClubController.prototype.bindClickToFaq = function () {
            var faqElements = document.querySelectorAll(".faq-items-container .faq-item .faq-title");
            var arrayOFElements = Array.prototype.slice.call(faqElements);
            // (window as any).dataLayer.push({
            //   CD_Pagetype: "Nakit Sat/Start"
            // });
            arrayOFElements.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    if (item.parentNode.classList.contains("show")) {
                        item.parentNode.classList.remove("show");
                    }
                    else {
                        item.parentNode.classList.add("show");
                    }
                }, false);
            });
        };
        // getCode1(CampaignId: string) {
        //   this.campaignCode1 = this.getCompanyCode(CampaignId);
        //   console.log("campaignCode1", this.campaignCode1);
        // }
        // getCode2(CampaignId: string) {
        //   this.campaignCode2 = this.getCompanyCode(CampaignId);
        //   console.log("campaignCode2", this.campaignCode2);
        // }
        autoClubController.prototype.getCompanyCode = function (CampaignId, campaignNo) {
            var _this = this;
            var request = {
                CampaignId: CampaignId
            };
            this.HttpHelperService.httpPost("/campaign/PromotionCode", request, function (res) {
                if (res.Success == true) {
                    if (campaignNo == 1) {
                        _this.campaignCode1 = res.Data.Code;
                    }
                    else if (campaignNo == 2) {
                        _this.campaignCode2 = res.Data.Code;
                    }
                }
            });
        };
        autoClubController.prototype.rejectCompanyCode = function (CampaignId) {
            var _this = this;
            var request = {
                campaignId: CampaignId,
                answerType: 2
            };
            this.HttpHelperService.httpPost("/campaign/answer", request, function (res) {
                _this.go();
            });
        };
        autoClubController.prototype.go = function () {
            window.location.href =
                window.location.origin +
                    this.CommonHelperService.getParameterByNameWithSlash("returnUrl");
        };
        autoClubController.$inject = ["HttpHelperService", "$window", "CommonHelperService"];
        return autoClubController;
    }());
    angular.module("arabam").controller("autoClubController", autoClubController);
})(arabam || (arabam = {}));
