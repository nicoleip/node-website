var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max: 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default  : Date.now
    } 
     
});

var ingredientsSchema = new mongoose.Schema({
    quantity : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default  : Date.now
    } 
     
});

var recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    steps : [String],
    imageUrl : String,
    originalUrl: String,
    ingredients : [ingredientsSchema],
    comments: [commentSchema]
});

recipeSchema.set('usePushEach', true);
mongoose.model('Recipe', recipeSchema);