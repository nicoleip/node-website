angular.module('node-website').directive('nwNavigation', nwNavigation);

function nwNavigation() {
    return {
        restrict : 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    }
}