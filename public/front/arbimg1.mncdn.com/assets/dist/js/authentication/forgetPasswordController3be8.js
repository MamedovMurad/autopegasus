var arabam;
(function (arabam) {
    var ForgetPasswordController = /** @class */ (function () {
        function ForgetPasswordController(AuthenticationService, DialogService, CommonHelperService) {
            this.AuthenticationService = AuthenticationService;
            this.DialogService = DialogService;
            this.CommonHelperService = CommonHelperService;
            this.toggler = {};
            this.inputNumber = false;
            this.init();
        }
        ForgetPasswordController.prototype.init = function () {
            this.toggler = {
                initialForm: true,
                postMailReminder: false,
                postMobileReminder: false
            };
        };
        ForgetPasswordController.prototype.postForgetPasswordForm = function (formName) {
            var _this = this;
            if (formName.$valid) {
                if (this.inputNumber) {
                    this.email = this.inputNumberValidated;
                }
                this.AuthenticationService.httpPost("/authentication/sendforgetpasswordmail/", { email: this.email }, function (res) {
                    if (res.Success) {
                        // mobile phone
                        if (res.Data === 1) {
                            _this.collapseAllExceptOne("postMobileReminder");
                        }
                        else {
                            _this.collapseAllExceptOne("postMailReminder");
                        }
                    }
                    // this.DialogService.success({ message: res.Message });
                }, function (res) {
                    _this.DialogService.warning({ error: res.Message });
                }, {});
            }
            else {
                this.CommonHelperService.logFormErrorsToDataLayer(formName, "Şifremi Unuttum");
            }
        };
        ForgetPasswordController.prototype.checkInputNumber = function (input) {
            var self = this, isDigit = !isNaN(parseFloat(input)) && isFinite(input);
            this.inputNumber = isDigit;
            if (isDigit && input.length >= 10) {
                input = input.substr(-10);
                self.inputNumberValidated = input;
            }
        };
        ForgetPasswordController.prototype.postMobileValidation = function (formName) {
            var _this = this;
            var self = this;
            if (formName.$valid) {
                this.AuthenticationService.httpPost("/authentication/ForgottenPasswordForMobile", { token: self.validationCode }, function (res) {
                    if (res.Data && res.Data.Success) {
                        window.location.href = res.Data.Url;
                    }
                    else {
                        _this.DialogService.warning({ error: res.Data.Message });
                    }
                });
            }
            else {
                this.CommonHelperService.logFormErrorsToDataLayer(formName, "Şifremi Unuttum");
            }
        };
        ForgetPasswordController.prototype.collapseAllExceptOne = function (keyStr) {
            var self = this, togg = self.toggler;
            for (var key in togg) {
                if (togg.hasOwnProperty(key)) {
                    togg[key] = false;
                }
            }
            togg[keyStr] = true;
        };
        ForgetPasswordController.$inject = ["HttpHelperService", "DialogService", "CommonHelperService"];
        return ForgetPasswordController;
    }());
    angular
        .module('arabam')
        .controller('ForgetPasswordController', ForgetPasswordController);
})(arabam || (arabam = {}));
