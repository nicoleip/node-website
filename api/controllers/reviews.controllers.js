var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET reviews for hotelId", hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
            res
            .status(200)
            .json(doc.reviews);
        });
};

module.exports.reviewsGetOne = function(req, res) {

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotel" + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){       
        var review = hotel.reviews.id(reviewId);
            res
            .status(200)
            .json(review);
        });

};

module.exports.reviewsAddOne = function(req, res) {

    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);


    Hotel 
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : []
            };

            if(err) {
                console.log('Error finding hotel');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Hotel id not found in the database', id);
                response.status = 404;
            }
        })

}
