var arabam;
(function (arabam) {
    function checkboxFocus() {
        function link($scope, element, attributes) {
            var focusOn = element.parent().find(angular.element(attributes.checkboxFocus));
            element.focus(function () {
                focusOn.addClass("bold");
            });
            element.blur(function () {
                focusOn.removeClass("bold");
            });
        }
        return ({
            link: link,
            restrict: "A"
        });
    }
    angular
        .module('arabam')
        .directive('checkboxFocus', checkboxFocus);
})(arabam || (arabam = {}));
