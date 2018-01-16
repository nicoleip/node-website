require('./api/config/db.js')

var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');



app.set('port', 3000);

var routes = require('./api/routes');



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended : false }));

app.use('/api', routes);


var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Application is listening on port: ' + port);
})





