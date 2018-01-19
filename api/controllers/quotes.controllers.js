var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports.quotesGetAll = function(req, res) {

    var offset = 0;
    var count = 100000000; 
    var maxCount = 100000000000;
    
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

    Quote
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, quotes) {

        if(err) {
            console.log('Error finding quotes');
            res
                .status(500)
                .json(err);
        } else {
             
        console.log('Found quotes', quotes.length);
        res
            .json(quotes);
        }
    });
};


