angular.module('node-website').controller('HotelController', HotelController);

function HotelController($route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) {
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

    vm.isAdmin = function() {
        if(vm.isLoggedIn()) {
          var token = jwtHelper.decodeToken($window.sessionStorage.token);
          var username = token.username;
          if (username === 'admin') {
            return true;
          } else {
            return false;
          }
        }
      }

    
    vm.addReview = function() {       
       
        var username = token.username;

        var postData = {
            name : username,
            rating : vm.rating,
            review : vm.review
        };
        if(vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response){                
                if(response && response._id) {                    
                    $route.reload();
                }
            }).catch(function(error){
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };

}