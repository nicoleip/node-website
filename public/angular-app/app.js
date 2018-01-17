angular.module('node-website', ['ngRoute']).config(config)
    

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        })
        .when('/hotel/:id', {
            templateUrl: "angular-app/hotel-display/hotel.html",
            controller: HotelController,
            controllerAs: "vm"
        });
}

