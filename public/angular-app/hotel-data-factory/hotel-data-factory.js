angular.module('node-website').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {
    return {

        hotelList : hotelList,
        hotelDisplay : hotelDisplay,
        hotelEdit : hotelEdit,
        postReview : postReview

    };

    function hotelList() {
        return $http.get('/api/hotels?count=10').then(complete).catch(failed);
    }

    function hotelDisplay(id) {
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);
    }
    
    function hotelEdit(id, description) {
        return $http.put('/api/hotels/' + id + '/edit', description).then(complete).catch(failed);
    }

    function postReview(id, review) {       
        return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        console.log(error.statusText);
    }
}