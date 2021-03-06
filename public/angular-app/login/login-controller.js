angular.module('node-website').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.username;
        }
      }).catch(function(error) {
        vm.error = 'Wrong username or password';
        console.log(error);
        return;
      })

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }

  vm.getUsername = function() {
    if(vm.isLoggedIn()) {
      var token = jwtHelper.decodeToken($window.sessionStorage.token);
      var username = token.username;

      return username;
    }
  }

  vm.isAdmin = function() {
    if(vm.isLoggedIn()) {
      var username = token.username;
      if (username === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }

}