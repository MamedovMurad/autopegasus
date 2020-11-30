var arabam;
(function (arabam) {
    function inputKeyChecker() {
        function link($scope, element, attributes) {
            element.keyup(function () {
                if (element.val().length >= 0) {
                    if (element.val().charAt(0) == "0") {
                        var newVal = element.val().substring(1, element.val().length);
                        element.val(newVal);
                    }
                }
            });
        }
        return ({
            link: link,
            restrict: "A"
        });
    }
    angular
        .module('arabam')
        .directive('inputKeyChecker', inputKeyChecker);
})(arabam || (arabam = {}));
