var express = require('express');
var router = express.Router();


var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlRecipes = require('../controllers/recipes.controllers.js');
var ctrlComments = require('../controllers/comments.controllers.js');
var ctrlQuotes = require('../controllers/quotes.controllers.js');

// Hotel routes
router.route('/hotels')
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);


router.route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);


// Review routes
router.route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);


router.route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// Recipes routes


router.route('/recipes')
   .get(ctrlRecipes.recipesGetAll)
   .post(ctrlRecipes.recipesAddOne);

router.route('/recipes/:recipeId')
   .get(ctrlRecipes.recipesGetOne)
   .put(ctrlRecipes.recipesUpdateOne)
   .delete(ctrlRecipes.recipesDeleteOne);

// Comment routes

router.route('/recipes/:recipeId/comments')
.get(ctrlComments.commentsGetAll)
.post(ctrlUsers.authenticate, ctrlComments.commentsAddOne);


router.route('/recipes/:recipeId/comments/:commentId')
.get(ctrlComments.commentsGetOne)
.put(ctrlComments.commentsUpdateOne)
.delete(ctrlComments.commentsDeleteOne);


// Quotes routes
router.route('/quotes')
    .get(ctrlQuotes.quotesGetAll);

// User routes

router.route('/users/register')
    .post(ctrlUsers.register);

router.route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;