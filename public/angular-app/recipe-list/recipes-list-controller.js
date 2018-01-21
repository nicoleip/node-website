angular.module('node-website').controller('RecipesController', RecipesController);

function RecipesController(recipesDataFactory) {
    var vm = this;
    vm.title = 'Here\'s a list of some of my favorite recipes:'
    recipesDataFactory.recipeList().then(function(response){
       
    vm.recipes = response;
   
    });
}