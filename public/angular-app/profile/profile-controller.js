angular.module('node-website').controller('ProfileController', ProfileController);

function ProfileController(AuthFactory) {
    var vm = this;
    vm.title = 'My Profile'

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          return true;
        } else {
          return false;
        }
      };
    
      vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
      }
}