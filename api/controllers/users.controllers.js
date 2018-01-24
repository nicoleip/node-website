    var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

module.exports.register = function (req, res) {
    console.log('registering user');

    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function (err, user) {
        if (err) {
            res.status(400).json(err);
        } else {
            console.log('user created', user);
            res.status(201).json(user);
        }
    });

};

module.exports.login = function (req, res) {
    console.log('logging user');

    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username: username
    }).exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {

                console.log('user found', user);
                var token = jwt.sign({ username: user.username }, 's3cr37', { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else {
                res.status(401).json('Unauthorized');
            }
        }
    });
};

module.exports.authenticate = function (req, res, next) {

    var headerExists = req.headers.authorization;

    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's3cr37', function (error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }

};

module.exports.sendMail = function (req, res, next) {

    var email = req.body.email;
    var message = req.body.message;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test@gmail.com',
                pass: 'parola'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: email, // sender address
            to: 'nikol.paraskova.sh@gmail.com', // list of receivers
            subject: 'Hello ✔ ' + 'I am' + firstname + ' ' + lastname , // Subject line
            text: message, // plain text body            
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).json({ success: true});
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        });
    });

};