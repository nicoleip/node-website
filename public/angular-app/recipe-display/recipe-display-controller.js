angular.module('node-website').controller('RecipeController', RecipeController);

function RecipeController($route, $routeParams, $window, recipesDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    recipesDataFactory.recipeDisplay(id).then(function(response){
        console.log(response);
        vm.recipe = response;        
    });
    
    vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn) {
            return true;
          } else {
            return false;
          }
    }

    vm.addComment = function() {   
        
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

        var postData = {
            name : username,
            rating : vm.rating,
            comment : vm.comment
        };
        if(vm.commentForm.$valid) {
            recipeDataFactory.postComment(id, postData).then(function(response){                
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