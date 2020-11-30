var arabam;
(function (arabam) {
    function arabamStar() {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                ngModel: "=",
                voteCallback: "&"
            },
            link: function ($scope, element, attributes) {
                $scope.hoverVariable = 0;
                $scope.stars = [1, 2, 3, 4, 5];
                $scope.readonly = attributes.readonly == "true" ? true : false;
                $scope.outerClass = attributes.outerClass;
                $scope.innerClass = attributes.innerClass;
                $scope.emptyClass = attributes.emptyClass;
                $scope.fullClass = attributes.fullClass;
                $scope.$watch("ngModel", function (newVal, oldVal) {
                    $scope.existingValue = newVal || 0;
                });
                $scope.set = function (value) {
                    $scope.existingValue = value;
                    $scope.ngModel = value;
                    if ($scope.voteCallback) {
                        $scope.voteCallback();
                    }
                };
                $scope.hover = function (value) {
                    $scope.hoverVariable = value;
                };
                $scope.clear = function (value) {
                    if ($scope.hoverVariable == value)
                        $scope.hoverVariable = 0;
                };
                /** gosterim modunda ic kisimdaki yildizlarin genisligi */
                $scope.getWidth = function () {
                    if ($scope.existingValue) {
                        var sth = Math.ceil(($scope.existingValue - 0.2) / 0.5);
                        return {
                            width: (sth * 10) + "%"
                        };
                    }
                    else {
                        return {
                            width: "0%"
                        };
                    }
                };
            },
            template: "<div class=\"arabam-star\">\n                <div ng-if=\"readonly\">\n                    <div ng-class=\"outerClass\">\n                        <div ng-class=\"innerClass\" ng-style=\"getWidth()\"></div>\n                    </div>\n                </div>\n                <div ng-if=\"!readonly\">\n                    <i class=\"fa single-star\" \n                    ng-repeat=\"value in stars\"\n                    ng-class=\"{'{{emptyClass}}': hoverVariable ? value > hoverVariable : value > existingValue, \n                            '{{fullClass}}': hoverVariable ? value <= hoverVariable : value <= existingValue}\" \n                    ng-mouseenter=\"hover(value)\" \n                    ng-mouseleave=\"clear(value)\"\n                    ng-click=\"set(value)\"></i>\n                </div>\n            </div>",
            replace: true
        };
    }
    var appName = document.body.parentNode.getAttribute("ng-app");
    angular.module(appName)
        .directive("arabamStar", arabamStar);
})(arabam || (arabam = {}));
