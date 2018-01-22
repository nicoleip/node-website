var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


var runGeoQuery = function(req, res) {

    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    var point = {
        type: "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
     .geoNear(point, geoOptions, function(err, results, stats) {
        console.log('Geo results', results);
        console.log('Geo Stats', stats);

        res
            .status(200)
            .json(results);
     });
};


module.exports.hotelsGetAll = function(req, res) {

    var offset = 0;
    var count = 5; 
    var maxCount = 10;
    
    if(req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset , 10);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count , 10);
    }

    if(isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset must be numbers"
            });
            return;
    }

    if(count > maxCount) {
        res
            .status(400)
            .json({
                "message" : "Count limit of " + maxCount + " exceeded"
            });
            return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {

            if(err) {
                console.log('Error finding hotels');
                res
                    .status(500)
                    .json(err);
            } else {
                 
            console.log('Found hotels', hotels.length);
            res
                .json(hotels);
            }
        });
};

module.exports.hotelsGetOne = function(req, res) {  

    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
    .findById(hotelId)
    .exec(function(err, hotel){

        var response = {
            status : 200,
            message: hotel
        }
        if(err) {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
        } else if (!hotel) {
            response.status = 404;
            response.message = {
                    "message" : "Hotel Id not found"
                };
        }         
            res
                .status(response.status)
                .json(response.message);          
        });
};

var _splitArray = function(input) {
    var output;

    if(input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }

    return output;
};


module.exports.hotelsAddOne = function(req, res) {   

   Hotel 
    .create({
        name : req.body.name,
        description : req.body.description,
        stars : parseInt(req.body.stars , 10),
        services : _splitArray(req.body.services),
        photos : _splitArray(req.body.photos),
        currency : req.body.currency,
        location : {
            address : req.body.address,
            coordinates : [
                parseFloat(req.body.lng), 
                parseFloat(req.body.lat)
            ]
        }

    }, function(err, hotel) {
        if(err) {
            console.log('Error creating hotel');
            res
                .status(400)
                .json(err);
        } else {
            console.log('Hotel created', hotel);
            res 
                .status(201)
                .json(hotel);
        }
    });
    
};

module.exports.hotelsUpdateOne = function(req, res) {
    
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
    .findById(hotelId)
    .select("-reviews -rooms")
    .exec(function(err, hotel){

        var response = {
            status : 200,
            message: hotel
        }
        if(err) {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
        } else if (!hotel) {
            response.status = 404;
            response.message = {
                    "message" : "Hotel Id not found"
                };
        }         
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);
        } else {
            hotel.name = req.body.name;
            hotel.description = req.body.description;
            hotel.stars = parseInt(req.body.stars, 10);
            hotel.services = _splitArray(req.body.services);
            hotel.photos = _splitArray(req.body.photos);
            hotel.currency = req.body.currency;
            hotel.location = {
                address : req.body.address, 
                coordinates : [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };
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

module.exports.hotelsDeleteOne = function(req, res) {

    var hotelId = req.params.hotelId;

    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function(err, hotel){
            if(err) {
                res 
                    .status(404)
                    .json(err);
            } else {
                console.log('Hotel deleted, id: ' + hotelId);
                res
                    .status(204)
                    .json();
            }
        });
};

module.exports.hotelEditDescription = function(req, res){
    var hotelId = req.params.hotelId;

    Hotel
    .findById(hotelId)
    .select("description")
    .exec(function(err, hotel){
        var response = {
            status : 200,
            message: hotel
        }
        if(err) {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
        } else if (!hotel) {
            response.status = 404;
            response.message = {
                    "message" : "Hotel Id not found"
                };
        }         
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);
        } else {
            
            hotel.description = req.body.description;          
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
}