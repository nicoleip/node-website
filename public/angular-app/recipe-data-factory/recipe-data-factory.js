angular.module('node-website').factory('recipesDataFactory', recipesDataFactory);

function recipesDataFactory($http) {
    return {

        recipeList : recipeList,
        recipeDisplay : recipeDisplay,
        postComment : postComment

    };

    function recipeList() {
        return $http.get('/api/recipes?count=10').then(complete).catch(failed);
    }

    function recipeDisplay(id) {
        return $http.get('/api/recipes/' + id).then(complete).catch(failed);
    }

    function postComment(id, comment) {       
        return $http.post('/api/recipes/' + id + '/comments', comment).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        console.log(error.statusText);
    }
}