angular.module('node-website').controller('QuotesController', QuotesController);

function QuotesController($http) {
    var vm = this;
    vm.title = 'Quotes'
    
    $http.get('/api/quotes').then(function(response){
        quotes = response.data; 
        quotes.forEach(function(quote){      
        if(!quote.quoteAuthor){
            quote.quoteAuthor = 'Unknown';
        } else {
            quote.quoteAuthor = quote.quoteAuthor
        }  
    });  
        vm.quotes = quotes;
        
    }).catch(function(error){
        console.log(error);
    })
}