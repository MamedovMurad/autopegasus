var arabam;
(function (arabam) {
    var helpController = /** @class */ (function () {
        function helpController() {
        }
        helpController.prototype.search = function (url) {
            window.location.href = url;
        };
        return helpController;
    }());
    angular
        .module('arabam')
        .controller('helpController', helpController);
})(arabam || (arabam = {}));
