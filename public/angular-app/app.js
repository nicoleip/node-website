angular.module('node-website', ['ngRoute', 'angular-jwt', 'angularUtils.directives.dirPagination'], ).config(config).run(run);
    

function config($httpProvider, $routeProvider, $locationProvider, paginationTemplateProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('AuthInterceptor');
    paginationTemplateProvider.setPath('public/templates/dirPagination.tpl.html');
        
    $routeProvider
        .when('/', {
            templateUrl: "angular-app/main/main.html",
            controller: MainController,
            controllerAs: "vm",
            access : {
                restricted: false
            }
        })
        .when('/hotels', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm',
            access : {
                restricted: false
            }
        })
        .when('/hotel/:id', {
            templateUrl: "angular-app/hotel-display/hotel.html",
            controller: HotelController,
            controllerAs: "vm",
            access : {
                restricted: false
            }
        })
        .when('/recipes', {
            templateUrl: "angular-app/recipe-list/recipes.html",
            controller: RecipesController,
            controllerAs: 'vm',
            access : {
                restricted : false
            }
        })
        .when('/recipes/:id', {
            templateUrl: "angular-app/recipe-display/recipe.html",
            controller: RecipeController,
            controllerAs: 'vm',
            access : {
                restricted : false
            }
        })
        .when('/register', {
            templateUrl : "angular-app/register/register.html",
            controller : RegisterController,
            controllerAs : "vm",
            access : {
                restricted: false
            }
        })
        .when('/profile', {
            templateUrl : "angular-app/profile/profile.html",
            controller : ProfileController,
            controllerAs: "vm",
            access: {
                restricted: true
            }
        })
        .when('/quotes', {
            templateUrl: "angular-app/quotes/quotes.html",
            controller: QuotesController,
            controllerAs: "vm",
            access: {
                restricted : false
            }
        })
        .otherwise({
            redirectTo : '/'
        });
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
        event.preventDefault();
        $location.path('/');
      }
    });
  }

