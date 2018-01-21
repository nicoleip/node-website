angular.module('node-website').controller('MainController', MainController);

function MainController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;
  vm.title = 'Welcome, dear reader!';

  $http.get('/api/quotes?count=5').then(function(response){
    quotes = response.data; 
    quotes.forEach(function(quote){      
    if(!quote.quoteAuthor){
        quote.quoteAuthor = 'Unknown';
    } else {
        quote.quoteAuthor = quote.quoteAuthor
    }    
});
console.log(quotes);
    vm.quotes = quotes;
    
  }).catch(function(error){
        console.log(error);
  });
}

