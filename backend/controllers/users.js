var BaseController = require('./basecontroller');
var _ = require('underscore');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var lib = require('../lib');

function Users() {
}

Users.prototype = new BaseController();

module.exports = function () {
    var controller = new Users();

    controller.addAction('GET', '/users', function (req, res) {
        User.find({}, function (err, users) {
            res.send(users);
        });
    }, true);

    //get user from token
    controller.addAction('POST', '/token', function (req, res, next) {
        var user = req.decoded._doc;
        res.send({user: {name: user.name, role: user.role}});
        next();
    }, true);

    //create user
    controller.addAction('POST', '/users', function (req, res, next) {
        var body = req.body;
        if (body) {
            var user = new User(body);
            user.save(function (err, u) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                res.send(u);
            })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'No data received'))
        }
    }, false);

    controller.addAction('POST', '/login', function (req, res, next) {
        var body = req.body;
        var username = body.username;

        if (username) {
            //find the user
            User.findOne({name: username})
                .exec(function (err, user) {

                    if (err) return next(controller.RESTError('InternalServerError', err));

                    if (!user) {
                        return next(controller.RESTError('Authentication failed. User not found.', err));
                    } else if (user) {
                        //check if password matches
                        user.comparePassword(body.password, function (err, isMatch) {
                            if (isMatch && !err) {

                                //if user is found and password is right create a token
                                var token = jwt.sign(user, require('../lib').config.secret, {
                                    expiresInMinutes: 1440 // expires in 24 hours
                                });

                                //return the information including token as JSON
                                res.send({
                                    user: user,
                                    token: token
                                });
                            } else {
                                next(controller.RESTError('InvalidArgumentError', 'Wrong password'));
                            }
                        })
                    }
                })
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        }
    });

    return controller;
};