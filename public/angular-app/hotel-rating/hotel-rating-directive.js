// angular.module('node-website').directive('hotelRating', hotelRating);
// // <hotel-rating>

// function hotelRating() {
//     return {
//         restrict : 'E',
//         template : '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//         bindToController : true,
//         controller : 'HotelController',
//         controllerAs : 'vm',
//         scope : {
//             stars: '@'
//         }
//     } 
// }


angular.module('node-website').component('hotelRating', {
    bindings: {
        stars: '='
    },
    template : '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
    bindToController : true,
    controller : 'HotelController',
    controllerAs : 'vm',

})