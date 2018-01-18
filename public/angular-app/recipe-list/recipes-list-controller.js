angular.module('node-website').controller('RecipesController', RecipesController);

function RecipesController(recipesDataFactory) {
    var vm = this;
    vm.title = 'Recipe App'
    recipesDataFactory.recipeList().then(function(response){
       
    vm.recipes = response;
   
    });
}