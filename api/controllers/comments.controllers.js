var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');


module.exports.commentsGetAll = function(req, res) {

    var recipeId = req.params.recipeId;
    console.log("GET comments for recipeId", recipeId);

    Recipe
    .findById(recipeId)
    .select('comments')
    .exec(function(err, doc){
            res
            .status(200)
            .json(doc.comments);
        });
};

module.exports.commentsGetOne = function(req, res) {

    var recipeId = req.params.recipeId;
    var commentId = req.params.commentId;
    console.log("GET commentId " + commentId + "for recipe" + recipeId);

    Recipe
    .findById(recipeId)
    .select('comments')
    .exec(function(err, recipe){       
        var comment = recipe.comments.id(commentId);
            res
            .status(200)
            .json(comment);
        });

};

var _addcomment = function(req, res, recipe) {

    recipe.comments.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        comment : req.body.comment
    });

    recipe.save(function(err, recipeUpdated) {
        if(err) {
            res 
                .status(500)
                .json(err);
        } else {
            res 
                .status(201)
                .json(recipeUpdated.comments[recipeUpdated.comments.length -1]);
        }
    });

};

module.exports.commentsAddOne = function(req, res) {

    var recipeId = req.params.recipeId;
    console.log("GET comments for recipeId", recipeId);

    Recipe
    .findById(recipeId)
    .select('comments')
    .exec(function(err, doc){
        var response = {
            status : 200,
            message : []
        };
        if(err) {
            console.log('Error finding recipe');
            response.status = 500;
            response.message = err;
        } else if(!doc) {
            console.log('Recipe id not found in the database', recipeId);
            response.status = 404;
            response.message = {
                "message" : "Recipe id not found: " + recipeId
            };
            
        }
        if(doc) {
            console.log('Found the recipe');
            _addcomment(req, res, doc);
        
        } else {
            
            res
            .status(response.status)          
            .json(response.message);
        }
        });      

};

module.exports.commentsUpdateOne = function(req, res) {
    
    var recipeId = req.params.recipeId;
    var commentId = req.params.commentId;
    console.log("GET commentId " + commentId + "for recipe" + recipeId);

    Recipe
    .findById(recipeId)
    .select('comments')
    .exec(function(err, recipe){ 
        var response = {
            status : 200,
            message : []
        }
        var commentId = req.params.commentId        
        var comment = recipe.comments.id(commentId)
        if(err) {
            console.log('Error finding recipe');
            response.status = 500 ;
            response.message = err;
            
        } else if (!recipe || !comment) {
            response.status = 404;
            response.message = {
                    "message" : "No such recipe or comment"
                };
        }       
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);      
        } else {
            comment.name = req.body.name;
            comment.rating = parseInt(req.body.rating);
            comment.comment = req.body.comment;
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


module.exports.commentsDeleteOne = function(req, res) {

    var recipeId = req.params.recipeId;
    var commentId = req.params.commentId;
    console.log("GET commentId " + commentId + "for recipe" + recipeId);

    Recipe
    .findById(recipeId)
    .select('comments')
    .exec(function(err, recipe){ 
        var response = {
            status : 200,
            message : []
        }
        var commentId = req.params.commentId        
        var comment = recipe.comments.id(commentId)
        if(err) {
            console.log('Error finding recipe');
            response.status = 500 ;
            response.message = err;
            
        } else if (!recipe || !comment) {
            response.status = 404;
            response.message = {
                    "message" : "No such recipe or comment"
                };
        }       
        if(response.status!== 200){
        res
                .status(response.status)
                .json(response.message);      
        } else {
            recipe.comments.id(commentId).remove();
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