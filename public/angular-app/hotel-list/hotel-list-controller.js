angular.module('node-website').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'Hotels I have stayed in'
    hotelDataFactory.hotelList().then(function(response){
       
    vm.hotels = response;
   
    });
}