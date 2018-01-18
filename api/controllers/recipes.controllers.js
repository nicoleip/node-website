var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

module.exports.recipesGetAll = function(req, res) {

    var offset = 0;
    var count = 5; 
    var maxCount = 10;
    
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

    Recipe
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, recipes) {

            if(err) {
                console.log('Error finding recipes');
                res
                    .status(500)
                    .json(err);
            } else {
                 
            console.log('Found recipes', recipes.length);
            res
                .json(recipes);
            }
        });
};

module.exports.recipesGetOne = function(req, res) {  

    var recipeId = req.params.recipeId;
    console.log("GET recipeId", recipeId);

    Recipe
    .findById(recipeId)
    .exec(function(err, recipe){

        var response = {
            status : 200,
            message: recipe
        }
        if(err) {
            console.log("Error finding recipe");
            response.status = 500;
            response.message = err;
        } else if (!recipe) {
            response.status = 404;
            response.message = {
                    "message" : "Recipe Id not found"
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


module.exports.recipesAddOne = function(req, res) {   

   recipe 
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

    }, function(err, recipe) {
        if(err) {
            console.log('Error creating recipe');
            res
                .status(400)
                .json(err);
        } else {
            console.log('recipe created', recipe);
            res 
                .status(201)
                .json(recipe);
        }
    });
    
};

module.exports.recipesUpdateOne = function(req, res) {
    
    var recipeId = req.params.recipeId;
    console.log("GET recipeId", recipeId);

    recipe
    .findById(recipeId)
    .select("-comments")
    .exec(function(err, recipe){

        var response = {
            status : 200,
            message: recipe
        }
        if(err) {
            console.log("Error finding recipe");
            response.status = 500;
            response.message = err;
        } else if (!recipe) {
            response.status = 404;
            response.message = {
                    "message" : "recipe Id not found"
                };
        }         
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);
        } else {
            recipe.name = req.body.name;
            recipe.imageUrl = recipe.imageUrl
            recipe.originalUrl = recipe.originalUrl;
            recipe.steps = _splitArray(req.body.steps);
            recipe.save(function(err, recipeUpdated){
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

module.exports.recipesDeleteOne = function(req, res) {

    var recipeId = req.params.recipeId;

    recipe
        .findByIdAndRemove(recipeId)
        .exec(function(err, recipe){
            if(err) {
                res 
                    .status(404)
                    .json(err);
            } else {
                console.log('recipe deleted, id: ' + recipeId);
                res
                    .status(204)
                    .json();
            }
        });
};