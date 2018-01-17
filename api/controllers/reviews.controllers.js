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

var _addReview = function(req, res, hotel) {

    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    hotel.save(function(err, hotelUpdated) {
        if(err) {
            res 
                .status(500)
                .json(err);
        } else {
            res 
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
        }
    });

};

module.exports.reviewsAddOne = function(req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET reviews for hotelId", hotelId);

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
        } else if(!doc) {
            console.log('Hotel id not found in the database', hotelId);
            response.status = 404;
            response.message = {
                "message" : "Hotel id not found: " + hotelId
            };
            
        }
        if(doc) {
            console.log('Found the hotel');
            _addReview(req, res, doc);
        
        } else {
            
            res
            .status(response.status)          
            .json(response.message);
        }
        });      

};

module.exports.reviewsUpdateOne = function(req, res) {
    
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotel" + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){ 
        var response = {
            status : 200,
            message : []
        }
        var reviewId = req.params.reviewId        
        var review = hotel.reviews.id(reviewId)
        if(err) {
            console.log('Error finding hotel');
            response.status = 500 ;
            response.message = err;
            
        } else if (!hotel || !review) {
            response.status = 404;
            response.message = {
                    "message" : "No such hotel or review"
                };
        }       
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);      
        } else {
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating);
            review.review = req.body.review;
             hotel.save(function(err, hotelUpdated){
                if(err){
                    res
                    .status(500)
                    .json(err);
                } else {
                    res
                    .status(204)
                    .json();
                }
            })
        }
    });
};


module.exports.reviewsDeleteOne = function(req, res) {

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotel" + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){ 
        var response = {
            status : 200,
            message : []
        }
        var reviewId = req.params.reviewId        
        var review = hotel.reviews.id(reviewId)
        if(err) {
            console.log('Error finding hotel');
            response.status = 500 ;
            response.message = err;
            
        } else if (!hotel || !review) {
            response.status = 404;
            response.message = {
                    "message" : "No such hotel or review"
                };
        }       
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);      
        } else {
            hotel.reviews.id(reviewId).remove();
            hotel.save(function(err, hotelUpdated){
            if(err){
                res
                .status(500)
                .json(err);
            } else {
                res
                .status(204)
                .json();
            }
        })
    }
});


};