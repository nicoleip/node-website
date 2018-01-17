angular.module('node-website').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'Hotel App'
    hotelDataFactory.hotelList().then(function(response){
       
    vm.hotels = response;
   
    });
}