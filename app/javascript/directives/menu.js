angular.module('myApp')

.directive("topMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "templates/menu/index.html",
    }

});
