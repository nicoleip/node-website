angular.module('node-website').controller('HotelEditController', HotelEditController);

function HotelEditController($route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper, $scope, $filter, $location) {
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function(response){
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
    });

    function _getStarRating(stars) {
        return new Array(stars);
    }
    
    vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn) {
            return true;
          } else {
            return false;
          }
    }

    vm.getUsername = function() {
        if(vm.isLoggedIn()) {
          var token = jwtHelper.decodeToken($window.sessionStorage.token);
          var username = token.username;
    
          return username;
        }
    };

    vm.stripFormat = function ($html) {
        console.log('goes in the filter');
        return $filter('htmlToPlaintext')($html);
    };

    vm.editHotel = function() {   
        
        // var token = jwtHelper.decodeToken($window.sessionStorage.token);
        // var username = token.username;

        var putData = {
            "description" : vm.hotel.description
        };
        console.log(putData);
        if(putData.description) {
            hotelDataFactory.hotelEdit(id, putData).then(function(response){
                console.log(response);                
                if(response && response._id) {                    
                    $window.location.href = "#/hotel/" + vm.hotel._id;  
                }
            }).catch(function(error){
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
   
}