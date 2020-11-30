var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var arabam;
(function (arabam) {
    var AuthenticationService = /** @class */ (function (_super) {
        __extends(AuthenticationService, _super);
        function AuthenticationService($http, DialogService) {
            var _this = _super.call(this, $http, DialogService) || this;
            _this.$http = $http;
            _this.DialogService = DialogService;
            return _this;
        }
        AuthenticationService.$inject = ["$http", "DialogService"];
        return AuthenticationService;
    }(arabam.HttpHelperService));
    angular
        .module('arabam')
        .service('AuthenticationService', AuthenticationService);
})(arabam || (arabam = {}));
