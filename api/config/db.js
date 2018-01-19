var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/node-website';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbUrl);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function() {
    console.log('Mongoose connection error');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination (SIGUSR2');
        process.kill(process.pid, 'SIGUSR2');
    });
});


require('../models/hotels.models.js');
require('../models/users.model.js');
require('../models/recipes.models.js');
require('../models/quotes.models.js');