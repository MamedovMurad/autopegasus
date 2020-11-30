var arabam;
(function (arabam) {
    var WizardService = /** @class */ (function () {
        function WizardService($http) {
            this.$http = $http;
        }
        WizardService.prototype.postCurrentGetNextStep = function (data) {
            return this.$http
                .post("/wizard/getquestion", data)
                .then(function (result) { return result.data; });
        };
        WizardService.prototype.finalizePoll = function (data) {
            return this.$http
                .post("/wizard/result", data)
                .then(function (result) { return result.data; });
        };
        WizardService.prototype.getResultPage = function (sessionId) {
            return this.$http
                .get("/wizard/result?wizardId=" + sessionId)
                .then(function (result) { return result.data; });
        };
        /**
         * factory hack
         */
        WizardService.factory = function () {
            var instance = function ($http) {
                return new WizardService($http);
            };
            return instance;
        };
        WizardService.$inject = ["$http"];
        return WizardService;
    }());
    arabam.WizardService = WizardService;
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName).factory("WizardService", WizardService.factory());
})(arabam || (arabam = {}));
// object.assign polyfill
if (typeof Object.assign != "function") {
    Object.assign = function assign(target, varArgs) {
        // .length of function is 2
        "use strict";
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
