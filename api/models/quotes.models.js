var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
    quoteAuthor: {
        type: String,       
        required: true
    },
    quoteText: {
        type: String,
        required: true
    }
});

mongoose.model('Quote', quoteSchema);